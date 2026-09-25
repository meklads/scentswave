export type Locale = "ar" | "en";
export type Gender = "men" | "women" | "unisex";
export type Concentration = "edt" | "edp" | "parfum" | "cologne";
export type SampleType = "sample" | "decant" | "travel";
export type SampleGender = Gender | "unisex";

export type SizeOption = {
  sizeMl: 2 | 3 | 5 | 10;
  type: SampleType;
  priceSAR: number;
  sku: string;
  image: string;
};

export type SampleProduct = {
  id: string;
  sourceSlug: string;
  perfumeNameAr: string;
  perfumeNameEn: string;
  brand: string;
  gender: SampleGender;
  featured: boolean;
  availability: boolean;
  sizes: SizeOption[];
};

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
  sizeOptions?: SizeOption[];
  topNotes?: string;
  heartNotes?: string;
  baseNotes?: string;
  fragranceFamily?: string;
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
