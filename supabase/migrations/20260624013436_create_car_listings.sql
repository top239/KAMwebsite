CREATE TABLE car_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price numeric(10, 2) NOT NULL,
  mileage integer NOT NULL,
  color text NOT NULL,
  transmission text NOT NULL CHECK (transmission IN ('Automatic', 'Manual')),
  fuel_type text NOT NULL CHECK (fuel_type IN ('Gasoline', 'Diesel', 'Electric', 'Hybrid')),
  description text,
  image_url text,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE car_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_car_listings" ON car_listings FOR SELECT
  TO anon, authenticated USING (true);

CREATE POLICY "insert_car_listings" ON car_listings FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_car_listings" ON car_listings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_car_listings" ON car_listings FOR DELETE
  TO authenticated USING (true);
