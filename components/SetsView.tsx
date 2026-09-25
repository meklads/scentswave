"use client";

import { useMemo, useState } from "react";
import { SampleCard } from "@/components/SampleCard";
import { useStore } from "@/components/store";
import { discoverySets, setBody, setItems, setName, setTotal } from "@/lib/discovery";
import { formatMoney, formatSize } from "@/lib/format";
import { defaultSize, perfumeName, sampleProducts } from "@/lib/samples";
import styles from "./samples.module.css";

export function SetsView() {
  const { locale, addToCart } = useStore();
  const [need, setNeed] = useState<3 | 5>(3);
  const [picked, setPicked] = useState<string[]>([]);

  const selected = useMemo(
    () =>
      picked
        .map((id) => sampleProducts.find((item) => item.id === id))
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [picked],
  );
  const byoTotal = selected.reduce((sum, item) => sum + defaultSize(item).priceSAR, 0);
  const ready = selected.length === need;

  function toggle(id: string) {
    setPicked((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= need) return prev;
      return [...prev, id];
    });
  }

  function addSet(id: string) {
    const set = discoverySets.find((item) => item.id === id);
    if (!set) return;
    setItems(set).forEach((entry) => addToCart(entry.size.sku, 1));
  }

  function addOwn() {
    if (!ready) return;
    selected.forEach((item) => addToCart(defaultSize(item).sku, 1));
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="wrap">
          <p className={styles.eyebrow}>DISCOVERY SETS</p>
          <h1 className={`serif ${styles.title}`}>{locale === "ar" ? "مجموعات الاكتشاف" : "Discovery sets"}</h1>
          <p className={styles.subtitle}>
            {locale === "ar"
              ? "مختارات جاهزة من العينات الحالية. تُضاف إلى سلتك كمنتجات منفصلة."
              : "Ready selections from the current sample inventory. Each fragrance is added to your existing bag."}
          </p>
        </div>
      </section>

      <section className={styles.band}>
        <div className="wrap">
          <div className={styles.setGrid}>
            {discoverySets.map((set) => {
              const items = setItems(set);
              return (
                <article key={set.id} className={styles.setCard}>
                  <p className={styles.sizeName}>{setName(set, locale)}</p>
                  <p className={styles.sizeRole}>
                    {items.length} × {formatSize(set.sizeMl, locale)}
                  </p>
                  <p className={styles.setBody}>{setBody(set, locale)}</p>
                  <ul className={styles.setList}>
                    {items.map((entry) => (
                      <li key={entry.item.id}>{perfumeName(entry.item, locale)}</li>
                    ))}
                  </ul>
                  <p className={styles.price}>{formatMoney(setTotal(set), locale)}</p>
                  <button type="button" className="card-atc" onClick={() => addSet(set.id)}>
                    {locale === "ar" ? "أضف المجموعة للسلة" : "Add set to bag"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.bandAlt}>
        <div className="wrap">
          <h2 className={`serif ${styles.sectionTitle}`}>
            {locale === "ar" ? "كوّن مجموعتك" : "Build your own set"}
          </h2>
          <p className={styles.lead}>
            {locale === "ar"
              ? "اختر ثلاثة أو خمسة عطور من المخزون الحالي. يُحسب السعر من الأحجام المختارة تلقائيًا."
              : "Choose three or five fragrances from the current inventory. The price is the sum of the selected sizes."}
          </p>
          <div className={styles.experiences}>
            {([3, 5] as const).map((count) => (
              <button
                key={count}
                type="button"
                className={need === count ? styles.houseOn : styles.house}
                onClick={() => {
                  setNeed(count);
                  setPicked((prev) => prev.slice(0, count));
                }}
              >
                {locale === "ar" ? `اختر ${count}` : `Choose ${count}`}
              </button>
            ))}
          </div>
          <p className={styles.note}>
            {locale === "ar"
              ? `${picked.length} من ${need} · ${formatMoney(byoTotal, locale)}`
              : `${picked.length} of ${need} · ${formatMoney(byoTotal, locale)}`}
          </p>
          <div className={styles.grid}>
            {sampleProducts.map((item) => (
              <SampleCard
                key={item.id}
                item={item}
                selectable
                selected={picked.includes(item.id)}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>
          <div className={styles.heroCtas}>
            <button type="button" className="cta cta-solid" disabled={!ready} onClick={addOwn}>
              {locale === "ar" ? "أضف المجموعة للسلة" : "Add set to bag"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
