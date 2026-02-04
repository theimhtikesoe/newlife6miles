import { Droplets, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-narrow section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img
                  src="/icons/logo-1024.png"
                  alt="New Life Packaging logo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">New Life</span>
                <span className="text-xs text-background/60 leading-tight">Packaging</span>
              </div>
            </div>
            <p className="text-background/70 text-sm max-w-xs">
              {t(
                "We shape what holds clean water.",
                "သန့်ရှင်းသောရေကို ကိုင်ဆောင်မည့် ပစ္စည်းများကို ကျွန်ုပ်တို့ ဖန်တီးပါသည်။"
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("Quick Links", "အမြန်လင့်ခ်များ")}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-background/70 hover:text-background transition-colors">
                {t("Home", "ပင်မ")}
              </Link>
              <Link to="/products" className="text-sm text-background/70 hover:text-background transition-colors">
                {t("Products", "ထုတ်ကုန်များ")}
              </Link>
              <Link to="/workspace" className="text-sm text-background/70 hover:text-background transition-colors">
                {t("Workspace", "လုပ်ငန်းခွင်")}
              </Link>
              <Link to="/process" className="text-sm text-background/70 hover:text-background transition-colors">
                {t("Our Process", "ကျွန်ုပ်တို့၏လုပ်ငန်းစဉ်")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("Contact", "ဆက်သွယ်ရန်")}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-background/70">
                  {t(
                    "6 Miles, Taunggyi\nShan State, Myanmar",
                    "၆ မိုင်၊ တောင်ကြီး\nရှမ်းပြည်နယ်၊ မြန်မာ"
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-background/70">
                  {t(
                    "Contact our counter for pricing",
                    "စျေးနှုန်းသိလိုပါက ကောင်တာသို့ ဆက်သွယ်ပါ"
                  )}
                </span>
              </div>
            </div>
            <div className="pt-2">
              <div className="rounded-lg overflow-hidden border border-background/10">
                <iframe
                  title="New Life Packaging Location"
                  src="https://maps.google.com/maps?q=6%20Miles%2C%20Taunggyi%2C%20Shan%20State%2C%20Myanmar&output=embed"
                  className="w-full h-48"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/ZyQy7ZrsLik6mvwPA"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-xs text-background/60 hover:text-background transition-colors"
              >
                {t("Open in Google Maps", "Google Maps တွင် ဖွင့်ရန်")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/10 text-center">
          <p className="text-xs text-background/50">
            © {new Date().getFullYear()} New Life Packaging. {t("All rights reserved.", "မူပိုင်ခွင့်များအားလုံး ရယူထားပါသည်။")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
