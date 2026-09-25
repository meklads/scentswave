import brandsData from "@/data/brands.json";
import productsData from "@/data/products.json";
import { formatSize } from "@/lib/format";
import type { Brand, Product } from "@/lib/types";

export const products = productsData as Product[];
export const brands = brandsData as Brand[];

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getBrand(slug: string) {
  return brands.find((item) => item.slug === slug);
}

export function productName(product: Product, locale: "ar" | "en") {
  return locale === "ar" ? product.nameAr : product.nameEn;
}

export function productShort(product: Product, locale: "ar" | "en") {
  return locale === "ar" ? product.shortAr : product.shortEn;
}

export function concentrationLabel(product: Product, locale: "ar" | "en") {
  const map = {
    edt: { ar: "تواليت", en: "Eau de toilette" },
    edp: { ar: "بارفان", en: "Eau de parfum" },
    parfum: { ar: "بارفوم", en: "Parfum" },
    cologne: { ar: "كولونيا", en: "Cologne" },
  } as const;
  return `${map[product.concentration][locale]} · ${formatSize(product.sizeMl, locale)}`;
}

export function brandName(brand: Brand, locale: "ar" | "en") {
  return locale === "ar" ? brand.nameAr : brand.nameEn;
}

export function relatedProducts(product: Product, limit = 4) {
  const sameBrand = products.filter(
    (item) => item.brand === product.brand && item.slug !== product.slug,
  );
  const sameGender = products.filter(
    (item) =>
      item.gender === product.gender &&
      item.slug !== product.slug &&
      item.brand !== product.brand,
  );
  return [...sameBrand, ...sameGender].slice(0, limit);
}

export function pairProduct(product: Product) {
  const pool = products.filter((item) => item.slug !== product.slug);
  const ranked = pool
    .map((item) => {
      let score = 0;
      if (item.gender === product.gender) score += 4;
      if (item.brand !== product.brand) score += 3;
      if (item.featured) score += 2;
      if (item.concentration !== product.concentration) score += 1;
      score -= Math.min(3, Math.abs(item.price - product.price) / 200);
      return { item, score };
    })
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.item ?? null;
}

export function complementaryProducts(product: Product, limit = 4) {
  const pair = pairProduct(product);
  const related = relatedProducts(product, limit + 2).filter(
    (item) => item.slug !== pair?.slug,
  );
  return [pair, ...related].filter((item): item is Product => Boolean(item)).slice(0, limit);
}

export function upsellProducts(exclude: string[] = [], limit = 4) {
  const blocked = new Set(exclude);
  const featured = products.filter((item) => item.featured && !blocked.has(item.slug));
  const rest = products.filter((item) => !item.featured && !blocked.has(item.slug));
  return [...featured, ...rest].slice(0, limit);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((item) => {
    const hay = [
      item.nameAr,
      item.nameEn,
      item.shortAr,
      item.shortEn,
      item.brand,
      item.stem,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function saleProducts(limit = 12) {
  return products
    .filter((item) => item.compareAtPrice > item.price && item.salePercent > 0)
    .sort((a, b) => b.salePercent - a.salePercent)
    .slice(0, limit);
}

export function travelProducts(limit = 12) {
  return [...products]
    .filter((item) => item.sizeMl <= 80)
    .sort((a, b) => a.sizeMl - b.sizeMl || a.price - b.price)
    .slice(0, limit);
}

export function giftProducts(limit = 12) {
  return products.filter((item) => item.featured).slice(0, limit);
}

export function filterProducts(options: {
  gender?: string;
  brand?: string;
  featured?: boolean;
  sale?: boolean;
  travel?: boolean;
  q?: string;
  sort?: string;
}) {
  let list = [...products];
  if (options.gender === "men" || options.gender === "women") {
    list = list.filter((item) => item.gender === options.gender);
  }
  if (options.brand) {
    list = list.filter((item) => item.brand === options.brand);
  }
  if (options.featured) {
    list = list.filter((item) => item.featured);
  }
  if (options.sale) {
    list = list.filter((item) => item.compareAtPrice > item.price);
  }
  if (options.travel) {
    list = list.filter((item) => item.sizeMl <= 80);
  }
  if (options.q) {
    const q = options.q.trim().toLowerCase();
    list = list.filter((item) =>
      [item.nameAr, item.nameEn, item.shortAr, item.shortEn, item.brand, item.stem]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }
  switch (options.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      list.reverse();
      break;
    case "name":
      list.sort((a, b) => a.shortEn.localeCompare(b.shortEn));
      break;
    default:
      list.sort((a, b) => Number(b.featured) - Number(a.featured) || a.price - b.price);
  }
  return list;
}
