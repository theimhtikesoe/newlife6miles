import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import PriceDisplay from "@/components/PriceDisplay";
import { useProduct, useCategory, ProductWithPricing } from "@/hooks/useProducts";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const { t, language } = useLanguage();
  const { data: product, isLoading, error } = useProduct(productId || "");
  const { category } = useCategory(product?.category || "");

  // Cast to ProductWithPricing to access price fields
  const productWithPricing = product as ProductWithPricing | undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">
            {t("Loading...", "ရယူနေသည်...")}
          </span>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {t("Product not found", "ထုတ်ကုန် မတွေ့ပါ")}
            </p>
            <Link to="/products" className="btn-secondary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t("Back to Products", "ထုတ်ကုန်များသို့ ပြန်သွားရန်")}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Category name translations
  const getCategoryNameMM = (id: string): string => {
    const names: Record<string, string> = {
      "bottle-shells": "ဘူးအခွံများ",
      "caps": "အဖုံးများ",
      "preform-tubes": "Preform Tube များ",
    };
    return names[id] || "";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="section-padding py-6 bg-secondary/30">
          <div className="container-narrow">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("Products", "ထုတ်ကုန်များ")}
              </Link>
              <span className="text-muted-foreground">/</span>
              {category && (
                <>
                  <Link
                    to={`/products/${category.id}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(category.name, getCategoryNameMM(category.id))}
                  </Link>
                  <span className="text-muted-foreground">/</span>
                </>
              )}
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Content */}
        <section className="section-padding">
          <div className="container-narrow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images with Gallery */}
              <ImageGallery 
                images={product.images || []} 
                productName={product.name}
                showLabels={product.category !== 'caps'}
              />

              {/* Product Info */}
              <div className="space-y-8">
                {/* Title */}
                <div>
                  <div className="industrial-line mb-4" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {product.name}
                  </h1>
                  <p className="text-muted-foreground">
                    {language === "en" ? product.description_en : product.description_mm}
                  </p>
                </div>

                {/* Price Display - only shown if admin enabled it */}
                <PriceDisplay
                  pricePerBottle={productWithPricing?.pricePerBottle}
                  pricePerCap={productWithPricing?.pricePerCap}
                  category={product.category}
                  className="p-4 bg-primary/5 rounded-lg border border-primary/10"
                />

                {/* Specifications */}
                <div className="card-industrial p-6 space-y-4">
                  <h3 className="font-semibold text-foreground">
                    {t("Specifications", "သတ်မှတ်ချက်များ")}
                  </h3>
                  
                  <div className="grid gap-4">
                    {/* Sizes - for bottles */}
                    {product.category !== 'caps' && product.sizes && product.sizes.length > 0 && (
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-foreground w-24 flex-shrink-0">
                          {t("Sizes", "အရွယ်အစား")}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <span key={size} className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cap Sizes - for caps */}
                    {product.category === 'caps' && productWithPricing?.capSizes && productWithPricing.capSizes.length > 0 && (
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-foreground w-24 flex-shrink-0">
                          {t("Cap Sizes", "အဖုံး အရွယ်အစား")}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {productWithPricing.capSizes.map((size) => (
                            <span key={size} className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cap Type - for caps */}
                    {product.category === 'caps' && productWithPricing?.capType && (
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-foreground w-24 flex-shrink-0">
                          {t("Cap Type", "အဖုံး အမျိုးအစား")}
                        </span>
                        <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                          {productWithPricing.capType}
                        </span>
                      </div>
                    )}

                    {/* Colors */}
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-foreground w-24 flex-shrink-0">
                        {t("Colors", "အရောင်များ")}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                          <span key={color} className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {t(color, getColorMM(color))}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Material */}
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-foreground w-24 flex-shrink-0">
                        {t("Material", "ပစ္စည်း")}
                      </span>
                      <span className="text-sm text-muted-foreground">{product.material}</span>
                    </div>
                  </div>
                </div>

                {/* Usage */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    {t("Usage", "အသုံးပြုပုံ")}
                  </h3>
                  <ul className="space-y-2">
                    {product.usage.map((use) => (
                      <li key={use} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {t(use, getUsageMM(use))}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Note */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-sm text-foreground font-medium">
                    {t(
                      product.priceNote,
                      "စက်ရုံစျေးနှုန်း ရရှိနိုင်ပါသည်။ ကျွန်ုပ်တို့၏ ကောင်တာသို့ ဆက်သွယ်ပါ။"
                    )}
                  </p>
                </div>

                {/* Back Button */}
                <Link
                  to={`/products/${product.category}`}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t(`Back to ${category?.name || "Products"}`, `${getCategoryNameMM(product.category) || "ထုတ်ကုန်များ"}သို့ ပြန်သွားရန်`)}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Color translations
const getColorMM = (color: string): string => {
  const colors: Record<string, string> = {
    "White": "အဖြူ",
    "Blue": "အပြာ",
    "Black": "အမည်း",
    "Clear": "ကြည်လင်",
    "Mixed colors": "ရောစပ်အရောင်များ",
  };
  return colors[color] || color;
};

// Usage translations
const getUsageMM = (usage: string): string => {
  const usages: Record<string, string> = {
    "Drinking water filling": "သောက်ရေဖြည့်သွင်းခြင်း",
    "Events": "ပွဲလမ်းသဘင်များ",
    "Retail packaging": "လက်လီထုပ်ပိုးခြင်း",
    "Daily use": "နေ့စဉ်အသုံးပြုခြင်း",
    "Family use": "မိသားစုအသုံး",
    "Office": "ရုံးသုံး",
    "Standard water bottles": "စံရေဘူးများ",
    "All bottle sizes": "ဘူးအရွယ်အစားအားလုံး",
    "Bottle blowing process": "ဘူးမှုတ်လုပ်ငန်းစဉ်",
    "Manufacturing": "ထုတ်လုပ်ခြင်း",
  };
  return usages[usage] || usage;
};

export default ProductDetail;
