import { useParams } from "react-router-dom";
import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import SortableProductCard from "@/components/SortableProductCard";
import { useProducts, useCategories, useCategory } from "@/hooks/useProducts";
import { useProductReorder } from "@/hooks/useProductReorder";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Shield } from "lucide-react";
import { Product } from "@/data/products";

const Products = () => {
  const { categoryId } = useParams();
  const { t } = useLanguage();
  const { categories } = useCategories();
  const { category } = useCategory(categoryId || "");
  const { data: products, isLoading, error } = useProducts(categoryId);
  const { isAdmin } = useAuth();
  const reorderMutation = useProductReorder();
  
  // Local state for optimistic reordering
  const [localProducts, setLocalProducts] = useState<Product[] | null>(null);
  
  // Use local products if set, otherwise use fetched products
  const displayProducts = localProducts || products;

  // Drag sensors with touch support
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || !displayProducts) {
      return;
    }

    const oldIndex = displayProducts.findIndex((p) => p.id === active.id);
    const newIndex = displayProducts.findIndex((p) => p.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Optimistic update
    const newProducts = arrayMove(displayProducts, oldIndex, newIndex);
    setLocalProducts(newProducts);

    // Prepare reorder items with new sort_order values
    const reorderItems = newProducts.map((product, index) => ({
      productId: product.id,
      sortOrder: index + 1,
    }));

    // Save to database
    reorderMutation.mutate(reorderItems, {
      onSuccess: () => {
        // Clear local state after successful save
        setLocalProducts(null);
      },
      onError: () => {
        // Revert on error
        setLocalProducts(null);
      },
    });
  }, [displayProducts, reorderMutation]);

  // If no category selected, show all categories
  if (!categoryId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Page Header */}
          <section className="hero-section section-padding py-16">
            <div className="container-narrow">
              <div className="max-w-xl">
                <div className="industrial-line mb-4" />
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {t("Product Range", "ထုတ်ကုန်အမျိုးအစားများ")}
                </h1>
                <p className="text-muted-foreground">
                  {t(
                    "Three essential categories for complete water bottle packaging. Select a category to explore our products.",
                    "ရေဘူးထုပ်ပိုးခြင်း အပြည့်အစုံအတွက် အဓိကအမျိုးအစား သုံးမျိုး။ ထုတ်ကုန်များကို ကြည့်ရန် အမျိုးအစားတစ်ခုကို ရွေးပါ။"
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="section-padding pt-0">
            <div className="container-narrow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {categories.map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} />
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">{t("Category not found", "အမျိုးအစား မတွေ့ပါ")}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="hero-section section-padding py-16">
          <div className="container-narrow">
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-xl">
                <div className="industrial-line mb-4" />
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  {t(category.name, getCategoryNameMM(category.id))}
                </h1>
                <p className="text-muted-foreground">
                  {t(category.description, getCategoryDescMM(category.id))}
                </p>
              </div>

              {/* Admin Mode Indicator */}
              {isAdmin && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium shrink-0">
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {t("Admin Mode", "အက်ဒမင် မုဒ်")}
                  </span>
                </div>
              )}
            </div>

            {/* Admin Reorder Instructions */}
            {isAdmin && displayProducts && displayProducts.length > 1 && (
              <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {t("Drag & Drop:", "ဆွဲပြီး စီစဉ်ရန်:")}
                </span>{" "}
                {t(
                  "Hover over cards and drag the handle to reorder products.",
                  "ကတ်ပေါ်ကို တင်ပြီး လက်ကိုင်ကို ဆွဲကာ ထုတ်ကုန်များကို စီစဉ်ပါ။"
                )}
              </div>
            )}
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding pt-0">
          <div className="container-narrow">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">
                  {t("Loading products...", "ထုတ်ကုန်များ ရယူနေသည်...")}
                </span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive">
                  {t("Error loading products.", "ထုတ်ကုန်များ ရယူရာတွင် အမှားရှိသည်။")}
                </p>
              </div>
            ) : displayProducts && displayProducts.length > 0 ? (
              isAdmin ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={displayProducts.map((p) => p.id)}
                    strategy={rectSortingStrategy}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayProducts.map((product, index) => (
                        <SortableProductCard
                          key={product.id}
                          product={product}
                          index={index}
                          isAdmin={isAdmin}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {t("No products found in this category.", "ဤအမျိုးအစားတွင် ထုတ်ကုန်မရှိပါ။")}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Helper functions for Myanmar translations
const getCategoryNameMM = (id: string): string => {
  const names: Record<string, string> = {
    "bottle-shells": "ဘူးအခွံများ",
    "caps": "အဖုံးများ",
    "preform-tubes": "Preform Tube များ",
  };
  return names[id] || "";
};

const getCategoryDescMM = (id: string): string => {
  const descs: Record<string, string> = {
    "bottle-shells": "ရေဖြည့်ရန် အဆင်သင့်ဖြစ်သော ဘူးအခွံများ",
    "caps": "ဘူးတိုင်းအတွက် လုံခြုံစွာပိတ်နိုင်သော အဖုံးများ",
    "preform-tubes": "ဘူးမဖြစ်ခင် ကုန်ကြမ်းပစ္စည်း",
  };
  return descs[id] || "";
};

export default Products;
