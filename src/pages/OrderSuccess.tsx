import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Package } from "lucide-react";

const OrderSuccess = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="section-padding text-center max-w-lg mx-auto">
          {/* Success Icon */}
          <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {t("Order Received!", "အမှာစာ လက်ခံပြီးပါပြီ!")}
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            {t(
              "Thank you for your order. We will contact you shortly to confirm the details.",
              "သင့်အမှာစာအတွက် ကျေးဇူးတင်ပါသည်။ အသေးစိတ်အတည်ပြုရန် မကြာမီ ဆက်သွယ်ပါမည်။"
            )}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                {t("Go Home", "ပင်မစာမျက်နှာ")}
              </Button>
            </Link>
            <Link to="/products">
              <Button className="w-full sm:w-auto">
                <Package className="w-4 h-4 mr-2" />
                {t("Continue Shopping", "ဆက်လက်ဝယ်ယူရန်")}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
