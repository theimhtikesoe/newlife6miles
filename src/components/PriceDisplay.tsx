import { useAppSettings } from "@/hooks/useAppSettings";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceDisplayProps {
  pricePerBottle?: number | null;
  pricePerCap?: number | null;
  category: string;
  className?: string;
}

const PriceDisplay = ({ pricePerBottle, pricePerCap, category, className = "" }: PriceDisplayProps) => {
  const { data: settings, isLoading } = useAppSettings();
  const { t } = useLanguage();

  // Don't show prices if setting is off or loading
  if (isLoading || !settings?.show_price) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("my-MM").format(price);
  };

  // For bottles: show price per bottle (ဘူးတစ်လုံးလျှင် စျေးနှုန်း)
  // For caps: show price per cap (အဖုံးတစ်ခုလျှင် စျေးနှုန်း)
  if (category === "caps") {
    if (!pricePerCap || pricePerCap <= 0) return null;
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-muted-foreground">
          {t("Price per cap", "အဖုံးတစ်ခုလျှင် စျေးနှုန်း")}:
        </span>
        <span className="text-lg font-bold text-primary">
          {formatPrice(pricePerCap)} MMK
        </span>
      </div>
    );
  }

  // Bottle shells
  if (!pricePerBottle || pricePerBottle <= 0) return null;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-muted-foreground">
        {t("Price per bottle", "ဘူးတစ်လုံးလျှင် စျေးနှုန်း")}:
      </span>
      <span className="text-lg font-bold text-primary">
        {formatPrice(pricePerBottle)} MMK
      </span>
    </div>
  );
};

export default PriceDisplay;
