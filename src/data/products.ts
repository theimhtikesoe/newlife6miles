// Caps cover image
import capsCover from "@/assets/caps-cover.jpg";

// 0.3L images
import bottle03LBlueS1 from "@/assets/0.3L-blue-s1.jpg";
import bottle03LBlueS1Cap from "@/assets/0.3L-blue-s1-cap.jpg";
import bottle03LShalShal from "@/assets/0.3L-shal-shal.jpg";
import bottle03LShalShalCap from "@/assets/0.3L-shal-shal-cap.jpg";
import bottle03LWhite from "@/assets/0.3L-white.jpg";
import bottle03LWhiteCap from "@/assets/0.3L-white-cap.jpg";
import bottle03LWhiteWine from "@/assets/0.3L-white-wine.jpg";
import bottle03LWhiteWineCap from "@/assets/0.3L-white-wine-cap.jpg";

// 0.5L images
import bottle05LWhite from "@/assets/0.5L-white.jpg";
import bottle05LWhiteCap from "@/assets/0.5L-white-cap.jpg";

// 0.6L images
import bottle06LBlue from "@/assets/0.6L-blue.jpg";
import bottle06LBlueCap from "@/assets/0.6L-blue-cap.jpg";
import bottle06LWhite from "@/assets/0.6L-white.jpg";
import bottle06LWhiteCap from "@/assets/0.6L-white-cap.jpg";
import bottle06LWineWhite from "@/assets/0.6L-wine-white.jpg";
import bottle06LWineWhiteCap from "@/assets/0.6L-wine-white-cap.jpg";

// 0.85L images
import bottle085LWhite from "@/assets/0.85L-white.jpg";
import bottle085LWhiteCap from "@/assets/0.85L-white-cap.jpg";
import bottle085LWineWhite from "@/assets/0.85L-wine-white.jpg";
import bottle085LWineWhiteCap from "@/assets/0.85L-wine-white-cap.jpg";

// 0.9L images
import bottle09LBlue from "@/assets/0.9L-blue.jpg";
import bottle09LBlueCap from "@/assets/0.9L-blue-cap.jpg";
import bottle09LWhite from "@/assets/0.9L-white.jpg";
import bottle09LWhiteCap from "@/assets/0.9L-white-cap.jpg";

// 1L images
import bottle1LBlue from "@/assets/1L-blue.jpg";
import bottle1LBlueCap from "@/assets/1L-blue-cap.jpg";
import bottle1LWhite from "@/assets/1L-white.jpg";
import bottle1LWhiteCap from "@/assets/1L-white-cap.jpg";
import bottle1LWineWhite from "@/assets/1L-wine-white.jpg";
import bottle1LWineWhiteCap from "@/assets/1L-wine-white-cap.jpg";

// Special bottles
import nwarnoegyi from "@/assets/nwarnoegyi.jpg";
import nwarnoeGyiCap from "@/assets/nwarnoegyi-cap.jpg";
import nwarnoetay from "@/assets/nwarnoetay.jpg";
import nwarnoeHtayCap from "@/assets/nwarnoetay-cap.jpg";
import kyarthar25 from "@/assets/25kyarthar.jpg";
import kyarthar25Cap from "@/assets/25kyarthar-cap.jpg";
import thar30 from "@/assets/30thar.jpg";
import thar30Cap from "@/assets/30thar-cap.jpg";
import dount8BlueShalShal from "@/assets/8dount-blue-shal-shal.jpg";
import dount8BlueShalShalCap from "@/assets/8dount-blue-shal-shal-cap.jpg";
import dount8S1 from "@/assets/8dount-s1.jpg";
import dount8S1Cap from "@/assets/8dount-s1-cap.jpg";
import choChinWhite from "@/assets/cho-chin-white.jpg";
import choChinWhiteCap from "@/assets/cho-chin-white-cap.jpg";
import daneWineGyiWhite from "@/assets/dane-wine-gyi-white.jpg";
import daneWineGyiWhiteCap from "@/assets/dane-wine-gyi-white-cap.jpg";
import daneWineTayWhite from "@/assets/dane-wine-tay-white.jpg";
import daneWineTayWhiteCap from "@/assets/dane-wine-tay-white-cap.jpg";
import shweWine from "@/assets/shwe-wine.jpg";
import shweWineCap from "@/assets/shwe-wine-cap.jpg";
import dount8White from "@/assets/8dount-white.jpg";
import dount8WhiteCap from "@/assets/8dount-white-cap.jpg";
import daneWineTayBlue from "@/assets/dane-wine-tay-blue.jpg";
import daneWineTayBlueCap from "@/assets/dane-wine-tay-blue-cap.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  description_en: string;
  description_mm: string;
  material: string;
  colors: string[];
  sizes: string[];
  usage: string[];
  priceNote: string;
  images: string[]; // [without cap, with cap]
  sortOrder?: number; // For sorting by groups
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
}

export const categories: Category[] = [
  {
    id: "bottle-shells",
    name: "Bottle Shells",
    description: "Empty water bottles, ready for filling",
    icon: "bottle",
    image: bottle09LBlueCap,
  },
  {
    id: "caps",
    name: "Caps",
    description: "Secure caps for all bottle sizes",
    icon: "cap",
    image: capsCover,
  },
];

// Sort order groups:
// Group 1 (13 gram): .3, .3ဝိုင်း, ချိုချဉ်, ဒိန်ဝိုင်းကြီး, ရွေဝိုင်း, ၈ထောင့်, ဒိန်ဝိုင်းသေး
// Group 2 (16 gram): .6, .6ဝိုင်း, ၂၅ ကျပ်သား, .5
// Group 3 (24 gram): 1L, 1Lဝိုင်း, .9, .85, .85ဝိုင်း, ၄၀သား, ၃၅ကျပ်သား, ၃၀ကျပ်သား

export const products: Product[] = [
  // ===== GROUP 1: 13 gram (.3, .3ဝိုင်း, ချိုချဉ်, ဒိန်ဝိုင်းကြီး, ရွေဝိုင်း, ၈ထောင့်, ဒိန်ဝိုင်းသေး) =====
  {
    id: "0.3L-blue-s1",
    name: "0.3L Blue S1",
    category: "bottle-shells",
    description_en: "0.3 Liter blue S1 bottle shell.",
    description_mm: "၀.၃ လီတာ အပြာရောင် S1 ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle03LBlueS1, bottle03LBlueS1Cap],
    sortOrder: 101,
  },
  {
    id: "0.3L-shal-shal",
    name: "0.3L Shal Shal Blue",
    category: "bottle-shells",
    description_en: "0.3 Liter Shal Shal Blue bottle shell.",
    description_mm: "၀.၃ လီတာ ရှယ်ရှယ် အပြာ ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle03LShalShal, bottle03LShalShalCap],
    sortOrder: 102,
  },
  {
    id: "0.3L-white",
    name: "0.3L White",
    category: "bottle-shells",
    description_en: "0.3 Liter white/clear bottle shell.",
    description_mm: "၀.၃ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle03LWhite, bottle03LWhiteCap],
    sortOrder: 103,
  },
  {
    id: "0.3L-white-wine",
    name: "0.3L ဝိုင်း White",
    category: "bottle-shells",
    description_en: "0.3 Liter white round-style bottle shell.",
    description_mm: "၀.၃ လီတာ ဝိုင်းပုံစံ အဖြူရောင် ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle03LWhiteWine, bottle03LWhiteWineCap],
    sortOrder: 104,
  },
  {
    id: "cho-chin-white",
    name: "ချိုချဉ်ဘူး White",
    category: "bottle-shells",
    description_en: "Cho Chin White bottle shell.",
    description_mm: "ချိုချဉ် အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [choChinWhite, choChinWhiteCap],
    sortOrder: 105,
  },
  {
    id: "dane-wine-gyi-white",
    name: "၁၅ ကျပ်သား (ဒိန်ဝိုင်းကြီး) White",
    category: "bottle-shells",
    description_en: "15 Kyat Thar (Dane Wine Gyi) White bottle shell.",
    description_mm: "၁၅ ကျပ်သား ဒိန်ဝိုင်းကြီး အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [daneWineGyiWhite, daneWineGyiWhiteCap],
    sortOrder: 106,
  },
  {
    id: "shwe-wine",
    name: "ရွှေဝိုင်း",
    category: "bottle-shells",
    description_en: "Shwe Wine (Golden Round) bottle shell.",
    description_mm: "ရွှေဝိုင်း ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [shweWine, shweWineCap],
    sortOrder: 107,
  },
  {
    id: "8dount-s1",
    name: "၁၃ ကျပ်သား (ရှစ်ထောင့် S1)",
    category: "bottle-shells",
    description_en: "13 Kyat Thar (8 Dount S1) bottle shell.",
    description_mm: "၁၃ ကျပ်သား ရှစ်ထောင့် S1 ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [dount8S1, dount8S1Cap],
    sortOrder: 108,
  },
  {
    id: "8dount-blue-shal-shal",
    name: "၁၃ ကျပ်သား (ရှစ်ထောင့် ရှယ်ရှယ်)",
    category: "bottle-shells",
    description_en: "13 Kyat Thar (8 Dount Shal Shal) Blue bottle shell.",
    description_mm: "၁၃ ကျပ်သား ရှစ်ထောင့် ရှယ်ရှယ် အပြာ ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [dount8BlueShalShal, dount8BlueShalShalCap],
    sortOrder: 109,
  },
  {
    id: "8dount-white",
    name: "၁၃ ကျပ်သား (ရှစ်ထောင့် အဖြူ)",
    category: "bottle-shells",
    description_en: "13 Kyat Thar (8 Dount) White bottle shell.",
    description_mm: "၁၃ ကျပ်သား ရှစ်ထောင့် အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [dount8White, dount8WhiteCap],
    sortOrder: 110,
  },
  {
    id: "dane-wine-tay-white",
    name: "၁၁ ကျပ်သား (ဒိန်ဝိုင်းသေး) White",
    category: "bottle-shells",
    description_en: "11 Kyat Thar (Dane Wine Tay) White bottle shell.",
    description_mm: "၁၁ ကျပ်သား ဒိန်ဝိုင်းသေး အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [daneWineTayWhite, daneWineTayWhiteCap],
    sortOrder: 111,
  },
  {
    id: "dane-wine-tay-blue",
    name: "၁၁ ကျပ်သား (ဒိန်ဝိုင်းသေး) Blue",
    category: "bottle-shells",
    description_en: "11 Kyat Thar (Dane Wine Tay) Blue bottle shell.",
    description_mm: "၁၁ ကျပ်သား ဒိန်ဝိုင်းသေး အပြာရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.3L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [daneWineTayBlue, daneWineTayBlueCap],
    sortOrder: 112,
  },
  // ===== GROUP 2: 16 gram (.6, .6ဝိုင်း, ၂၅ ကျပ်သား, .5) =====
  {
    id: "0.5L-white",
    name: "0.5L White",
    category: "bottle-shells",
    description_en: "0.5 Liter white/clear bottle shell.",
    description_mm: "၀.၅ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.5L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle05LWhite, bottle05LWhiteCap],
    sortOrder: 201,
  },
  {
    id: "0.6L-blue",
    name: "0.6L Blue",
    category: "bottle-shells",
    description_en: "0.6 Liter blue bottle shell.",
    description_mm: "၀.၆ လီတာ အပြာရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.6L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle06LBlue, bottle06LBlueCap],
    sortOrder: 202,
  },
  {
    id: "0.6L-white",
    name: "0.6L White",
    category: "bottle-shells",
    description_en: "0.6 Liter white/clear bottle shell.",
    description_mm: "၀.၆ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.6L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle06LWhite, bottle06LWhiteCap],
    sortOrder: 203,
  },
  {
    id: "0.6L-wine-white",
    name: "0.6L ဝိုင်း White",
    category: "bottle-shells",
    description_en: "0.6 Liter round-style white bottle shell.",
    description_mm: "၀.၆ လီတာ ဝိုင်းပုံစံ အဖြူရောင် ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.6L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle06LWineWhite, bottle06LWineWhiteCap],
    sortOrder: 204,
  },
  {
    id: "25kyarthar",
    name: "၂၅ ကျပ်သား",
    category: "bottle-shells",
    description_en: "25 Kyat Thar bottle shell.",
    description_mm: "၂၅ ကျပ်သား ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.6L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [kyarthar25, kyarthar25Cap],
    sortOrder: 205,
  },
  // ===== GROUP 3: 24 gram (1L, 1Lဝိုင်း, .9, .85, .85ဝိုင်း, ၄၀သား, ၃၅ကျပ်သား, ၃၀ကျပ်သား) =====
  {
    id: "1L-blue",
    name: "1L Blue",
    category: "bottle-shells",
    description_en: "1 Liter blue bottle shell.",
    description_mm: "၁ လီတာ အပြာရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Daily use", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle1LBlue, bottle1LBlueCap],
    sortOrder: 301,
  },
  {
    id: "1L-white",
    name: "1L White",
    category: "bottle-shells",
    description_en: "1 Liter white/clear bottle shell.",
    description_mm: "၁ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Daily use", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle1LWhite, bottle1LWhiteCap],
    sortOrder: 302,
  },
  {
    id: "1L-wine-white",
    name: "1L ဝိုင်း White",
    category: "bottle-shells",
    description_en: "1 Liter round-style white bottle shell.",
    description_mm: "၁ လီတာ ဝိုင်းပုံစံ အဖြူရောင် ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Daily use", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle1LWineWhite, bottle1LWineWhiteCap],
    sortOrder: 303,
  },
  {
    id: "0.9L-blue",
    name: "0.9L Blue",
    category: "bottle-shells",
    description_en: "0.9 Liter blue bottle shell.",
    description_mm: "၀.၉ လီတာ အပြာရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["Blue"],
    sizes: ["0.9L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle09LBlue, bottle09LBlueCap],
    sortOrder: 304,
  },
  {
    id: "0.9L-white",
    name: "0.9L White",
    category: "bottle-shells",
    description_en: "0.9 Liter white/clear bottle shell.",
    description_mm: "၀.၉ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.9L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle09LWhite, bottle09LWhiteCap],
    sortOrder: 305,
  },
  {
    id: "0.85L-white",
    name: "0.85L White",
    category: "bottle-shells",
    description_en: "0.85 Liter white/clear bottle shell.",
    description_mm: "၀.၈၅ လီတာ အဖြူရောင် ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.85L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle085LWhite, bottle085LWhiteCap],
    sortOrder: 306,
  },
  {
    id: "0.85L-wine-white",
    name: "0.85L ဝိုင်း White",
    category: "bottle-shells",
    description_en: "0.85 Liter round-style white bottle shell.",
    description_mm: "၀.၈၅ လီတာ ဝိုင်းပုံစံ အဖြူရောင် ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["0.85L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [bottle085LWineWhite, bottle085LWineWhiteCap],
    sortOrder: 307,
  },
  {
    id: "nwarnoegyi",
    name: "၄၀ ကျပ်သား (နွားနို့ကြီး)",
    category: "bottle-shells",
    description_en: "40 Kyat Thar (Nwar Noe Gyi) bottle shell.",
    description_mm: "၄၀ ကျပ်သား (နွားနို့ကြီး) ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [nwarnoegyi, nwarnoeGyiCap],
    sortOrder: 308,
  },
  {
    id: "nwarnoetay",
    name: "၃၅ ကျပ်သား (နွားနို့သေး)",
    category: "bottle-shells",
    description_en: "35 Kyat Thar (Nwar Noe Tay) bottle shell.",
    description_mm: "၃၅ ကျပ်သား (နွားနို့သေး) ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [nwarnoetay, nwarnoeHtayCap],
    sortOrder: 309,
  },
  {
    id: "30thar",
    name: "၃၀ ကျပ်သား",
    category: "bottle-shells",
    description_en: "30 Kyat Thar bottle shell.",
    description_mm: "၃၀ ကျပ်သား ရေသန့်ဘူးအခွံ။",
    material: "Food-grade PET",
    colors: ["White"],
    sizes: ["1L"],
    usage: ["Drinking water filling", "Retail packaging"],
    priceNote: "Factory pricing available. Please contact our counter.",
    images: [thar30, thar30Cap],
    sortOrder: 310,
  },
];

// Sort products by sortOrder
export const getSortedProducts = (): Product[] => {
  return [...products].sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return getSortedProducts().filter((product) => product.category === categoryId);
};

export const getProductById = (productId: string): Product | undefined => {
  return products.find((product) => product.id === productId);
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  return categories.find((category) => category.id === categoryId);
};
