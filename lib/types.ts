export type Locale = "ar" | "en";
export type Gender = "men" | "women";
export type Concentration = "edt" | "edp" | "parfum" | "cologne";

export type Product = {
  slug: string;
  stem: string;
  nameAr: string;
  nameEn: string;
  shortAr: string;
  shortEn: string;
  brand: string;
  gender: Gender;
  sizeMl: number;
  concentration: Concentration;
  price: number;
  compareAtPrice: number;
  salePercent: number;
  featured: boolean;
  inStock: boolean;
  images: string[];
  descriptionAr: string;
  descriptionEn: string;
};

export type Brand = {
  slug: string;
  nameAr: string;
  nameEn: string;
  logo: string | null;
  count: number;
};

export type CartItem = {
  slug: string;
  quantity: number;
};
