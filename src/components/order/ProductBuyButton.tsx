import { useState } from "react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import AddToCartModal from "./AddToCartModal";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductBuyButtonProps {
  product: Product;
  pricePerCap?: number;
}

const ProductBuyButton = ({ product, pricePerCap = 50 }: ProductBuyButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        size="sm"
        className="shrink-0 font-medium"
      >
        {t("Add to order", "မှာယူရန်")}
      </Button>

      <AddToCartModal
        product={product}
        pricePerCap={pricePerCap}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductBuyButton;
