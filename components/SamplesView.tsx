"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SampleCard } from "@/components/SampleCard";
import { SetCard } from "@/components/SetCard";
import { useStore } from "@/components/store";
import { brandName, getBrand } from "@/lib/catalog";
import { EXPERIENCES, SIZE_ROLES, discoverySets, houseKindLabel, sizeRole } from "@/lib/discovery";
import { formatMoney, formatSize } from "@/lib/format";
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
    eyebrow: "TRAVEL & DISCOVERY",
    subtitle: "جرّب العطر على بشرتك قبل الزجاجة الكاملة.",
    lead: "اكتشف مجموعة مختارة من العطور العالمية بأحجام صغيرة تمنحك الوقت الكافي لتجربتها، وفهم تطورها، واختيار ما يناسبك بثقة.",
    note: "أحجام صغيرة للتجربة. موجة عطر ليست الموزع الرسمي لهذه الدور.",
    ctaSamples: "اكتشف العينات",
    ctaSets: "استكشف مجموعات الاكتشاف",
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
    house: "البيت",
    all: "الكل",
    designer: "ديزاينر",
    niche: "نيش",
    under80: "أقل من ٨٠ ر.س",
    mid: "٨٠ — ١٥٠ ر.س",
    over150: "أكثر من ١٥٠ ر.س",
    filters: "تصفية",
    empty: "لا توجد عينات تطابق اختيارك.",
    which: "أي حجم يناسبك؟",
    houses: "تسوّق حسب الدار",
    experience: "تسوّق حسب التجربة",
    sets: "مجموعات الاكتشاف",
    viewSet: "اكتشف المجموعة",
    education: "ما الذي تستلمه؟",
    miniTitle: "ما هي التجربة؟",
    miniBody: "حجم صغير يُعبأ لدى موجة عطر من الزجاجة الأصلية، للانطباع الأول على البشرة.",
    decantTitle: "ما هو الديكانت؟",
    decantBody: "العطر نفسه يُنقل من زجاجة أصلية كاملة إلى رذاذ أصغر لدينا. التركيبة لا تُخفف.",
    travelTitle: "ما هو حجم السفر؟",
    travelBody: "حجم أكبر للاستخدام اليومي أو أثناء التنقل، وليس عينة المصنع الرسمية.",
    lastTitle: "كم تدوم العينة؟",
    lastBody: "يعتمد على عدد الرشات في كل ارتداء. نقدّم الأحجام حسب الدور، دون ادّعاء عدد رشات ثابت.",
    trust: "كيف نجهّز العينة",
    trust1: "العطر الأصلي",
    trust1b: "المحتوى هو العطر نفسه الموجود في الزجاجة الكاملة التي نبيعها.",
    trust2: "إعداد واضح",
    trust2b: "نعبّئ الحجم الصغير من المصدر الأصلي، مع تسمية الدار والاسم والحجم.",
    trust3: "بدون ادّعاءات زائدة",
    trust3b: "لسنا الموزع الرسمي. لا نسمّيها عينة المصنع إلا إذا كانت كذلك فعلًا.",
  },
  en: {
    title: "Travel & Samples",
    eyebrow: "TRAVEL & DISCOVERY",
    subtitle: "Try the fragrance on your skin before the full bottle.",
    lead: "A considered selection of international fragrances in smaller sizes — time to wear them, understand them, and choose with confidence.",
    note: "Smaller sizes for discovery. Scents Wave is not an official distributor of these houses.",
    ctaSamples: "Discover samples",
    ctaSets: "Explore discovery sets",
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
    house: "House",
    all: "All",
    designer: "Designer",
    niche: "Niche",
    under80: "Under 80 SAR",
    mid: "80 — 150 SAR",
    over150: "Over 150 SAR",
    filters: "Filters",
    empty: "No samples match your filters.",
    which: "Which size is right for you?",
    houses: "Shop by house",
    experience: "Shop by experience",
    sets: "Discovery sets",
    viewSet: "Discover the set",
    education: "What you receive",
    miniTitle: "What is a Mini?",
    miniBody: "A small Scents Wave fill from the original bottle, for a first impression on skin.",
    decantTitle: "What is a Decant?",
    decantBody: "The same fragrance transferred from an original full bottle into a smaller atomizer. It is not diluted.",
    travelTitle: "What is a Travel size?",
    travelBody: "A larger everyday or on-the-go fill. It is not a manufacturer-issued sample.",
    lastTitle: "How long does a sample last?",
    lastBody: "It depends on how many sprays you use each wear. We describe sizes by their role, not by a fixed spray count.",
    trust: "How the sample is prepared",
    trust1: "Original fragrance",
    trust1b: "The contents are the same fragrance as the full bottle we sell.",
    trust2: "Clearly prepared",
    trust2b: "We fill the smaller size from the original source, labeled with house, name and volume.",
    trust3: "No extra claims",
    trust3b: "We are not the official distributor. We do not call it a factory sample unless it is one.",
  },
};

export function SamplesView() {
  const { locale } = useStore();
  const text = copy[locale];
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SampleFilters["sort"]>("best");
  const [brand, setBrand] = useState("");
  const [house, setHouse] = useState<SampleFilters["house"]>();
  const [sizeMl, setSizeMl] = useState<number | undefined>();
  const [type, setType] = useState<SampleType | undefined>();
  const [gender, setGender] = useState<SampleGender | undefined>();
  const [price, setPrice] = useState<SampleFilters["price"]>();

  const brands = sampleBrands();
  const list = useMemo(
    () => filterSamples({ q, sort, brand: brand || undefined, house, sizeMl, type, gender, price }),
    [q, sort, brand, house, sizeMl, type, gender, price],
  );

  const filters = (
    <div className={styles.filters}>
      <fieldset className={styles.group}>
        <legend>{text.house}</legend>
        <button type="button" className={!house ? styles.filterOn : ""} onClick={() => setHouse(undefined)}>
          {text.all}
        </button>
        {(["designer", "niche"] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={house === value ? styles.filterOn : ""}
            onClick={() => setHouse(value)}
          >
            {houseKindLabel(value, locale)}
          </button>
        ))}
      </fieldset>
      <fieldset className={styles.group}>
        <legend>{text.brand}</legend>
        <button type="button" className={!brand ? styles.filterOn : ""} onClick={() => setBrand("")}>
          {text.all}
        </button>
        {brands.map((slug) => {
          const houseBrand = getBrand(slug);
          return (
            <button
              key={slug}
              type="button"
              className={brand === slug ? styles.filterOn : ""}
              onClick={() => setBrand(slug)}
            >
              {houseBrand ? brandName(houseBrand, locale) : slug}
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
          <p className={styles.lead}>{text.lead}</p>
          <p className={styles.note}>{text.note}</p>
          <div className={styles.heroCtas}>
            <a href="#samples" className="cta cta-solid">
              {text.ctaSamples}
            </a>
            <Link href="/sets" className="u-link">
              {text.ctaSets}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className="wrap">
          <h2 className={`serif ${styles.sectionTitle}`}>{text.which}</h2>
          <div className={styles.sizeGuide}>
            {([2, 5, 10] as const).map((ml) => {
              const role = SIZE_ROLES[ml];
              return (
                <button key={ml} type="button" className={styles.sizeCard} onClick={() => setSizeMl(ml)}>
                  <p className={styles.sizeName}>{locale === "ar" ? role.nameAr : role.nameEn}</p>
                  <p className={styles.sizeMl}>{formatSize(ml, locale)}</p>
                  <p className={styles.sizeRole}>{sizeRole(ml, locale).purpose}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.bandAlt}>
        <div className="wrap">
          <h2 className={`serif ${styles.sectionTitle}`}>{text.houses}</h2>
          <div className={styles.houses}>
            {brands.map((slug) => {
              const houseBrand = getBrand(slug);
              return (
                <button
                  key={slug}
                  type="button"
                  className={brand === slug ? styles.houseOn : styles.house}
                  onClick={() => {
                    setBrand(slug);
                    document.getElementById("samples")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {houseBrand ? brandName(houseBrand, locale) : slug}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className="wrap">
          <h2 className={`serif ${styles.sectionTitle}`}>{text.experience}</h2>
          <div className={styles.experiences}>
            {EXPERIENCES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.exp}
                onClick={() => {
                  setSizeMl(item.sizeMl);
                  document.getElementById("samples")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <p className={styles.sizeName}>{locale === "ar" ? item.nameAr : item.nameEn}</p>
                <p className={styles.sizeRole}>{formatSize(item.sizeMl, locale)}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bandAlt}>
        <div className="wrap">
          <h2 className={`serif ${styles.sectionTitle}`}>{text.sets}</h2>
          <div className={styles.setGrid}>
            {discoverySets.map((set) => (
              <SetCard key={set.id} set={set} action="link" />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.band}>
        <div className="wrap">
          <h2 className={`serif ${styles.sectionTitle}`}>{text.education}</h2>
          <div className={styles.edu}>
            <article>
              <h3>{text.miniTitle}</h3>
              <p>{text.miniBody}</p>
            </article>
            <article>
              <h3>{text.decantTitle}</h3>
              <p>{text.decantBody}</p>
            </article>
            <article>
              <h3>{text.travelTitle}</h3>
              <p>{text.travelBody}</p>
            </article>
            <article>
              <h3>{text.lastTitle}</h3>
              <p>{text.lastBody}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.bandAlt}>
        <div className="wrap">
          <h2 className={`serif ${styles.sectionTitle}`}>{text.trust}</h2>
          <div className={styles.edu}>
            <article>
              <h3>{text.trust1}</h3>
              <p>{text.trust1b}</p>
            </article>
            <article>
              <h3>{text.trust2}</h3>
              <p>{text.trust2b}</p>
            </article>
            <article>
              <h3>{text.trust3}</h3>
              <p>{text.trust3b}</p>
            </article>
          </div>
        </div>
      </section>

      <div className="wrap" id="samples">
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
