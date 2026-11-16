import { useEffect, useState } from 'react';
import { Star, MessageSquare, X, ThumbsUp, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

const GOOGLE_PROFILE_URL = 'https://share.google/clbGNbdnne7LtTQ1W';

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: string | null;
  profile_photo_url: string | null;
  relative_time_description: string | null;
}

interface GoogleReviewsResponse {
  reviews: GoogleReview[];
  rating: number | null;
  totalReviews: number;
  businessName?: string;
  error?: string;
}

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const display = onChange ? (hovered || value) : value;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={onChange ? 'button' : undefined}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={onChange ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'}
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              star <= display ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

function GoogleLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" fill="#EA4335"/>
    </svg>
  );
}

const INITIAL_FORM = { reviewer_name: '', rating: 0, comment: '' };

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>([]);
  const [googleRating, setGoogleRating] = useState<number | null>(null);
  const [googleTotal, setGoogleTotal] = useState(0);
  const [googleLoading, setGoogleLoading] = useState(true);
  const [googleError, setGoogleError] = useState(false);

  useEffect(() => {
    fetchReviews();
    fetchGoogleReviews();
  }, []);

  async function fetchReviews() {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    setReviews(data ?? []);
    setLoading(false);
  }

  async function fetchGoogleReviews() {
    try {
      // Try reading cached Google reviews from the database first
      const { data: cached } = await supabase
        .from('google_reviews')
        .select('author_name, rating, text, time, profile_photo_url, relative_time_description')
        .order('fetched_at', { ascending: false })
        .limit(5);

      if (cached && cached.length > 0) {
        setGoogleReviews(cached as GoogleReview[]);
        setGoogleLoading(false);
      }

      // Fetch fresh reviews from the edge function (which calls Google Places API)
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-reviews`;
      const res = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})}`);

      const data: GoogleReviewsResponse = await res.json();

      if (data.error) {
        if (!cached || cached.length === 0) {
          setGoogleError(true);
        }
      } else {
        if (data.reviews && data.reviews.length > 0) {
          setGoogleReviews(data.reviews);
        }
        setGoogleRating(data.rating);
        setGoogleTotal(data.totalReviews);
        setGoogleError(false);
      }
    } catch {
      if (googleReviews.length === 0) {
        setGoogleError(true);
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
  }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError('');

    if (!form.reviewer_name.trim()) { setFormError('Please enter your name.'); return; }
    if (form.rating === 0) { setFormError('Please select a star rating.'); return; }
    if (!form.comment.trim()) { setFormError('Please write a comment.'); return; }

    setSubmitting(true);
    const { error } = await supabase.from('reviews').insert({
      reviewer_name: form.reviewer_name.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
    });

    if (error) {
      setFormError('Failed to submit review. Please try again.');
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);
    setForm(INITIAL_FORM);
    fetchReviews();
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 3000);
  }

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Customer Reviews</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600">What our customers say about us</p>
        </div>

        {/* Google rating summary */}
        {!googleLoading && googleReviews.length > 0 && (
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl border border-slate-200 p-6">
              <div className="text-center flex-shrink-0">
                <div className="flex items-center gap-2 justify-center mb-1">
                  <GoogleLogo className="w-6 h-6" />
                  <span className="text-sm font-semibold text-slate-700">Google Rating</span>
                </div>
                <p className="text-5xl font-bold text-slate-900 leading-none">
                  {googleRating ? googleRating.toFixed(1) : '—'}
                </p>
                <div className="flex gap-0.5 justify-center mt-2 mb-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= Math.round(googleRating || 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Based on {googleTotal > 0 ? googleTotal : googleReviews.length} Google review{googleTotal !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="hidden sm:block w-px h-24 bg-slate-200"></div>
              <div className="flex-1 w-full">
                <p className="text-sm text-slate-600 mb-3 font-medium">See what customers are saying on Google</p>
                <a
                  href={GOOGLE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 transition-all duration-200 text-sm shadow-sm"
                >
                  <GoogleLogo className="w-4 h-4" />
                  Read More Reviews on Google
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Google reviews grid */}
        {!googleLoading && googleReviews.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <GoogleLogo className="w-5 h-5" />
              <h3 className="text-lg font-bold text-slate-900">Reviews from Google</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {googleReviews.slice(0, 6).map((review, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200 p-6 hover:border-blue-200 hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                        />
                      ))}
                    </div>
                    {review.relative_time_description && (
                      <span className="text-xs text-slate-400">{review.relative_time_description}</span>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed flex-1 mb-4 text-sm">
                    {review.text ? `"${review.text}"` : ''}
                  </p>
                  <div className="flex items-center gap-2.5 pt-4 border-t border-slate-200">
                    {review.profile_photo_url ? (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-sm">
                          {review.author_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="text-sm font-semibold text-slate-800 truncate">{review.author_name}</span>
                    <GoogleLogo className="w-3.5 h-3.5 ml-auto flex-shrink-0 opacity-50" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Google reviews loading skeleton */}
        {googleLoading && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <GoogleLogo className="w-5 h-5" />
              <h3 className="text-lg font-bold text-slate-900">Reviews from Google</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 animate-pulse">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="w-4 h-4 bg-slate-200 rounded" />
                    ))}
                  </div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-full mb-1" />
                  <div className="h-4 bg-slate-200 rounded w-5/6" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Google reviews not yet available notice */}
        {!googleLoading && googleReviews.length === 0 && (
          <div className="max-w-2xl mx-auto mb-12 bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
            <GoogleLogo className="w-8 h-8 mx-auto mb-3" />
            <p className="text-slate-700 font-semibold mb-1">Google Reviews Coming Soon</p>
            <p className="text-sm text-slate-500 mb-4">
              We're connecting our Google reviews. In the meantime, you can read them directly on Google.
            </p>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 transition-all duration-200 text-sm shadow-sm"
            >
              <GoogleLogo className="w-4 h-4" />
              Read More Reviews on Google
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        )}

        {/* Local reviews summary bar */}
        {!loading && reviews.length > 0 && (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-10 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-8 items-center">
              <div className="text-center flex-shrink-0">
                <p className="text-6xl font-bold text-slate-900 leading-none">{avgRating.toFixed(1)}</p>
                <StarRating value={Math.round(avgRating)} />
                <p className="text-sm text-slate-500 mt-1">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="flex-1 w-full space-y-1.5">
                {ratingCounts.map(({ star, count }) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-3 text-right flex-shrink-0">{star}</span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%' }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 w-4 flex-shrink-0">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Write a review button */}
        {!showForm && !submitted && (
          <div className="text-center mb-10">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <MessageSquare className="w-5 h-5" />
              Write a Review
            </button>
          </div>
        )}

        {/* Review form */}
        {showForm && (
          <div className="max-w-xl mx-auto mb-12 bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">Leave a Review</h3>
              <button
                onClick={() => { setShowForm(false); setForm(INITIAL_FORM); setFormError(''); }}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-6">
                <ThumbsUp className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-slate-800 font-semibold text-lg">Thank you for your review!</p>
                <p className="text-slate-500 text-sm mt-1">Your feedback helps others.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={form.reviewer_name}
                    onChange={e => setForm(f => ({ ...f, reviewer_name: e.target.value }))}
                    placeholder="e.g. John D."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-slate-800 placeholder:text-slate-400 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Rating</label>
                  <StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Review</label>
                  <textarea
                    value={form.comment}
                    onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                    placeholder="Tell us about your experience..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-slate-800 placeholder:text-slate-400 bg-white resize-none"
                  />
                </div>

                {formError && (
                  <p className="text-sm text-red-500">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-xl transition-colors shadow-md"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Local reviews grid */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 animate-pulse">
                <div className="flex gap-1 mb-3">{Array.from({length:5}).map((_,j)=><div key={j} className="w-5 h-5 bg-slate-200 rounded"/>)}</div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"/>
                <div className="h-4 bg-slate-200 rounded w-full mb-1"/>
                <div className="h-4 bg-slate-200 rounded w-5/6"/>
              </div>
            ))}
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500">No reviews yet. Be the first to leave one!</p>
          </div>
        )}

        {!loading && reviews.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:border-orange-200 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <StarRating value={review.rating} />
                  <span className="text-xs text-slate-400">{formatDate(review.created_at)}</span>
                </div>
                <p className="text-slate-700 leading-relaxed flex-1 mb-4 text-sm">"{review.comment}"</p>
                <div className="flex items-center gap-2.5 pt-4 border-t border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold text-sm">
                      {review.reviewer_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{review.reviewer_name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
