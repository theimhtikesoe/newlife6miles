import { useQuery } from "@tanstack/react-query";
import { workspaceItems } from "@/data/workspace";

export const useWorkspacePhotos = () => {
  return useQuery({
    queryKey: ["workspace-photos"],
    queryFn: async () => {
      return workspaceItems;
    },
  });
};
