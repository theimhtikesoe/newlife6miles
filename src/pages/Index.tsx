import { Link } from "react-router-dom";
import { ArrowRight, Package, Shield, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Package,
      title: t("Quality Materials", "အရည်အသွေးမြင့် ပစ္စည်းများ"),
      description: t(
        "Food-grade PET materials meeting international standards",
        "နိုင်ငံတကာစံနှုန်းနှင့် ကိုက်ညီသော အစားအသောက်သုံး PET ပစ္စည်းများ"
      ),
    },
    {
      icon: Shield,
      title: t("Consistent Production", "တသမတ်တည်း ထုတ်လုပ်မှု"),
      description: t(
        "Industrial precision ensuring uniform quality every batch",
        "စက်မှုတိကျမှုဖြင့် အသုတ်တိုင်း အရည်အသွေးတူညီစေခြင်း"
      ),
    },
    {
      icon: Sparkles,
      title: t("Clean Finish", "သန့်ရှင်းသော အချောသတ်"),
      description: t(
        "Crystal clear bottles ready for clean water packaging",
        "သန့်ရှင်းသောရေ ထုပ်ပိုးရန် အဆင်သင့်ဖြစ်သော ကြည်လင်သောဘူးများ"
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="hero-section section-padding py-20 sm:py-28 lg:py-32">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t("6 Miles, Taunggyi", "၆ မိုင်၊ တောင်ကြီး")}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              New Life
              <span className="block text-gradient">Packaging</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
              {t(
                "Raw materials for clean plastic packaging.",
                "သန့်ရှင်းသော ပလတ်စတစ်ထုပ်ပိုးရေးအတွက် ကုန်ကြမ်းများ။"
              )}
              <span className="block mt-1">
                {t("Bottles begin here.", "ဘူးများ ဒီကနေ စတင်ပါသည်။")}
              </span>
            </p>

            {/* CTA */}
            <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <Link to="/products" className="btn-primary inline-flex items-center gap-2 group">
                {t("View Product Range", "ထုတ်ကုန်များကို ကြည့်ရန်")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-6 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="industrial-line mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              {t("Product Range", "ထုတ်ကုန်အမျိုးအစားများ")}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t(
                "Everything you need to package clean water, from raw materials to finished components.",
                "ကုန်ကြမ်းများမှ ပြီးစီးသောအစိတ်အပိုင်းများအထိ သန့်ရှင်းသောရေထုပ်ပိုးရန် လိုအပ်သမျှအားလုံး။"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-foreground">
        <div className="container-narrow text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-background mb-4">
            {t("Ready to see our products?", "ကျွန်ုပ်တို့၏ ထုတ်ကုန်များကို ကြည့်ရန် အဆင်သင့်ဖြစ်ပြီလား?")}
          </h2>
          <p className="text-background/70 mb-8 max-w-md mx-auto">
            {t(
              "Explore our complete range of bottle shells, caps, and preform tubes.",
              "ဘူးအခွံများ၊ အဖုံးများနှင့် Preform Tube များအားလုံးကို လေ့လာပါ။"
            )}
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2 group">
            {t("Browse All Products", "ထုတ်ကုန်အားလုံးကြည့်ရန်")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
