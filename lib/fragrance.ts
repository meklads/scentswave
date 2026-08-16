import type { Locale, Product } from "@/lib/types";

export type Family = "woody" | "floral" | "oriental" | "fresh" | "leather";
export type Mood = "intimate" | "radiant" | "nocturnal" | "clean";
export type Occasion = "day" | "evening" | "ceremony";

export type FragranceProfile = {
  family: Family;
  mood: Mood;
  occasion: Occasion;
  intensity: 1 | 2 | 3 | 4 | 5;
  top: string;
  heart: string;
  base: string;
};

const FAMILY: Record<Family, { ar: string; en: string }> = {
  woody: { ar: "خشبي", en: "Woody" },
  floral: { ar: "زهري", en: "Floral" },
  oriental: { ar: "شرقي", en: "Oriental" },
  fresh: { ar: "منعش", en: "Fresh" },
  leather: { ar: "جلدي", en: "Leather" },
};

const MOOD: Record<Mood, { ar: string; en: string }> = {
  intimate: { ar: "حميمي", en: "Intimate" },
  radiant: { ar: "مضيء", en: "Radiant" },
  nocturnal: { ar: "ليلي", en: "Nocturnal" },
  clean: { ar: "نقي", en: "Clean" },
};

const OCCASION: Record<Occasion, { ar: string; en: string }> = {
  day: { ar: "نهار", en: "Day" },
  evening: { ar: "مساء", en: "Evening" },
  ceremony: { ar: "مناسبة", en: "Occasion" },
};

export function labelFamily(v: Family, locale: Locale) {
  return FAMILY[v][locale];
}
export function labelMood(v: Mood, locale: Locale) {
  return MOOD[v][locale];
}
export function labelOccasion(v: Occasion, locale: Locale) {
  return OCCASION[v][locale];
}

export function profile(product: Product): FragranceProfile {
  const n = `${product.stem} ${product.shortEn}`.toLowerCase();
  if (/(oud|malaki|tobacco|aoud|leather|ombre|noir|encre|vetiver)/.test(n)) {
    return {
      family: n.includes("leather") || n.includes("ombre") ? "leather" : "woody",
      mood: "nocturnal",
      occasion: "evening",
      intensity: 5,
      top: "Bergamot · Spice",
      heart: "Oud · Leather",
      base: "Amber · Woods",
    };
  }
  if (/(belle|idole|tresor|rose|flower|chic|viva|amarige|interdit|miracle|beauty|eternity)/.test(n)) {
    return {
      family: "floral",
      mood: "radiant",
      occasion: "day",
      intensity: 3,
      top: "Citrus blossom",
      heart: "Rose · Iris",
      base: "Musk · Vanilla",
    };
  }
  if (/(sauvage|bleu|acqua|fresh|cool|carbon|sport|invictus|explorer)/.test(n)) {
    return {
      family: "fresh",
      mood: "clean",
      occasion: "day",
      intensity: 3,
      top: "Citrus · Air",
      heart: "Lavender · Woods",
      base: "Ambergris · Musk",
    };
  }
  if (product.gender === "women") {
    return {
      family: "oriental",
      mood: "intimate",
      occasion: "evening",
      intensity: 4,
      top: "Saffron · Pear",
      heart: "Jasmine · Rose",
      base: "Vanilla · Woods",
    };
  }
  return {
    family: "woody",
    mood: "intimate",
    occasion: "evening",
    intensity: 4,
    top: "Citrus · Pepper",
    heart: "Cedar · Spice",
    base: "Amber · Vetiver",
  };
}

export function descriptor(product: Product, locale: Locale) {
  const p = profile(product);
  if (locale === "ar") {
    return `${labelFamily(p.family, "ar")} · ${labelMood(p.mood, "ar")}`;
  }
  return `${labelFamily(p.family, "en")} · ${labelMood(p.mood, "en")}`;
}
