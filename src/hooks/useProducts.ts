import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getSortedProducts, categories, Product, Category } from "@/data/products";

export interface DatabaseProduct {
  id: string;
  product_id: string;
  name: string;
  category: string;
  description_en: string | null;
  description_mm: string | null;
  material: string | null;
  colors: string[] | null;
  sizes: string[] | null;
  usage: string[] | null;
  price_note: string | null;
  image_url: string | null;
  image_cap_url: string | null;
  images: string[] | null;
  is_active: boolean | null;
  sort_order: number | null;
  cap_type: string | null;
  cap_sizes: string[] | null;
  price_per_bottle: number | null;
  price_per_cap: number | null;
}

// Extended Product interface with pricing
export interface ProductWithPricing extends Product {
  pricePerBottle?: number | null;
  pricePerCap?: number | null;
  capType?: string | null;
  capSizes?: string[] | null;
}

// Convert database product to app Product format
const convertToAppProduct = (dbProduct: DatabaseProduct): ProductWithPricing => {
  // For caps, use the images array directly if available
  // For bottles, fallback to image_url and image_cap_url
  let productImages: string[] = [];
  
  if (dbProduct.images && dbProduct.images.length > 0 && dbProduct.images.some(Boolean)) {
    // Use the images array (for caps with 3 images)
    productImages = dbProduct.images.filter(Boolean);
  } else {
    // Fallback to legacy image_url and image_cap_url (for bottles)
    productImages = [dbProduct.image_url || "", dbProduct.image_cap_url || ""].filter(Boolean);
  }

  return {
    id: dbProduct.product_id,
    name: dbProduct.name,
    category: dbProduct.category,
    description_en: dbProduct.description_en || "",
    description_mm: dbProduct.description_mm || "",
    material: dbProduct.material || "Food-grade PET",
    colors: dbProduct.colors || ["White"],
    sizes: dbProduct.sizes || ["1L"],
    usage: dbProduct.usage || ["Drinking water filling", "Retail packaging"],
    priceNote: dbProduct.price_note || "Factory pricing available. Please contact our counter.",
    images: productImages,
    sortOrder: dbProduct.sort_order || 999,
    pricePerBottle: dbProduct.price_per_bottle,
    pricePerCap: dbProduct.price_per_cap,
    capType: dbProduct.cap_type,
    capSizes: dbProduct.cap_sizes,
  };
};

export const useProducts = (categoryId?: string) => {
  return useQuery({
    queryKey: ["products", categoryId],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (categoryId) {
        query = query.eq("category", categoryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }

      // If database has products, use them
      if (data && data.length > 0) {
        return data.map(convertToAppProduct);
      }

      // Fallback to static products (sorted)
      const staticProducts = getSortedProducts();
      if (categoryId) {
        return staticProducts.filter((p) => p.category === categoryId);
      }
      return staticProducts;
    },
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const decodedId = decodeURIComponent(productId || "");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_id", decodedId)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("Error fetching product:", error);
        throw error;
      }

      // If found in database, return it
      if (data) {
        return convertToAppProduct(data);
      }

      // Try lookup by product name (for URLs using name instead of id)
      const { data: nameMatch, error: nameError } = await supabase
        .from("products")
        .select("*")
        .eq("name", decodedId)
        .eq("is_active", true)
        .maybeSingle();

      if (nameError) {
        console.error("Error fetching product by name:", nameError);
        throw nameError;
      }

      if (nameMatch) {
        return convertToAppProduct(nameMatch);
      }

      // Fallback to static product
      const staticProducts = getSortedProducts();
      const normalized = decodedId.toLowerCase().replace(/\s+/g, "-");
      return staticProducts.find((p) => {
        const byId = p.id.toLowerCase() === decodedId.toLowerCase();
        const byName = p.name.toLowerCase() === decodedId.toLowerCase();
        const byNameSlug = p.name.toLowerCase().replace(/\s+/g, "-") === normalized;
        return byId || byName || byNameSlug;
      });
    },
  });
};

export const useCategories = () => {
  return {
    categories,
  };
};

export const useCategory = (categoryId: string) => {
  return {
    category: categories.find((c) => c.id === categoryId),
  };
};
