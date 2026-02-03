import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ReorderItem {
  productId: string;
  sortOrder: number;
}

export const useProductReorder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: ReorderItem[]) => {
      // Update each product's sort_order
      const updates = items.map(({ productId, sortOrder }) =>
        supabase
          .from("products")
          .update({ sort_order: sortOrder })
          .eq("product_id", productId)
      );

      const results = await Promise.all(updates);
      
      // Check for errors
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        console.error("Reorder errors:", errors);
        throw new Error("Failed to update product order");
      }

      return results;
    },
    onSuccess: () => {
      // Invalidate products query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["products"] });
      
      toast({
        title: "Order Updated",
        description: "Product order updated successfully",
      });
    },
    onError: (error) => {
      console.error("Reorder error:", error);
      toast({
        title: "Error",
        description: "Failed to update product order. Please try again.",
        variant: "destructive",
      });
    },
  });
};
