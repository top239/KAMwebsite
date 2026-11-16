/*
# Create google_reviews cache table

1. New Tables
- `google_reviews`
  - `id` (uuid, primary key)
  - `place_id` (text, the Google Place ID being tracked)
  - `author_name` (text, the reviewer's display name as shown on Google)
  - `rating` (int, 1–5 star rating)
  - `text` (text, the review content from Google)
  - `time` (text, the review date in ISO format)
  - `profile_photo_url` (text, nullable, the reviewer's profile photo URL from Google)
  - `relative_time_description` (text, nullable, Google's relative time string e.g. "3 months ago")
  - `fetched_at` (timestamptz, when this review was last refreshed from Google)

2. Purpose
- Caches Google Places API review data so the frontend can display genuine Google
  customer reviews without exposing API keys in the browser. The edge function
  `google-reviews` fetches from Google and upserts into this table; the frontend
  reads from this table directly via the Supabase anon key.

3. Security
- Enable RLS on `google_reviews`.
- Grant SELECT to `anon, authenticated` so the no-auth frontend can read cached reviews.
- No INSERT/UPDATE/DELETE grants to `anon` or `authenticated` — only the edge function
  (using the service role key, which bypasses RLS) writes to this table.
- Grant all CRUD to `service_role` so the edge function can upsert.
*/

CREATE TABLE IF NOT EXISTS google_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id text NOT NULL,
  author_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL DEFAULT '',
  time text,
  profile_photo_url text,
  relative_time_description text,
  fetched_at timestamptz DEFAULT now()
);

ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON google_reviews TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON google_reviews TO service_role;

DROP POLICY IF EXISTS "anon_select_google_reviews" ON google_reviews;
CREATE POLICY "anon_select_google_reviews"
ON google_reviews FOR SELECT
TO anon, authenticated USING (true);
