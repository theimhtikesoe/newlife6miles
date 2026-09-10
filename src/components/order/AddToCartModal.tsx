import { useState, useEffect, useMemo } from "react";
import { Product } from "@/data/products";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { ShoppingCart, Calculator } from "lucide-react";
import {
  getLedgerBottleRows,
  getLedgerCardPrice,
  LEDGER_CAP_PRICE,
  LedgerPricingRow,
} from "@/data/ledgerPricing";

interface AddToCartModalProps {
  product: Product;
  pricePerCap: number;
  isOpen: boolean;
  onClose: () => void;
  editItem?: CartItem;
}

const AddToCartModal = ({
  product,
  pricePerCap,
  isOpen,
  onClose,
  editItem,
}: AddToCartModalProps) => {
  const { t } = useLanguage();
  const { addItem, updateItem } = useCart();
  const isBottle = product.category !== "caps";
  const bottleRows = useMemo(
    () => getLedgerBottleRows(product.id, product.name),
    [product.id, product.name]
  );
  const cardSizeOptions = useMemo(() => {
    if (!isBottle) {
      return [
        { value: "100", label: t("100 caps", "၁၀၀ အဖုံး") },
        { value: "200", label: t("200 caps", "၂၀၀ အဖုံး") },
        { value: "400", label: t("400 caps", "၄၀၀ အဖုံး") },
        { value: "custom", label: t("Custom", "စိတ်ကြိုက်") },
      ];
    }
    return bottleRows.map((row) => ({
      value: String(row.bottlesPerCard),
      label: `${row.bottlesPerCard} ${t("bottles / card", "ဘူး / ကဒ်")}`,
    }));
  }, [bottleRows, isBottle, t]);

  const [capSizeOption, setCapSizeOption] = useState("100");
  const [customCapSize, setCustomCapSize] = useState("");
  const [cardQuantity, setCardQuantity] = useState(1);

  // Reset form when modal opens or editItem changes
  useEffect(() => {
    if (isOpen) {
      if (editItem) {
        const matchingOption = cardSizeOptions.find(
          (opt) => opt.value === String(editItem.capSize)
        );
        if (matchingOption) {
          setCapSizeOption(String(editItem.capSize));
          setCustomCapSize("");
        } else {
          setCapSizeOption("custom");
          setCustomCapSize(String(editItem.capSize));
        }
        setCardQuantity(editItem.cardQuantity);
      } else {
        setCapSizeOption("100");
        setCustomCapSize("");
        setCardQuantity(1);
      }
    }
  }, [isOpen, editItem, cardSizeOptions]);

  const actualCapSize = useMemo(() => {
    if (capSizeOption === "custom") {
      const parsed = parseInt(customCapSize, 10);
      return isNaN(parsed) || parsed <= 0 ? 0 : parsed;
    }
    return parseInt(capSizeOption, 10);
  }, [capSizeOption, customCapSize]);

  const selectedBottleRow = useMemo<LedgerPricingRow | undefined>(() => {
    if (!isBottle) return undefined;
    return bottleRows.find((row) => row.bottlesPerCard === actualCapSize);
  }, [actualCapSize, bottleRows, isBottle]);

  const unitPrice = isBottle
    ? selectedBottleRow?.pricePerBottle || 0
    : LEDGER_CAP_PRICE;

  const totalCaps = useMemo(() => {
    return actualCapSize * cardQuantity;
  }, [actualCapSize, cardQuantity]);

  const totalPrice = useMemo(() => {
    if (isBottle && selectedBottleRow) return getLedgerCardPrice(selectedBottleRow) * cardQuantity;
    return totalCaps * unitPrice;
  }, [cardQuantity, isBottle, selectedBottleRow, totalCaps, unitPrice]);

  const isValid = actualCapSize > 0 && cardQuantity >= 1 && (!isBottle || !!selectedBottleRow);

  const handleAddToCart = () => {
    if (!isValid) {
      toast({
        title: t("Invalid Input", "ထည့်သွင်းချက်မမှန်ပါ"),
        description: t(
          "Please check cap size and card quantity",
          "ကတ်တစ်ခုအဖုံးအရေအတွက်နှင့် ကတ်အရေအတွက်ကို စစ်ဆေးပါ"
        ),
        variant: "destructive",
      });
      return;
    }

    const itemData = {
      productId: product.id,
      productName: product.name,
      pricePerCap: unitPrice,
      capSize: actualCapSize,
      cardQuantity,
      totalCaps,
      totalPrice,
      productImage: product.images?.[0],
      unitType: isBottle ? "bottle" : "cap",
    };

    if (editItem) {
      updateItem(editItem.id, itemData);
      toast({
        title: t("Cart Updated", "စျေးခြင်းကို ပြင်ဆင်ပြီးပါပြီ"),
        description: t("Item updated in cart", "စျေးခြင်းထဲက ပစ္စည်းကို ပြင်ဆင်ပြီးပါပြီ"),
      });
    } else {
      addItem(itemData);
      toast({
        title: t("Added to Cart", "စျေးခြင်းထဲ ထည့်ပြီးပါပြီ"),
        description: `${product.name} - ${totalCaps} ${isBottle ? t("bottles", "ဘူး") : t("caps", "အဖုံး")}`,
      });
    }

    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("my-MM").format(price);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-auto max-h-[90vh] overflow-y-auto">
        <SheetHeader className="text-left mb-6">
          <SheetTitle className="text-xl font-bold">
            {product.name}
          </SheetTitle>
          <SheetDescription>
            {t("Configure your order", "သင့်အမှာစာကို သတ်မှတ်ပါ")}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Ledger unit price (read-only) */}
          <div className="p-4 bg-secondary rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {isBottle
                  ? t("Price per bottle", "ဘူးတစ်လုံးလျှင် စျေးနှုန်း")
                  : t("Price per cap", "အဖုံးတစ်ခုလျှင် စျေးနှုန်း")}
              </span>
              <span className="text-lg font-bold text-foreground">
                {formatPrice(unitPrice)} MMK
              </span>
            </div>
          </div>

          {/* Cap Size Selection */}
          <div className="space-y-2">
            <Label htmlFor="cap-size">
              {isBottle
                ? t("Card type / bottles per card", "ကဒ်အမျိုးအစား / ကဒ်တစ်ကဒ်ဆံ့အရေအတွက်")
                : t("Cap Size", "ကတ်တစ်ခုအဖုံးအရေအတွက်")} <span className="text-destructive">*</span>
            </Label>
            <Select value={capSizeOption} onValueChange={setCapSizeOption}>
              <SelectTrigger id="cap-size" className="bg-background">
                <SelectValue placeholder={t("Select card type", "ကဒ်အမျိုးအစား ရွေးပါ")} />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {cardSizeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {capSizeOption === "custom" && (
              <div className="mt-2">
                <Label htmlFor="custom-cap-size" className="text-sm">
                  {isBottle
                    ? t("Enter bottles per card", "ကဒ်တစ်ကဒ်ဆံ့အရေအတွက် ထည့်ပါ")
                    : t("Enter cap quantity", "ကတ်တစ်ခုအဖုံးအရေအတွက် ထည့်ပါ")}
                </Label>
                <Input
                  id="custom-cap-size"
                  type="number"
                  min="1"
                  value={customCapSize}
                  onChange={(e) => setCustomCapSize(e.target.value)}
                  placeholder="e.g., 150"
                  className="mt-1"
                />
              </div>
            )}
          </div>

          {/* Card Quantity */}
          <div className="space-y-2">
            <Label htmlFor="card-quantity">
              {t("Card Quantity", "ကတ်အရေအတွက်")}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="card-quantity"
              type="number"
              min="1"
              value={cardQuantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setCardQuantity(isNaN(val) || val < 1 ? 1 : val);
              }}
              className="bg-background"
            />
          </div>

          {/* Live Calculation */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 space-y-3">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Calculator className="w-5 h-5" />
              <span className="font-semibold">
                {t("Order Summary", "အမှာစာ အကျဉ်းချုပ်")}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {t("Formula", "တွက်ချက်ပုံ")}
              </span>
              <span className="font-mono text-foreground">
                {actualCapSize} × {cardQuantity} × {formatPrice(unitPrice)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {isBottle ? t("Total Bottles", "စုစုပေါင်း ဘူး") : t("Total Caps", "စုစုပေါင်း အဖုံး")}
              </span>
              <span className="font-bold text-foreground">
                {formatPrice(totalCaps)} {isBottle ? t("bottles", "ဘူး") : t("caps", "အဖုံး")}
              </span>
            </div>

            <div className="h-px bg-border my-2" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                {t("Total Price", "စုစုပေါင်း စျေးနှုန်း")}
              </span>
              <span className="text-xl font-bold text-primary">
                {formatPrice(totalPrice)} MMK
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!isValid}
            className="w-full h-12 text-base font-semibold"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {editItem
              ? t("Update Cart", "စျေးခြင်းကို ပြင်ဆင်ရန်")
              : t("Add to Cart", "စျေးခြင်းထဲထည့်ရန်")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddToCartModal;
