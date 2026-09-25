"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useStore } from "@/components/store";
import { brandName, getBrand } from "@/lib/catalog";
import { formatSize } from "@/lib/format";
import { defaultSize, formatSamplePrice, perfumeName, sampleTypeLabel } from "@/lib/samples";
import type { SampleProduct } from "@/lib/types";
import styles from "./samples.module.css";

export function SampleCard({ item }: { item: SampleProduct }) {
  const { locale, addToCart } = useStore();
  const brand = getBrand(item.brand);
  const initial = useMemo(() => defaultSize(item), [item]);
  const [sku, setSku] = useState(initial.sku);
  const size = item.sizes.find((option) => option.sku === sku) || initial;

  return (
    <article className={styles.card}>
      <div className={styles.shot}>
        <span className={styles.badge}>{sampleTypeLabel(size.type, locale).toUpperCase()}</span>
        <Image src={size.image} alt="" fill unoptimized sizes="240px" />
      </div>
      <p className={styles.brand}>{brand ? brandName(brand, locale) : item.brand}</p>
      <h2 className={styles.name}>{perfumeName(item, locale)}</h2>
      <p className={styles.meta}>
        {formatSize(size.sizeMl, locale)} · {sampleTypeLabel(size.type, locale)}
      </p>
      <p className={styles.price}>{formatSamplePrice(size.priceSAR, locale)}</p>
      {item.sizes.length > 1 && (
        <div className={styles.sizes}>
          {item.sizes.map((option) => (
            <button
              key={option.sku}
              type="button"
              className={option.sku === size.sku ? styles.sizeOn : ""}
              onClick={() => setSku(option.sku)}
            >
              {formatSize(option.sizeMl, locale)}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="card-atc"
        disabled={!item.availability}
        onClick={() => addToCart(size.sku, 1)}
      >
        {locale === "ar" ? "أضف للسلة" : "Add to bag"}
      </button>
    </article>
  );
}
