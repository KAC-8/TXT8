-- 1. Create the primary orders table
CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name text NOT NULL,
    title_ar text,
    title_en text,
    serial_number text NOT NULL UNIQUE,
    template_id text NOT NULL,
    badge_id text,
    payment_status text DEFAULT 'paid'::text,
    language_preference text DEFAULT 'ar'::text,
    visits integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create an index on serial_number for instant verification page lookups
CREATE INDEX idx_orders_serial_number ON public.orders USING btree (serial_number);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
-- Allow anyone to read the orders (required for the Verify page and Hall of Fame)
CREATE POLICY "Allow public read access" 
ON public.orders 
FOR SELECT 
TO public 
USING (true);

-- 5. Add RPC to increment visits
CREATE OR REPLACE FUNCTION increment_visits(row_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.orders SET visits = visits + 1 WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- NOTE: No INSERT, UPDATE, or DELETE policies are created for the 'public' role.
-- This strictly blocks frontend manipulation. Your Next.js Server Actions will use 
-- the SUPABASE_SERVICE_ROLE_KEY, which automatically bypasses RLS to safely insert data.