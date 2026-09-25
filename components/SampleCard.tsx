"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { brandName, getBrand } from "@/lib/catalog";
import { formatSize } from "@/lib/format";
import { sampleShot } from "@/lib/sample-image";
import { defaultSize, formatSamplePrice, perfumeName } from "@/lib/samples";
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
  const { locale, addToCart, toggleWishlist, wishlist } = useStore();
  const brand = getBrand(item.brand);
  const initial = useMemo(() => defaultSize(item), [item]);
  const [sku, setSku] = useState(initial.sku);
  const size = item.sizes.find((option) => option.sku === sku) || initial;
  const loved = wishlist.includes(size.sku);

  return (
    <article className={`ticket ${styles.card}`}>
      {selectable && (
        <label className={styles.pick}>
          <input type="checkbox" checked={Boolean(selected)} onChange={onToggle} />
          {locale === "ar" ? "أضف للمجموعة" : "Add to set"}
        </label>
      )}
      <div className={`product-shot ${styles.shot}`}>
        <button
          type="button"
          className={`card-heart${loved ? " is-loved" : ""}`}
          aria-label={locale === "ar" ? "المحفوظات" : "Wishlist"}
          onClick={() => toggleWishlist(size.sku)}
        >
          <Heart filled={loved} />
        </button>
        <Link href={`/product/${size.sku}`} className="absolute inset-0">
          <Image
            src={sampleShot(item.sourceSlug, size.image)}
            alt={`${perfumeName(item, locale)} ${formatSize(size.sizeMl, locale)}`}
            fill
            sizes="(max-width: 768px) 46vw, 220px"
            className="object-contain p-1.5"
          />
        </Link>
      </div>
      <div className={styles.copy}>
        <p className={styles.brand}>{brand ? brandName(brand, locale) : item.brand}</p>
        <Link href={`/product/${size.sku}`} className={styles.name}>
          {perfumeName(item, locale)}
        </Link>
        {item.sizes.length > 1 && (
          <div className={styles.sizes} role="group" aria-label={locale === "ar" ? "الحجم" : "Size"}>
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
        <p className={styles.price}>{formatSamplePrice(size.priceSAR, locale)}</p>
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
