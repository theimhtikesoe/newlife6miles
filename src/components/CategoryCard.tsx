import { Link } from "react-router-dom";
import { ArrowRight, Package, Circle, Cylinder } from "lucide-react";
import { Category } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "bottle":
      return Package;
    case "cap":
      return Circle;
    case "tube":
      return Cylinder;
    default:
      return Package;
  }
};

// Category translations
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

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const Icon = getIcon(category.icon);
  const { t } = useLanguage();

  return (
    <Link
      to={`/products/${category.id}`}
      className="card-industrial p-6 sm:p-8 flex flex-col group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image or Icon */}
      {category.image ? (
        <div className="aspect-video rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center mb-6 overflow-hidden group-hover:from-primary/5 group-hover:to-primary/10 transition-colors">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-7 h-7 text-primary" />
        </div>
      )}

      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {t(category.name, getCategoryNameMM(category.id))}
      </h3>
      <p className="text-muted-foreground text-sm flex-1">
        {t(category.description, getCategoryDescMM(category.id))}
      </p>

      {/* CTA */}
      <div className="mt-6 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
        <span>{t("View Details", "အသေးစိတ်ကြည့်ရန်")}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
};

export default CategoryCard;
