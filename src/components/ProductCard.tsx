import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import OptimizedImage from "./OptimizedImage";
import ProductBuyButton from "./order/ProductBuyButton";

interface ProductCardProps {
  product: Product;
  index: number;
  pricePerCap?: number;
}

// Color translations
const getColorMM = (color: string): string => {
  const colors: Record<string, string> = {
    "White": "အဖြူ",
    "Blue": "အပြာ",
    "Black": "အမည်း",
    "Clear": "ကြည်လင်",
    "Mixed colors": "ရောစပ်အရောင်များ",
  };
  return colors[color] || color;
};

const ProductCard = ({ product, index, pricePerCap = 50 }: ProductCardProps) => {
  const { t, language } = useLanguage();
  const [showCap, setShowCap] = useState(false);
  const hasAltImage = (product.images?.length || 0) > 1;
  const currentImage = product.images?.[hasAltImage && showCap ? 1 : 0];

  return (
    <div
      className="card-industrial p-6 flex flex-col group animate-slide-up relative"
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => hasAltImage && setShowCap(true)}
      onMouseLeave={() => hasAltImage && setShowCap(false)}
    >
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        {/* Product Image */}
        <div className="aspect-square rounded-lg overflow-hidden mb-5">
          {currentImage ? (
            <OptimizedImage
              src={currentImage}
              alt={product.name}
              aspectRatio="square"
              className="p-2 group-hover:scale-105 transition-transform duration-300"
              containerClassName="bg-gradient-to-br from-secondary to-muted group-hover:from-primary/5 group-hover:to-primary/10 transition-colors"
              enhanceOnHover
              showSkeleton={false}
              fadeIn={false}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {product.name.charAt(0)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <h3 className="font-semibold text-foreground mb-2 text-lg leading-tight">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 flex-1 mb-4">
          {language === "en" ? product.description_en : product.description_mm}
        </p>

        {/* Colors */}
        <div className="flex items-center gap-2 mb-4">
          {product.colors.slice(0, 3).map((color) => (
            <span
              key={color}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {t(color, getColorMM(color))}
            </span>
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{product.colors.length - 3}
            </span>
          )}
        </div>
      </Link>

      {/* Bottom Row with CTA */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-border">
        <Link
          to={`/product/${product.id}`}
          className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all"
        >
          <span>{t("View Specs", "အသေးစိတ်ကြည့်ရန်")}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Buy button temporarily hidden
        <ProductBuyButton product={product} pricePerCap={pricePerCap} />
        */}
      </div>
    </div>
  );
};

export default ProductCard;
