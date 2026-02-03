import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, CheckCircle } from "lucide-react";

const OrderReview = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, getGrandTotal } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("my-MM").format(price);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="section-padding">
          <div className="container-narrow max-w-2xl">
            {/* Back Button */}
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("Back to Cart", "စျေးခြင်းသို့")}</span>
            </button>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("Order Review", "အမှာစာ ပြန်ကြည့်ရန်")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t(
                "Review your order before proceeding",
                "ဆက်လက်မပြုမီ သင့်အမှာစာကို စစ်ဆေးပါ"
              )}
            </p>

            {/* Order Items */}
            <div className="card-industrial p-6 mb-6">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                {t("Order Items", "အမှာစာ ပစ္စည်းများ")}
              </h2>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id}>
                    {index > 0 && <div className="h-px bg-border mb-4" />}
                    <div className="flex items-start gap-4">
                      {item.productImage && (
                        <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-secondary">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">
                          {item.productName}
                        </h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          {formatPrice(item.capSize)} ဆံ့ × {item.cardQuantity}{" "}
                          ကဒ် = {formatPrice(item.totalCaps)} ဆံ့
                        </div>
                        <div className="text-sm text-muted-foreground">
                          @ {formatPrice(item.pricePerCap)} MMK/ဆံ့
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-foreground">
                          {formatPrice(item.totalPrice)} MMK
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border my-4" />

              <div className="flex items-center justify-between text-lg font-bold">
                <span>{t("Grand Total", "စုစုပေါင်း")}</span>
                <span className="text-primary">
                  {formatPrice(getGrandTotal())} MMK
                </span>
              </div>
            </div>

            {/* Continue Button */}
            <Link to="/customer-info" className="block">
              <Button className="w-full h-12 text-base font-semibold">
                <CheckCircle className="w-5 h-5 mr-2" />
                {t("Continue", "ဆက်လက်ရန်")}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderReview;
