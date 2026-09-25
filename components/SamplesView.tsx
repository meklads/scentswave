"use client";

import { useMemo, useState } from "react";
import { SampleCard } from "@/components/SampleCard";
import { useStore } from "@/components/store";
import { brandName, getBrand } from "@/lib/catalog";
import { formatSize } from "@/lib/format";
import {
  SAMPLE_SIZES,
  SAMPLE_TYPES,
  filterSamples,
  sampleBrands,
  sampleGenderLabel,
  sampleTypeLabel,
  type SampleFilters,
} from "@/lib/samples";
import type { SampleGender, SampleType } from "@/lib/types";
import styles from "./samples.module.css";

const copy = {
  ar: {
    title: "مسافر وعينات",
    eyebrow: "TRAVEL SIZES & SAMPLES",
    subtitle: "اكتشف عطرك القادم قبل أن تقتني الزجاجة الكاملة",
    note: "عينات وديكانت لاكتشاف العطر. موجة عطر ليست الموزع الرسمي لهذه الدور.",
    search: "ابحث عن عطر أو دار",
    sort: "الترتيب",
    best: "الأكثر مبيعًا",
    newest: "الأحدث",
    priceAsc: "السعر: الأقل أولًا",
    priceDesc: "السعر: الأعلى أولًا",
    brand: "الدار",
    size: "الحجم",
    type: "النوع",
    price: "السعر",
    gender: "للجنسين",
    all: "الكل",
    under80: "أقل من ٨٠ ر.س",
    mid: "٨٠ — ١٥٠ ر.س",
    over150: "أكثر من ١٥٠ ر.س",
    filters: "تصفية",
    empty: "لا توجد عينات تطابق اختيارك.",
    men: "رجالي",
    women: "نسائي",
    unisex: "للجنسين",
  },
  en: {
    title: "Travel & Samples",
    eyebrow: "TRAVEL SIZES & SAMPLES",
    subtitle: "Discover your next fragrance before the full bottle",
    note: "Samples and decants for discovery. Scents Wave is not an official distributor of these houses.",
    search: "Search a fragrance or house",
    sort: "Sort",
    best: "Best sellers",
    newest: "Newest",
    priceAsc: "Price: low to high",
    priceDesc: "Price: high to low",
    brand: "Brand",
    size: "Size",
    type: "Type",
    price: "Price",
    gender: "Gender",
    all: "All",
    under80: "Under 80 SAR",
    mid: "80 — 150 SAR",
    over150: "Over 150 SAR",
    filters: "Filters",
    empty: "No samples match your filters.",
    men: "Men",
    women: "Women",
    unisex: "Unisex",
  },
};

export function SamplesView() {
  const { locale } = useStore();
  const text = copy[locale];
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SampleFilters["sort"]>("best");
  const [brand, setBrand] = useState("");
  const [sizeMl, setSizeMl] = useState<number | undefined>();
  const [type, setType] = useState<SampleType | undefined>();
  const [gender, setGender] = useState<SampleGender | undefined>();
  const [price, setPrice] = useState<SampleFilters["price"]>();

  const brands = sampleBrands();
  const list = useMemo(
    () => filterSamples({ q, sort, brand: brand || undefined, sizeMl, type, gender, price }),
    [q, sort, brand, sizeMl, type, gender, price],
  );

  const filters = (
    <div className={styles.filters}>
      <fieldset className={styles.group}>
        <legend>{text.brand}</legend>
        <button type="button" className={!brand ? styles.filterOn : ""} onClick={() => setBrand("")}>
          {text.all}
        </button>
        {brands.map((slug) => {
          const house = getBrand(slug);
          return (
            <button
              key={slug}
              type="button"
              className={brand === slug ? styles.filterOn : ""}
              onClick={() => setBrand(slug)}
            >
              {house ? brandName(house, locale) : slug}
            </button>
          );
        })}
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{text.size}</legend>
        <button type="button" className={!sizeMl ? styles.filterOn : ""} onClick={() => setSizeMl(undefined)}>
          {text.all}
        </button>
        {SAMPLE_SIZES.map((size) => (
          <button
            key={size}
            type="button"
            className={sizeMl === size ? styles.filterOn : ""}
            onClick={() => setSizeMl(size)}
          >
            {formatSize(size, locale)}
          </button>
        ))}
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{text.type}</legend>
        <button type="button" className={!type ? styles.filterOn : ""} onClick={() => setType(undefined)}>
          {text.all}
        </button>
        {SAMPLE_TYPES.map((value) => (
          <button
            key={value}
            type="button"
            className={type === value ? styles.filterOn : ""}
            onClick={() => setType(value)}
          >
            {sampleTypeLabel(value, locale)}
          </button>
        ))}
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{text.price}</legend>
        <button type="button" className={!price ? styles.filterOn : ""} onClick={() => setPrice(undefined)}>
          {text.all}
        </button>
        {(
          [
            ["under-80", text.under80],
            ["80-150", text.mid],
            ["over-150", text.over150],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={price === value ? styles.filterOn : ""}
            onClick={() => setPrice(value)}
          >
            {label}
          </button>
        ))}
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{text.gender}</legend>
        <button type="button" className={!gender ? styles.filterOn : ""} onClick={() => setGender(undefined)}>
          {text.all}
        </button>
        {(["men", "women", "unisex"] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={gender === value ? styles.filterOn : ""}
            onClick={() => setGender(value)}
          >
            {sampleGenderLabel(value, locale)}
          </button>
        ))}
      </fieldset>
    </div>
  );

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="wrap">
          <p className={styles.eyebrow}>{text.eyebrow}</p>
          <h1 className={`serif ${styles.title}`}>{text.title}</h1>
          <p className={styles.subtitle}>{text.subtitle}</p>
          <p className={styles.note}>{text.note}</p>
        </div>
      </section>
      <div className="wrap">
        <div className={styles.toolbar}>
          <input
            className={styles.search}
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder={text.search}
            type="search"
          />
          <label>
            {text.sort}{" "}
            <select
              className={styles.sort}
              value={sort}
              onChange={(event) => setSort(event.target.value as SampleFilters["sort"])}
            >
              <option value="best">{text.best}</option>
              <option value="newest">{text.newest}</option>
              <option value="price-asc">{text.priceAsc}</option>
              <option value="price-desc">{text.priceDesc}</option>
            </select>
          </label>
        </div>
        <details className={styles.mobileFilters}>
          <summary>{text.filters}</summary>
          {filters}
        </details>
        <div className={styles.layout}>
          <aside className={styles.desktopFilters}>{filters}</aside>
          <div className={styles.grid}>
            {list.length === 0 ? (
              <p className={styles.empty}>{text.empty}</p>
            ) : (
              list.map((item) => <SampleCard key={item.id} item={item} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
