-- Add write protection policies to user_roles table
-- Only admins should be able to insert, update, or delete user roles

-- Policy for INSERT: Only admins can create user roles
CREATE POLICY "Only admins can insert user roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy for UPDATE: Only admins can update user roles
CREATE POLICY "Only admins can update user roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Policy for DELETE: Only admins can delete user roles
CREATE POLICY "Only admins can delete user roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));