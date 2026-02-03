-- Add price per bottle column for bottles
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_per_bottle integer DEFAULT 0;

-- Add cap-specific fields
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS cap_type text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS cap_sizes text[] DEFAULT ARRAY[]::text[];

-- Add images array for multiple images support (used for caps with 3 images)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images text[] DEFAULT ARRAY[]::text[];

-- Comment for clarity
COMMENT ON COLUMN public.products.price_per_cap IS 'Price per cap in MMK for ordering';
COMMENT ON COLUMN public.products.price_per_bottle IS 'Price per bottle in MMK for bottle products';
COMMENT ON COLUMN public.products.cap_type IS 'Cap type: Normal, Sport, Flip, etc.';
COMMENT ON COLUMN public.products.cap_sizes IS 'Cap sizes array: 28mm, 30mm, etc.';
COMMENT ON COLUMN public.products.images IS 'Array of image URLs for products with multiple images';