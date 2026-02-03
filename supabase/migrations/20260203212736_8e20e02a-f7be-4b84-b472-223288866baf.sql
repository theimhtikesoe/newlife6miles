-- Fix the orders table RLS: the "Deny anonymous read access" policy blocks everyone including admins
-- because RESTRICTIVE policies require ALL to pass. We need to restructure this.

-- Drop the problematic deny policy
DROP POLICY IF EXISTS "Deny anonymous read access to orders" ON public.orders;

-- The existing "Admins can view all orders" policy is sufficient since:
-- 1. RLS is enabled (default deny)
-- 2. Only the admin SELECT policy exists
-- 3. Anonymous users have no SELECT policy that allows them access

-- Add explicit deny for anon role as defense-in-depth (PERMISSIVE false = always deny for anon)
CREATE POLICY "Anon users cannot read orders"
ON public.orders
AS PERMISSIVE
FOR SELECT
TO anon
USING (false);

-- Similarly protect order_items table
DROP POLICY IF EXISTS "Deny anonymous read access to order_items" ON public.order_items;

CREATE POLICY "Anon users cannot read order_items"
ON public.order_items
AS PERMISSIVE
FOR SELECT
TO anon
USING (false);