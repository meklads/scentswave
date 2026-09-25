"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useStore } from "@/components/store";
import { brandName, getBrand, getProduct } from "@/lib/catalog";
import { formatSize } from "@/lib/format";
import { sizeRole } from "@/lib/discovery";
import { sampleShot } from "@/lib/sample-image";
import { defaultSize, formatSamplePrice, perfumeName, sampleTypeLabel } from "@/lib/samples";
import type { SampleProduct } from "@/lib/types";
import styles from "./samples.module.css";

export function SampleCard({
  item,
  selectable,
  selected,
  onToggle,
}: {
  item: SampleProduct;
  selectable?: boolean;
  selected?: boolean;
  onToggle?: () => void;
}) {
  const { locale, addToCart } = useStore();
  const brand = getBrand(item.brand);
  const source = getProduct(item.sourceSlug);
  const initial = useMemo(() => defaultSize(item), [item]);
  const [sku, setSku] = useState(initial.sku);
  const size = item.sizes.find((option) => option.sku === sku) || initial;
  const role = sizeRole(size.sizeMl, locale);

  return (
    <article className={styles.card}>
      {selectable && (
        <label className={styles.pick}>
          <input type="checkbox" checked={Boolean(selected)} onChange={onToggle} />
          {locale === "ar" ? "أضف للمجموعة" : "Add to set"}
        </label>
      )}
      <Link href={`/product/${size.sku}`} className={`product-shot ${styles.shot}`}>
        <span className={styles.badge}>{sampleTypeLabel(size.type, locale)}</span>
        <Image
          src={sampleShot(item.sourceSlug, size.image)}
          alt={`${perfumeName(item, locale)} ${formatSize(size.sizeMl, locale)}`}
          fill
          sizes="240px"
          className="object-contain p-3"
        />
      </Link>
      <div className={styles.copy}>
        <p className={styles.brand}>{brand ? brandName(brand, locale) : item.brand}</p>
        <Link href={`/product/${size.sku}`} className={styles.name}>
          {perfumeName(item, locale)}
        </Link>
        <p className={styles.meta}>
          {source
            ? locale === "ar"
              ? source.concentration === "edt"
                ? "تواليت"
                : source.concentration === "parfum"
                  ? "بارفوم"
                  : "بارفان"
              : source.concentration.toUpperCase()
            : role.name}
          {" · "}
          {formatSize(size.sizeMl, locale)}
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
        <p className={styles.meta}>
          {item.availability
            ? locale === "ar"
              ? "متوفر"
              : "In stock"
            : locale === "ar"
              ? "غير متوفر"
              : "Unavailable"}
        </p>
        <button
          type="button"
          className="card-atc"
          disabled={!item.availability}
          onClick={() => addToCart(size.sku, 1)}
        >
          {locale === "ar" ? "أضف للسلة" : "Add to bag"}
        </button>
      </div>
    </article>
  );
}
