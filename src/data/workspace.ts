export type WorkspaceItem = {
  src: string;
  title: { en: string; mm: string };
  description?: { en: string; mm: string };
};

export const workspaceItems: WorkspaceItem[] = [];
