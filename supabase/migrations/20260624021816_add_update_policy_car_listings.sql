
CREATE POLICY "update_own_car_listings" ON car_listings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);
