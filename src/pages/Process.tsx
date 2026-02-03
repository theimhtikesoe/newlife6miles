import { Link } from "react-router-dom";
import { ArrowRight, Cylinder, Flame, Package, CircleDot, Droplets } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProcessStep from "@/components/ProcessStep";
import { useLanguage } from "@/contexts/LanguageContext";

const Process = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Cylinder className="w-5 h-5 text-primary-foreground" />,
      title: t("PET Preform Tube", "PET Preform Tube (ကုန်ကြမ်း)"),
      description: t(
        "The journey begins with a small PET preform tube—the raw material that will become a bottle.",
        "ဘူးဖြစ်လာမည့် ကုန်ကြမ်းဖြစ်သော PET Preform Tube မှ စတင်ပါသည်။"
      ),
    },
    {
      icon: <Flame className="w-5 h-5 text-primary-foreground" />,
      title: t("Heating Process", "အပူပေးလုပ်ငန်းစဉ်"),
      description: t(
        "The preform is heated to a precise temperature, making it soft and ready for shaping.",
        "Preform ကို တိကျသော အပူချိန်ဖြင့် အပူပေးပြီး ပုံသွင်းရန် ပျော့ပြောင်းစေပါသည်။"
      ),
    },
    {
      icon: <Package className="w-5 h-5 text-primary-foreground" />,
      title: t("Bottle Shell Formation", "ဘူးအခွံ ပုံသွင်းခြင်း"),
      description: t(
        "Air is blown into the heated preform, expanding it into the final bottle shell shape.",
        "အပူပေးထားသော Preform ထဲသို့ လေမှုတ်သွင်းပြီး ဘူးအခွံပုံစံသို့ ချဲ့ထွင်ပါသည်။"
      ),
    },
    {
      icon: <CircleDot className="w-5 h-5 text-primary-foreground" />,
      title: t("Cap Sealing", "အဖုံးပိတ်ခြင်း"),
      description: t(
        "A secure cap is added to complete the container, ready for water filling.",
        "ရေဖြည့်ရန် အဆင်သင့်ဖြစ်အောင် ခိုင်မာသော အဖုံးဖြင့် ပိတ်ထားပါသည်။"
      ),
    },
    {
      icon: <Droplets className="w-5 h-5 text-primary-foreground" />,
      title: t("Ready for Filling", "ဖြည့်သွင်းရန် အဆင်သင့်"),
      description: t(
        "The complete bottle package is now ready to hold clean, safe drinking water.",
        "ပြီးပြည့်စုံသော ဘူးအစုံသည် သန့်ရှင်းလုံခြုံသော သောက်ရေထည့်ရန် အဆင်သင့်ဖြစ်ပါပြီ။"
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="hero-section section-padding py-16">
          <div className="container-narrow">
            <div className="max-w-xl">
              <div className="industrial-line mb-4" />
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t("From Tube to Bottle", "Preform Tube မှ ဘူးသို့")}
              </h1>
              <p className="text-muted-foreground">
                {t(
                  "Every bottle begins as a tube. At New Life, we focus on consistency, cleanliness, and reliable material quality.",
                  "ဘူးတိုင်းသည် Tube မှ စတင်ပါသည်။ New Life တွင် တသမတ်တည်းမှု၊ သန့်ရှင်းမှုနှင့် ယုံကြည်စိတ်ချရသော ပစ္စည်းအရည်အသွေးကို အာရုံစိုက်ပါသည်။"
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="section-padding pt-0">
          <div className="container-narrow">
            <div className="max-w-2xl">
              {steps.map((step, index) => (
                <ProcessStep
                  key={step.title}
                  step={index + 1}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quality Note */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("Quality at Every Step", "အဆင့်တိုင်းတွင် အရည်အသွေး")}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t(
                  "From selecting premium PET materials to the final quality check, we ensure every product meets our strict standards. Our process combines modern manufacturing precision with careful attention to detail.",
                  "ပရီမီယံ PET ပစ္စည်းများ ရွေးချယ်ခြင်းမှ နောက်ဆုံး အရည်အသွေးစစ်ဆေးခြင်းအထိ ထုတ်ကုန်တိုင်း ကျွန်ုပ်တို့၏ တင်းကျပ်သော စံနှုန်းများနှင့် ကိုက်ညီစေပါသည်။"
                )}
              </p>
              <Link to="/products" className="btn-primary inline-flex items-center gap-2 group">
                {t("Explore Our Products", "ကျွန်ုပ်တို့၏ ထုတ်ကုန်များကို လေ့လာပါ")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Process;
