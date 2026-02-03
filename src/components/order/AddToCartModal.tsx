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

interface AddToCartModalProps {
  product: Product;
  pricePerCap: number;
  isOpen: boolean;
  onClose: () => void;
  editItem?: CartItem;
}

const CAP_SIZE_OPTIONS = [
  { value: "100", label: "100 ဆံ့" },
  { value: "200", label: "200 ဆံ့" },
  { value: "400", label: "400 ဆံ့" },
  { value: "custom", label: "Custom" },
];

const AddToCartModal = ({
  product,
  pricePerCap,
  isOpen,
  onClose,
  editItem,
}: AddToCartModalProps) => {
  const { t } = useLanguage();
  const { addItem, updateItem } = useCart();

  const [capSizeOption, setCapSizeOption] = useState("100");
  const [customCapSize, setCustomCapSize] = useState("");
  const [cardQuantity, setCardQuantity] = useState(1);

  // Reset form when modal opens or editItem changes
  useEffect(() => {
    if (isOpen) {
      if (editItem) {
        const matchingOption = CAP_SIZE_OPTIONS.find(
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
  }, [isOpen, editItem]);

  const actualCapSize = useMemo(() => {
    if (capSizeOption === "custom") {
      const parsed = parseInt(customCapSize, 10);
      return isNaN(parsed) || parsed <= 0 ? 0 : parsed;
    }
    return parseInt(capSizeOption, 10);
  }, [capSizeOption, customCapSize]);

  const totalCaps = useMemo(() => {
    return actualCapSize * cardQuantity;
  }, [actualCapSize, cardQuantity]);

  const totalPrice = useMemo(() => {
    return totalCaps * pricePerCap;
  }, [totalCaps, pricePerCap]);

  const isValid = actualCapSize > 0 && cardQuantity >= 1;

  const handleAddToCart = () => {
    if (!isValid) {
      toast({
        title: t("Invalid Input", "ထည့်သွင်းချက်မမှန်ပါ"),
        description: t(
          "Please check cap size and card quantity",
          "ဆံ့နှင့် ကဒ်အရေအတွက်ကို စစ်ဆေးပါ"
        ),
        variant: "destructive",
      });
      return;
    }

    const itemData = {
      productId: product.id,
      productName: product.name,
      pricePerCap,
      capSize: actualCapSize,
      cardQuantity,
      totalCaps,
      totalPrice,
      productImage: product.images?.[0],
    };

    if (editItem) {
      updateItem(editItem.id, itemData);
      toast({
        title: t("Cart Updated", "စျေးခြင်းပြင်ဆင်ပြီး"),
        description: t("Item updated in cart", "ပစ္စည်းကို ပြင်ဆင်ပြီးပါပြီ"),
      });
    } else {
      addItem(itemData);
      toast({
        title: t("Added to Cart", "စျေးခြင်းထဲထည့်ပြီး"),
        description: `${product.name} - ${totalCaps} ${t("caps", "ဆံ့")}`,
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
          {/* Price per cap (read-only) */}
          <div className="p-4 bg-secondary rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("Price per cap", "၁ ဆံ့ စျေး")}
              </span>
              <span className="text-lg font-bold text-foreground">
                {formatPrice(pricePerCap)} MMK
              </span>
            </div>
          </div>

          {/* Cap Size Selection */}
          <div className="space-y-2">
            <Label htmlFor="cap-size">
              {t("Cap Size", "ဆံ့")} <span className="text-destructive">*</span>
            </Label>
            <Select value={capSizeOption} onValueChange={setCapSizeOption}>
              <SelectTrigger id="cap-size" className="bg-background">
                <SelectValue placeholder={t("Select cap size", "ဆံ့ ရွေးပါ")} />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {CAP_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {capSizeOption === "custom" && (
              <div className="mt-2">
                <Label htmlFor="custom-cap-size" className="text-sm">
                  {t("Enter cap quantity", "ဆံ့ အရေအတွက် ထည့်ပါ")}
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
              {t("Card Quantity", "ကဒ် အရေအတွက်")}{" "}
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
                {actualCapSize} × {cardQuantity} × {formatPrice(pricePerCap)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {t("Total Caps", "စုစုပေါင်း ဆံ့")}
              </span>
              <span className="font-bold text-foreground">
                {formatPrice(totalCaps)} {t("caps", "ဆံ့")}
              </span>
            </div>

            <div className="h-px bg-border my-2" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                {t("Total Price", "စုစုပေါင်း စျေး")}
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
              ? t("Update Cart", "စျေးခြင်းပြင်ဆင်ရန်")
              : t("Add to Cart", "Add to Cart")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddToCartModal;
