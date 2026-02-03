import { useState } from "react";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  product_id: string;
  name: string;
  category: string;
  image_url: string | null;
  is_active: boolean | null;
  sort_order: number | null;
}

interface ReorderableProductListProps {
  products: Product[];
  onReorderComplete: () => void;
}

const getCategoryNameMM = (id: string): string => {
  const names: Record<string, string> = {
    "bottle-shells": "ဘူးအခွံများ",
    "caps": "အဖုံးများ",
  };
  return names[id] || id;
};

const SortableRow = ({ product }: { product: Product }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-4 bg-card border border-border/50 rounded-lg transition-all duration-200 ${
        isDragging
          ? "shadow-lg ring-2 ring-primary/50 scale-[1.02] z-50 bg-card/95"
          : "hover:border-primary/30"
      } ${!product.is_active ? "opacity-60" : ""}`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="p-2 rounded-lg bg-muted hover:bg-primary/10 cursor-grab active:cursor-grabbing transition-colors touch-manipulation"
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Product Image */}
      <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain p-1"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{product.product_id}</p>
      </div>

      {/* Category Badge */}
      <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full shrink-0">
        {getCategoryNameMM(product.category)}
      </span>

      {/* Status Badge */}
      {!product.is_active && (
        <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full shrink-0">
          ဝှက်ထားသည်
        </span>
      )}
    </div>
  );
};

const ReorderableProductList = ({ products, onReorderComplete }: ReorderableProductListProps) => {
  const [items, setItems] = useState(products);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      // Save new order to database
      setIsSaving(true);
      try {
        const updates = newItems.map((item, index) => ({
          id: item.id,
          sort_order: index,
        }));

        // Update each product's sort_order
        for (const update of updates) {
          const { error } = await supabase
            .from("products")
            .update({ sort_order: update.sort_order })
            .eq("id", update.id);

          if (error) throw error;
        }

        toast.success("ပစ္စည်း အစီအစဥ် ပြောင်းလဲပြီးပါပြီ");
        onReorderComplete();
      } catch (error: any) {
        toast.error("အစီအစဥ် ပြောင်းလဲ၍မရပါ: " + error.message);
        // Revert on error
        setItems(products);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="relative">
      {isSaving && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <span className="text-sm text-muted-foreground">သိမ်းဆည်းနေသည်...</span>
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((product) => (
              <SortableRow key={product.id} product={product} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ReorderableProductList;
