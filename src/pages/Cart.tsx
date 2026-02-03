import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AddToCartModal from "@/components/order/AddToCartModal";
import {
  ArrowLeft,
  Trash2,
  Edit2,
  ShoppingBag,
  Package,
} from "lucide-react";

const Cart = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, removeItem, getGrandTotal } = useCart();
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("my-MM").format(price);
  };

  const getProductForItem = (item: CartItem) => {
    return products.find((p) => p.id === item.productId);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <ShoppingBag className="w-24 h-24 text-muted-foreground mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t("Your cart is empty", "သင့်စျေးခြင်းထဲမှာ ဘာမှမရှိပါ")}
          </h1>
          <p className="text-muted-foreground mb-6 text-center">
            {t(
              "Add products to get started",
              "ပစ္စည်းများထည့်၍ စတင်ပါ"
            )}
          </p>
          <Link to="/products">
            <Button>
              {t("Browse Products", "ပစ္စည်းများကြည့်ရန်")}
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="section-padding">
          <div className="container-narrow">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("Back", "နောက်သို့")}</span>
            </button>

            <h1 className="text-3xl font-bold text-foreground mb-8">
              {t("Shopping Cart", "စျေးခြင်း")}
            </h1>

            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {items.map((item) => {
                const product = getProductForItem(item);
                return (
                  <div
                    key={item.id}
                    className="card-industrial p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
                  >
                    {/* Product Image */}
                    {item.productImage && (
                      <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-secondary">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    )}

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-2">
                        {item.productName}
                      </h3>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                        <span>{t("Cap Size", "ဆံ့")}:</span>
                        <span className="font-medium text-foreground">
                          {formatPrice(item.capSize)} ဆံ့
                        </span>

                        <span>{t("Cards", "ကဒ်")}:</span>
                        <span className="font-medium text-foreground">
                          {item.cardQuantity} ကဒ်
                        </span>

                        <span>{t("Total Caps", "စုစုပေါင်း ဆံ့")}:</span>
                        <span className="font-medium text-foreground">
                          {formatPrice(item.totalCaps)} ဆံ့
                        </span>

                        <span>{t("Price/Cap", "၁ ဆံ့ စျေး")}:</span>
                        <span className="font-medium text-foreground">
                          {formatPrice(item.pricePerCap)} MMK
                        </span>
                      </div>

                      <div className="text-lg font-bold text-primary">
                        {formatPrice(item.totalPrice)} MMK
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => product && setEditingItem(item)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="card-industrial p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-foreground">
                  {t("Grand Total", "စုစုပေါင်း")}
                </span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(getGrandTotal())} MMK
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Package className="w-4 h-4" />
                <span>
                  {items.length} {t("items", "ခု")}
                </span>
              </div>

              <Link to="/order-review" className="block">
                <Button className="w-full h-12 text-base font-semibold">
                  {t("Continue", "ဆက်လက်ရန်")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Edit Modal */}
      {editingItem && (
        <AddToCartModal
          product={getProductForItem(editingItem)!}
          pricePerCap={editingItem.pricePerCap}
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          editItem={editingItem}
        />
      )}
    </div>
  );
};

export default Cart;
