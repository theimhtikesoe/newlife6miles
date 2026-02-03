-- Harden public order_items INSERT to prevent price manipulation and inconsistent totals
-- Keeps guest checkout while ensuring server-enforced pricing rules.

ALTER POLICY "Anyone can create order_items" ON public.order_items
WITH CHECK (
  card_quantity >= 1
  AND cap_size > 0
  AND total_caps = cap_size * card_quantity
  AND EXISTS (
    SELECT 1
    FROM public.orders o
    WHERE o.id = order_id
  )
  AND EXISTS (
    SELECT 1
    FROM public.products p
    WHERE p.product_id = product_id
      AND p.is_active = true
      AND p.price_per_cap IS NOT NULL
      AND p.price_per_cap = price_per_cap
  )
  AND total_price = total_caps * price_per_cap
);