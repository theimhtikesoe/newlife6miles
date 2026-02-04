import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { workspaceItems, WorkspaceItem } from "@/data/workspace";

export interface DatabaseWorkspacePhoto {
  id: string;
  title_en: string;
  title_mm: string;
  description_en: string | null;
  description_mm: string | null;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
}

const toWorkspaceItem = (photo: DatabaseWorkspacePhoto): WorkspaceItem => {
  const hasDescription = Boolean(
    (photo.description_en && photo.description_en.trim()) ||
    (photo.description_mm && photo.description_mm.trim())
  );

  return {
    src: photo.image_url,
    title: {
      en: photo.title_en,
      mm: photo.title_mm,
    },
    description: hasDescription
      ? {
          en: photo.description_en || photo.description_mm || "",
          mm: photo.description_mm || photo.description_en || "",
        }
      : undefined,
  };
};

export const useWorkspacePhotos = () => {
  return useQuery({
    queryKey: ["workspace-photos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workspace_photos")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching workspace photos:", error);
        throw error;
      }

      if (data && data.length > 0) {
        return data.map(toWorkspaceItem);
      }

      return workspaceItems;
    },
  });
};
