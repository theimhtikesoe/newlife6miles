import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface SortableProductCardProps {
  product: Product;
  index: number;
  isAdmin: boolean;
}

const SortableProductCard = ({ product, index, isAdmin }: SortableProductCardProps) => {
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
    zIndex: isDragging ? 50 : undefined,
  };

  if (!isAdmin) {
    return <ProductCard product={product} index={index} />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group/sortable ${
        isDragging 
          ? "opacity-90 scale-[1.02] shadow-2xl ring-2 ring-primary/50" 
          : ""
      }`}
    >
      {/* Drag Handle - Admin Only */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg 
          bg-primary/90 text-primary-foreground shadow-lg
          cursor-grab active:cursor-grabbing
          opacity-0 group-hover/sortable:opacity-100 transition-opacity duration-200
          hover:bg-primary hover:scale-110"
        title="Drag to reorder"
      >
        <GripVertical className="w-5 h-5" />
      </div>

      {/* Product Card */}
      <div className={`transition-all duration-200 ${isDragging ? "pointer-events-none" : ""}`}>
        <ProductCard product={product} index={0} />
      </div>

      {/* Drag Indicator Border */}
      {isAdmin && (
        <div className="absolute inset-0 rounded-lg border-2 border-transparent 
          group-hover/sortable:border-primary/30 transition-colors pointer-events-none" />
      )}
    </div>
  );
};

export default SortableProductCard;
