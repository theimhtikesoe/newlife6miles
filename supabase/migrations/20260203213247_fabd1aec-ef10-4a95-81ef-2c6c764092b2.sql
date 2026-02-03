-- Remove redundant anon-deny policies (RLS default-deny already blocks anon)
-- Keeping only explicit admin allow policies reduces false positives in security scanning.

DROP POLICY IF EXISTS "Anon users cannot read orders" ON public.orders;
DROP POLICY IF EXISTS "Anon users cannot read order_items" ON public.order_items;

-- Ensure admin read policies are explicitly scoped to authenticated role and schema-qualified
ALTER POLICY "Admins can view all order_items" ON public.order_items
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Re-assert orders admin policies are schema-qualified (defense-in-depth)
ALTER POLICY "Admins can view all orders" ON public.orders
  USING (public.has_role(auth.uid(), 'admin'::app_role));

ALTER POLICY "Admins can update orders" ON public.orders
  USING (public.has_role(auth.uid(), 'admin'::app_role));

ALTER POLICY "Admins can delete orders" ON public.orders
  USING (public.has_role(auth.uid(), 'admin'::app_role));