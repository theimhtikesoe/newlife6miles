import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/OptimizedImage";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWorkspacePhotos } from "@/hooks/useWorkspacePhotos";

const Workspace = () => {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { data: workspaceItems = [] } = useWorkspacePhotos();

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="hero-section section-padding py-16">
          <div className="container-narrow">
            <div className="max-w-2xl">
              <div className="industrial-line mb-4" />
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {t("Workspace", "လုပ်ငန်းခွင်")}
              </h1>
              <p className="text-muted-foreground">
                {t(
                  "A closer look at our working space, tools, and day-to-day production setup.",
                  "ကျွန်ုပ်တို့၏ လုပ်ငန်းခွင်၊ အသုံးပြုမည့် ကိရိယာများနှင့် နေ့စဉ်လုပ်ငန်းစဉ်များကို တစ်နေရာတည်းမှာ ကြည့်ရှုနိုင်ပါသည်။"
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding pt-0">
          <div className="container-narrow">
            {workspaceItems.length === 0 ? (
              <div className="card-industrial p-8 text-center text-muted-foreground">
                {t(
                  "Workspace photos will be added soon.",
                  "လုပ်ငန်းခွင် ပုံများကို မကြာမီ ထည့်သွင်းပေးပါမည်။"
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaceItems.map((item, index) => (
                  <button
                    key={item.src}
                    onClick={() => openLightbox(index)}
                    className="card-industrial p-3 text-left group"
                  >
                    <div className="rounded-lg overflow-hidden bg-gradient-to-br from-secondary to-muted">
                      <OptimizedImage
                        src={item.src}
                        alt={language === "en" ? item.title.en : item.title.mm}
                        aspectRatio="landscape"
                        objectFit="cover"
                        className="group-hover:scale-105 transition-transform duration-300"
                        showSkeleton={false}
                        fadeIn={false}
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="font-semibold text-foreground">
                        {language === "en" ? item.title.en : item.title.mm}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {language === "en" ? item.description.en : item.description.mm}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl p-0 bg-background">
          {workspaceItems[activeIndex] && (
            <div className="p-4 sm:p-6">
              <DialogHeader>
                <DialogTitle>
                  {language === "en"
                    ? workspaceItems[activeIndex].title.en
                    : workspaceItems[activeIndex].title.mm}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 rounded-xl overflow-hidden bg-secondary">
                <img
                  src={workspaceItems[activeIndex].src}
                  alt={language === "en"
                    ? workspaceItems[activeIndex].title.en
                    : workspaceItems[activeIndex].title.mm}
                  className="w-full h-full object-contain"
                />
              </div>
              {workspaceItems[activeIndex].description && (
                <p className="text-sm text-muted-foreground mt-3">
                  {language === "en"
                    ? workspaceItems[activeIndex].description.en
                    : workspaceItems[activeIndex].description.mm}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workspace;
