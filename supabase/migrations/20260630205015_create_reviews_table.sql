/*
# Create reviews table

Single-tenant public reviews — no user accounts required.

1. New Tables
   - `reviews`
     - `id` (uuid, primary key)
     - `reviewer_name` (text, not null) — display name submitted by the customer
     - `rating` (integer 1–5, not null) — star rating
     - `comment` (text, not null) — review body
     - `created_at` (timestamptz, default now())

2. Security
   - RLS enabled on `reviews`.
   - `anon` and `authenticated` can SELECT all reviews (public display).
   - `anon` and `authenticated` can INSERT new reviews (customer submissions).
   - Only `authenticated` (admin) can DELETE reviews (moderation).
   - No UPDATE policy — reviews are immutable after submission.

3. Notes
   - No approval workflow; reviews are shown immediately.
   - A CHECK constraint enforces rating between 1 and 5.
*/

CREATE TABLE IF NOT EXISTS reviews (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name text NOT NULL,
  rating        integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment       text NOT NULL,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_reviews" ON reviews;
CREATE POLICY "public_select_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_reviews" ON reviews;
CREATE POLICY "public_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_reviews" ON reviews;
CREATE POLICY "admin_delete_reviews" ON reviews FOR DELETE
  TO authenticated USING (true);
