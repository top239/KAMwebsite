
-- Create storage bucket for car images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'car-images',
  'car-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif']
)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload images
CREATE POLICY "authenticated_upload_car_images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'car-images');

-- Allow anyone to view car images
CREATE POLICY "public_read_car_images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'car-images');

-- Allow authenticated users to delete their uploaded images
CREATE POLICY "authenticated_delete_car_images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'car-images');
