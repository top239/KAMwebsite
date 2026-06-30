import { useEffect, useState } from 'react';
import { Star, MessageSquare, X, ThumbsUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
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

const INITIAL_FORM = { reviewer_name: '', rating: 0, comment: '' };

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    setReviews(data ?? []);
    setLoading(false);
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

        {/* Summary bar */}
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

        {/* Reviews grid */}
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
