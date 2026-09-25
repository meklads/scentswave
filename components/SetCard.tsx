"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "@/components/ProductCard";
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
        {action === "add" ? (
          <button
            type="button"
            className="card-plus"
            aria-label={copy.addSet}
            onClick={() => addToCart(`set-${set.id}`, 1)}
          >
            <Plus />
          </button>
        ) : (
          <Link href="/sets" className="card-plus" aria-label={locale === "ar" ? "اكتشف المجموعة" : "See the set"}>
            <Plus />
          </Link>
        )}
      </div>
      <div className={`card-copy ${styles.setCopy}`}>
        <p className="card-brand">{setName(set, locale)}</p>
        <p className="card-meta">
          {items.length} × {formatSize(set.sizeMl, locale)}
        </p>
        {showList && (
          <>
            <p className={styles.setBody}>{setBody(set, locale)}</p>
            <ul className={styles.setList}>
              {items.map((entry) => (
                <li key={entry.item.id}>{perfumeName(entry.item, locale)}</li>
              ))}
            </ul>
          </>
        )}
        <p className="price-row">
          <span className="price-now">{formatMoney(setPrice(set), locale)}</span>
          {saved > 0 && (
            <>
              <span className="price-cut">
                {locale === "ar" ? `وفّر ${formatMoney(saved, locale)}` : `Save ${formatMoney(saved, locale)}`}
              </span>
              <span className="price-was">{formatMoney(setTotal(set), locale)}</span>
            </>
          )}
        </p>
      </div>
    </article>
  );
}
