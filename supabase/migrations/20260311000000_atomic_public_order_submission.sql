-- Record a customer order and all of its line items atomically.
-- This is intentionally a read/write path only for the public order form;
-- Ledger remains a separate read-only source used by the Miles frontend.

CREATE OR REPLACE FUNCTION public.submit_public_order(
  p_customer_name text,
  p_customer_phone text,
  p_customer_city text,
  p_customer_notes text,
  p_total_amount integer,
  p_items jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order_id uuid;
  v_item_total bigint;
BEGIN
  IF nullif(trim(p_customer_name), '') IS NULL
     OR nullif(trim(p_customer_phone), '') IS NULL
     OR nullif(trim(p_customer_city), '') IS NULL THEN
    RAISE EXCEPTION 'Customer name, phone, and city are required.';
  END IF;

  IF jsonb_typeof(p_items) <> 'array' OR jsonb_array_length(p_items) = 0 THEN
    RAISE EXCEPTION 'At least one order item is required.';
  END IF;

  SELECT COALESCE(SUM((item->>'total_price')::bigint), 0)
  INTO v_item_total
  FROM jsonb_array_elements(p_items) AS item;

  IF p_total_amount <> v_item_total THEN
    RAISE EXCEPTION 'Order total does not match the item totals.';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM jsonb_to_recordset(p_items) AS item(
      product_id text,
      product_name text,
      price_per_cap integer,
      cap_size integer,
      card_quantity integer,
      total_caps integer,
      total_price integer
    )
    WHERE item.card_quantity < 1
       OR item.cap_size <= 0
       OR item.total_caps <> item.cap_size * item.card_quantity
       OR item.price_per_cap < 0
       OR item.total_price <> item.total_caps * item.price_per_cap
       OR NOT EXISTS (
         SELECT 1
         FROM public.products product
         WHERE product.product_id = item.product_id
           AND product.is_active = true
       )
  ) THEN
    RAISE EXCEPTION 'One or more order items are invalid.';
  END IF;

  INSERT INTO public.orders (
    customer_name,
    customer_phone,
    customer_city,
    customer_notes,
    total_amount,
    status
  )
  VALUES (
    trim(p_customer_name),
    trim(p_customer_phone),
    trim(p_customer_city),
    nullif(trim(coalesce(p_customer_notes, '')), ''),
    p_total_amount,
    'pending'
  )
  RETURNING id INTO v_order_id;

  INSERT INTO public.order_items (
    order_id,
    product_id,
    product_name,
    price_per_cap,
    cap_size,
    card_quantity,
    total_caps,
    total_price
  )
  SELECT
    v_order_id,
    item.product_id,
    item.product_name,
    item.price_per_cap,
    item.cap_size,
    item.card_quantity,
    item.total_caps,
    item.total_price
  FROM jsonb_to_recordset(p_items) AS item(
    product_id text,
    product_name text,
    price_per_cap integer,
    cap_size integer,
    card_quantity integer,
    total_caps integer,
    total_price integer
  );

  RETURN v_order_id;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_public_order(text, text, text, text, integer, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_public_order(text, text, text, text, integer, jsonb) TO anon, authenticated;
