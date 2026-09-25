import { sampleProducts, defaultSize, findSample, houseKind } from "@/lib/samples";
import type { Locale, Product, SampleProduct } from "@/lib/types";

export type HouseKind = "designer" | "niche";
export { houseKind };

export const SIZE_ROLES = {
  2: {
    id: "mini",
    nameAr: "تجربة",
    nameEn: "Mini",
    roleAr: "للانطباع الأول",
    roleEn: "For a first impression",
  },
  3: {
    id: "mini",
    nameAr: "تجربة",
    nameEn: "Mini",
    roleAr: "لتجربة أوضح قليلًا",
    roleEn: "For a slightly longer first wear",
  },
  5: {
    id: "pocket",
    nameAr: "جيب",
    nameEn: "Pocket",
    roleAr: "لعدة ارتداءات وللتنقل",
    roleEn: "For several wears, and for going out",
  },
  10: {
    id: "travel",
    nameAr: "سفر",
    nameEn: "Travel",
    roleAr: "للاستخدام اليومي والسفر",
    roleEn: "For daily wear and travel",
  },
} as const;


export function houseKindLabel(kind: HouseKind, locale: Locale) {
  return kind === "niche"
    ? locale === "ar" ? "نيش" : "Niche"
    : locale === "ar" ? "ديزاينر" : "Designer";
}

export function sizeRole(ml: number, locale: Locale) {
  const role = SIZE_ROLES[ml as keyof typeof SIZE_ROLES];
  if (!role) return { name: `${ml} ml`, purpose: "" };
  return locale === "ar"
    ? { name: role.nameAr, purpose: role.roleAr }
    : { name: role.nameEn, purpose: role.roleEn };
}

export type DiscoverySet = {
  id: string;
  nameAr: string;
  nameEn: string;
  bodyAr: string;
  bodyEn: string;
  sampleIds: string[];
  sizeMl: 2 | 5;
  offerSAR: number;
};

export const discoverySets: DiscoverySet[] = [
  {
    id: "signature",
    nameAr: "مجموعة التوقيع",
    nameEn: "Signature Discovery",
    bodyAr: "خمس عطور مميزة لتبدأ منها، بحجم التجربة.",
    bodyEn: "Five distinctive fragrances to begin with, in Mini size.",
    sampleIds: ["dior-sauvage-edp", "chanel-bleu-edp", "tom-ford-ombre-leather", "ysl-la-nuit", "mancera-red-tobacco"],
    sizeMl: 2,
    offerSAR: 239,
  },
  {
    id: "men",
    nameAr: "اكتشاف رجالي",
    nameEn: "Men's Discovery",
    bodyAr: "مختارات رجالية للتجربة قبل الزجاجة الكاملة.",
    bodyEn: "A men's selection to try before the full bottle.",
    sampleIds: ["dior-sauvage-edp", "chanel-bleu-edp", "tom-ford-grey-vetiver", "armani-code", "cartier-declaration"],
    sizeMl: 2,
    offerSAR: 229,
  },
  {
    id: "women",
    nameAr: "اكتشاف نسائي",
    nameEn: "Women's Discovery",
    bodyAr: "مختارات نسائية بحجم صغير للتعرّف على العطر.",
    bodyEn: "A women's selection in a small size for getting to know the scent.",
    sampleIds: ["givenchy-linterdit", "givenchy-ange-ou-demon", "ck-euphoria", "carolina-herrera-chic"],
    sizeMl: 2,
    offerSAR: 139,
  },
  {
    id: "niche",
    nameAr: "اكتشاف نيش",
    nameEn: "Niche Discovery",
    bodyAr: "عطور نيش من المخزون الحالي، للتجربة بهدوء.",
    bodyEn: "Niche fragrances from the current inventory, to try at an unhurried pace.",
    sampleIds: ["mancera-red-tobacco", "montale-black-aoud", "tom-ford-black-orchid"],
    sizeMl: 2,
    offerSAR: 149,
  },
  {
    id: "icons",
    nameAr: "أيقونات معروفة",
    nameEn: "Designer Icons",
    bodyAr: "عطور معروفة عالميًا، بحجم يناسب الجيب.",
    bodyEn: "Widely known fragrances, in Pocket size.",
    sampleIds: ["dior-sauvage-edp", "dior-sauvage-edt", "chanel-bleu-edp", "chanel-allure-sport", "acqua-di-gio"],
    sizeMl: 5,
    offerSAR: 399,
  },
];

export function setItems(set: DiscoverySet) {
  return set.sampleIds
    .map((id) => findSample(id))
    .filter((item): item is SampleProduct => Boolean(item))
    .map((item) => {
      const size = item.sizes.find((option) => option.sizeMl === set.sizeMl) || defaultSize(item);
      return { item, size };
    });
}

export function setTotal(set: DiscoverySet) {
  return setItems(set).reduce((sum, entry) => sum + entry.size.priceSAR, 0);
}

export function setPrice(set: DiscoverySet) {
  return set.offerSAR;
}

export function setSaving(set: DiscoverySet) {
  return Math.max(0, setTotal(set) - set.offerSAR);
}

export function findSet(id: string) {
  const slug = id.startsWith("set-") ? id.slice(4) : id;
  return discoverySets.find((item) => item.id === slug);
}

export function getSetAsProduct(slug: string): Product | undefined {
  if (!slug.startsWith("set-")) return undefined;
  const set = findSet(slug);
  if (!set) return undefined;
  const items = setItems(set);
  if (items.length === 0) return undefined;
  const value = setTotal(set);
  const namesAr = items.map((entry) => entry.item.perfumeNameAr).join(" · ");
  const namesEn = items.map((entry) => entry.item.perfumeNameEn).join(" · ");
  return {
    slug: `set-${set.id}`,
    stem: set.id,
    nameAr: set.nameAr,
    nameEn: set.nameEn,
    shortAr: set.nameAr,
    shortEn: set.nameEn,
    brand: items[0].item.brand,
    gender: (set.id === "women" ? "women" : "men") as "men" | "women",
    sizeMl: set.sizeMl * items.length,
    concentration: "edp" as const,
    price: set.offerSAR,
    compareAtPrice: value,
    salePercent: value > set.offerSAR ? Math.round(((value - set.offerSAR) / value) * 100) : 0,
    featured: true,
    inStock: true,
    images: [items[0].size.image],
    descriptionAr: `${items.length} × ${set.sizeMl} مل: ${namesAr}`,
    descriptionEn: `${items.length} × ${set.sizeMl}ml: ${namesEn}`,
  };
}

export function setName(set: DiscoverySet, locale: Locale) {
  return locale === "ar" ? set.nameAr : set.nameEn;
}

export function setBody(set: DiscoverySet, locale: Locale) {
  return locale === "ar" ? set.bodyAr : set.bodyEn;
}

export const EXPERIENCES = [
  { id: "first", sizeMl: 2 as const, nameAr: "الانطباع الأول", nameEn: "First impression" },
  { id: "wear", sizeMl: 5 as const, nameAr: "يستحق الارتداء", nameEn: "Worth wearing" },
  { id: "travel", sizeMl: 10 as const, nameAr: "دوران السفر", nameEn: "Travel rotation" },
];

export function samplesForExperience(id: string) {
  const exp = EXPERIENCES.find((item) => item.id === id);
  if (!exp) return sampleProducts;
  return sampleProducts.filter((item) => item.sizes.some((size) => size.sizeMl === exp.sizeMl));
}
