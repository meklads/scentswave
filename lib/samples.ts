import samplesData from "@/data/samples.json";
import { formatMoney, formatSize } from "@/lib/format";
import type { Locale, Product, SampleGender, SampleProduct, SampleType, SizeOption } from "@/lib/types";

export const sampleProducts = samplesData as SampleProduct[];

export const SAMPLE_SIZES = [2, 3, 5, 10] as const;
export const SAMPLE_TYPES: SampleType[] = ["sample", "decant", "travel"];

export function sampleTypeLabel(type: SampleType, locale: Locale) {
  const map = {
    sample: { ar: "عينة", en: "Sample" },
    decant: { ar: "ديكانت", en: "Decant" },
    travel: { ar: "حجم سفر", en: "Travel Size" },
  } as const;
  return map[type][locale];
}

export function sampleGenderLabel(gender: SampleGender, locale: Locale) {
  const map = {
    men: { ar: "رجالي", en: "Men" },
    women: { ar: "نسائي", en: "Women" },
    unisex: { ar: "للجنسين", en: "Unisex" },
  } as const;
  return map[gender][locale];
}

export function perfumeName(item: SampleProduct, locale: Locale) {
  return locale === "ar" ? item.perfumeNameAr : item.perfumeNameEn;
}

export function defaultSize(item: SampleProduct) {
  return item.sizes.find((size) => size.sizeMl === 5) || item.sizes[0];
}

export function findSample(id: string) {
  return sampleProducts.find((item) => item.id === id);
}

export function findSize(item: SampleProduct, sku: string) {
  return item.sizes.find((size) => size.sku === sku);
}

export function sampleAsProduct(item: SampleProduct, size: SizeOption): Product {
  const gender = item.gender === "unisex" ? "men" : item.gender;
  return {
    slug: size.sku,
    stem: item.id,
    nameAr: `${item.perfumeNameAr} ${size.sizeMl} مل`,
    nameEn: `${item.perfumeNameEn} ${size.sizeMl}ml`,
    shortAr: item.perfumeNameAr,
    shortEn: item.perfumeNameEn,
    brand: item.brand,
    gender,
    sizeMl: size.sizeMl,
    concentration: "edp",
    price: size.priceSAR,
    compareAtPrice: size.priceSAR,
    salePercent: 0,
    featured: item.featured,
    inStock: item.availability,
    images: [size.image],
    descriptionAr: `عينة ${formatSize(size.sizeMl, "ar")} من ${item.perfumeNameAr} — لاكتشاف العطر قبل الزجاجة الكاملة.`,
    descriptionEn: `${size.sizeMl}ml ${size.type} of ${item.perfumeNameEn} — try before the full bottle.`,
    sizeOptions: item.sizes,
  };
}

export function getSampleAsProduct(slug: string) {
  for (const item of sampleProducts) {
    const size = item.sizes.find((option) => option.sku === slug);
    if (size) return sampleAsProduct(item, size);
  }
  return undefined;
}

export function sampleBrands() {
  return [...new Set(sampleProducts.map((item) => item.brand))];
}

export function formatSamplePrice(value: number, locale: Locale) {
  return formatMoney(value, locale);
}

export type SampleFilters = {
  brand?: string;
  sizeMl?: number;
  type?: SampleType;
  gender?: SampleGender;
  price?: "under-80" | "80-150" | "over-150";
  q?: string;
  sort?: "best" | "newest" | "price-asc" | "price-desc";
};

export function filterSamples(options: SampleFilters = {}) {
  let list = [...sampleProducts];

  if (options.brand) list = list.filter((item) => item.brand === options.brand);
  if (options.gender) list = list.filter((item) => item.gender === options.gender);
  if (options.sizeMl) list = list.filter((item) => item.sizes.some((size) => size.sizeMl === options.sizeMl));
  if (options.type) list = list.filter((item) => item.sizes.some((size) => size.type === options.type));
  if (options.price) {
    list = list.filter((item) => {
      const price = defaultSize(item).priceSAR;
      if (options.price === "under-80") return price < 80;
      if (options.price === "80-150") return price >= 80 && price <= 150;
      return price > 150;
    });
  }
  if (options.q) {
    const q = options.q.trim().toLowerCase();
    list = list.filter((item) =>
      [item.perfumeNameAr, item.perfumeNameEn, item.brand, item.sourceSlug].join(" ").toLowerCase().includes(q),
    );
  }

  switch (options.sort) {
    case "price-asc":
      list.sort((a, b) => defaultSize(a).priceSAR - defaultSize(b).priceSAR);
      break;
    case "price-desc":
      list.sort((a, b) => defaultSize(b).priceSAR - defaultSize(a).priceSAR);
      break;
    case "newest":
      list.reverse();
      break;
    default:
      list.sort((a, b) => Number(b.featured) - Number(a.featured) || defaultSize(a).priceSAR - defaultSize(b).priceSAR);
  }

  return list;
}
