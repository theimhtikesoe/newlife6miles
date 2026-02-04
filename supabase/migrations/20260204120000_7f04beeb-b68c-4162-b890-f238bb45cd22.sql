-- Workspace photos table for gallery
CREATE TABLE IF NOT EXISTS public.workspace_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_mm text NOT NULL,
  description_en text,
  description_mm text,
  image_url text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.workspace_photos ENABLE ROW LEVEL SECURITY;

-- Public can read only active photos
CREATE POLICY "Workspace photos are publicly readable"
ON public.workspace_photos FOR SELECT
USING (is_active = true);

-- Admins can view all workspace photos
CREATE POLICY "Admins can view all workspace photos"
ON public.workspace_photos FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert workspace photos
CREATE POLICY "Admins can insert workspace photos"
ON public.workspace_photos FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can update workspace photos
CREATE POLICY "Admins can update workspace photos"
ON public.workspace_photos FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete workspace photos
CREATE POLICY "Admins can delete workspace photos"
ON public.workspace_photos FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_workspace_photos_updated_at
  BEFORE UPDATE ON public.workspace_photos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for workspace photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('workspace-photos', 'workspace-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for workspace photos
CREATE POLICY "Workspace photos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'workspace-photos');

CREATE POLICY "Admins can upload workspace photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'workspace-photos' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update workspace photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'workspace-photos' AND public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete workspace photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'workspace-photos' AND public.has_role(auth.uid(), 'admin'::app_role));
