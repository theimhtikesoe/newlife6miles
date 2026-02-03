-- Defense-in-depth: restrict orders access to authenticated admins and explicitly deny anonymous reads

-- Ensure admin-only policies apply only to authenticated users and use schema-qualified has_role
ALTER POLICY "Admins can view all orders" ON public.orders
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

ALTER POLICY "Admins can update orders" ON public.orders
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

ALTER POLICY "Admins can delete orders" ON public.orders
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add an explicit restrictive deny policy for anonymous SELECT to prevent accidental exposure
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'orders'
      AND policyname = 'Deny anonymous read access to orders'
  ) THEN
    EXECUTE 'CREATE POLICY "Deny anonymous read access to orders" ON public.orders AS RESTRICTIVE FOR SELECT TO anon USING (false)';
  END IF;
END
$$;