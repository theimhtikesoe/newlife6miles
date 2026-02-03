import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, User, Phone, MapPin, FileText } from "lucide-react";

const CustomerInfo = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, setCustomerInfo } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = t("Name is required", "နာမည်ထည့်ပါ");
    }

    if (!phone.trim()) {
      newErrors.phone = t("Phone number is required", "ဖုန်းနံပါတ်ထည့်ပါ");
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(phone.trim())) {
      newErrors.phone = t("Invalid phone number", "ဖုန်းနံပါတ်မမှန်ပါ");
    }

    if (!city.trim()) {
      newErrors.city = t("City/Township is required", "မြို့/မြို့နယ်ထည့်ပါ");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateForm()) {
      toast({
        title: t("Please fix errors", "အမှားများပြင်ပါ"),
        description: t(
          "Fill in all required fields correctly",
          "လိုအပ်သောအကွက်များကို မှန်ကန်စွာဖြည့်ပါ"
        ),
        variant: "destructive",
      });
      return;
    }

    setCustomerInfo({
      name: name.trim(),
      phone: phone.trim(),
      city: city.trim(),
      notes: notes.trim() || undefined,
    });

    navigate("/order-confirm");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="section-padding">
          <div className="container-narrow max-w-lg">
            {/* Back Button */}
            <button
              onClick={() => navigate("/order-review")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("Back", "နောက်သို့")}</span>
            </button>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("Customer Information", "ဖောက်သည်အချက်အလက်")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t(
                "Enter your contact details",
                "သင့်ဆက်သွယ်ရန်အချက်အလက်များထည့်ပါ"
              )}
            </p>

            <div className="card-industrial p-6 space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t("Name", "နာမည်")}{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors((prev) => ({ ...prev, name: "" }));
                    }
                  }}
                  placeholder={t("Enter your name", "သင့်နာမည်ထည့်ပါ")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t("Phone Number", "ဖုန်းနံပါတ်")}{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: "" }));
                    }
                  }}
                  placeholder="09xxxxxxxxx"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {t("City / Township", "မြို့ / မြို့နယ်")}{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) {
                      setErrors((prev) => ({ ...prev, city: "" }));
                    }
                  }}
                  placeholder={t("Enter city or township", "မြို့ (သို့) မြို့နယ်ထည့်ပါ")}
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city}</p>
                )}
              </div>

              {/* Notes (optional) */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {t("Notes", "မှတ်စု")} ({t("optional", "ရွေးချယ်နိုင်")})
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t(
                    "Any additional notes...",
                    "ထပ်ဆောင်းမှတ်စုများ..."
                  )}
                  rows={3}
                />
              </div>

              {/* Continue Button */}
              <Button
                onClick={handleContinue}
                className="w-full h-12 text-base font-semibold"
              >
                {t("Continue", "ဆက်လက်ရန်")}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerInfo;
