import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Package,
  User,
  Phone,
  MapPin,
  FileText,
  CheckCircle,
  Loader2,
} from "lucide-react";

const OrderConfirm = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, customerInfo, getGrandTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("my-MM").format(price);
  };

  if (items.length === 0 || !customerInfo) {
    navigate("/cart");
    return null;
  }

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);

    try {
      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: customerInfo.name,
          customer_phone: customerInfo.phone,
          customer_city: customerInfo.city,
          customer_notes: customerInfo.notes || null,
          total_amount: getGrandTotal(),
          status: "pending",
        })
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: orderData.id,
        product_id: item.productId,
        product_name: item.productName,
        price_per_cap: item.pricePerCap,
        cap_size: item.capSize,
        card_quantity: item.cardQuantity,
        total_caps: item.totalCaps,
        total_price: item.totalPrice,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        throw itemsError;
      }

      // Success
      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        title: t("Error", "အမှား"),
        description: t(
          "Failed to submit order. Please try again.",
          "အမှာစာပေးပို့ရန် မအောင်မြင်ပါ။ ထပ်ကြိုးစားပါ။"
        ),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="section-padding">
          <div className="container-narrow max-w-2xl">
            {/* Back Button */}
            <button
              onClick={() => navigate("/customer-info")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("Back", "နောက်သို့")}</span>
            </button>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("Confirm Order", "အမှာစာ အတည်ပြုရန်")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t(
                "Review and confirm your order",
                "သင့်အမှာစာကို ပြန်ကြည့်ပြီး အတည်ပြုပါ"
              )}
            </p>

            {/* Order Items */}
            <div className="card-industrial p-6 mb-4">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                {t("Order Items", "အမှာစာ ပစ္စည်းများ")}
              </h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <span className="font-medium text-foreground">
                        {item.productName}
                      </span>
                      <div className="text-muted-foreground">
                        {formatPrice(item.capSize)} ဆံ့ × {item.cardQuantity} ကဒ်
                      </div>
                    </div>
                    <span className="font-semibold">
                      {formatPrice(item.totalPrice)} MMK
                    </span>
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

            {/* Customer Info */}
            <div className="card-industrial p-6 mb-8">
              <h2 className="font-semibold text-foreground mb-4">
                {t("Customer Details", "ဖောက်သည်အချက်အလက်")}
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{customerInfo.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{customerInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{customerInfo.city}</span>
                </div>
                {customerInfo.notes && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">
                      {customerInfo.notes}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t("Submitting...", "ပေးပို့နေသည်...")}
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {t("Confirm Order", "Confirm Order")}
                </>
              )}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirm;
