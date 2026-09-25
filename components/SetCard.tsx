"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { setBody, setItems, setName, setPrice, setSaving, setShots, setTotal, type DiscoverySet } from "@/lib/discovery";
import { formatMoney, formatSize } from "@/lib/format";
import { perfumeName } from "@/lib/samples";
import { t } from "@/lib/i18n";
import styles from "./samples.module.css";

export function SetCard({
  set,
  action = "add",
  showList = false,
}: {
  set: DiscoverySet;
  action?: "add" | "link";
  showList?: boolean;
}) {
  const { locale, addToCart } = useStore();
  const copy = t(locale);
  const items = setItems(set);
  const shots = setShots(set);
  const saved = setSaving(set);

  return (
    <article className={`ticket ${styles.setCard}`}>
      <div className={`product-shot ${styles.setShot}`} data-count={shots.length}>
        {shots.map((src, index) => (
          <span key={`${set.id}-${src}-${index}`} className={styles.setShotItem}>
            <Image
              src={src}
              alt={perfumeName(items[index].item, locale)}
              fill
              sizes="120px"
              className="object-contain"
            />
          </span>
        ))}
      </div>
      <div className={styles.setCopy}>
        <p className={styles.sizeName}>{setName(set, locale)}</p>
        <p className={styles.sizeRole}>
          {items.length} × {formatSize(set.sizeMl, locale)}
        </p>
        <p className={styles.setBody}>{setBody(set, locale)}</p>
        {showList && (
          <ul className={styles.setList}>
            {items.map((entry) => (
              <li key={entry.item.id}>{perfumeName(entry.item, locale)}</li>
            ))}
          </ul>
        )}
        <p className={styles.price}>{formatMoney(setPrice(set), locale)}</p>
        {saved > 0 && (
          <p className={styles.sizeRole}>
            <span className="line-through">{formatMoney(setTotal(set), locale)}</span>
            {" · "}
            {locale === "ar" ? `وفّر ${formatMoney(saved, locale)}` : `Save ${formatMoney(saved, locale)}`}
          </p>
        )}
        {action === "add" ? (
          <button type="button" className="card-atc" onClick={() => addToCart(`set-${set.id}`, 1)}>
            {copy.addSet}
          </button>
        ) : (
          <Link href="/sets" className="u-link">
            {locale === "ar" ? "اكتشف المجموعة" : "See the set"}
          </Link>
        )}
      </div>
    </article>
  );
}
