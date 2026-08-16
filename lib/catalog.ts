import brandsData from "@/data/brands.json";
import productsData from "@/data/products.json";
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

export function filterProducts(options: {
  gender?: string;
  brand?: string;
  featured?: boolean;
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
