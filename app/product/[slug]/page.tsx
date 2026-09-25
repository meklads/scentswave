"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompleteSet } from "@/components/CompleteSet";
import { Price } from "@/components/Price";
import { QtyControl } from "@/components/QtyControl";
import { UpsellRail } from "@/components/UpsellRail";
import { useStore } from "@/components/store";
import {
  complementaryProducts,
  concentrationLabel,
  getBrand,
  getProduct,
  pairProduct,
  productName,
  productShort,
} from "@/lib/catalog";
import { descriptor, profile } from "@/lib/fragrance";
import { formatSale, formatSize } from "@/lib/format";
import { t } from "@/lib/i18n";

export default function ProductPage() {
  const slug = String(useParams().slug || "");
  const product = getProduct(slug);
  const { locale, addToCart, toggleWishlist, wishlist, viewProduct, recentlyViewed } = useStore();
  const copy = t(locale);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (product) viewProduct(product.slug);
    setActive(0);
    setQty(1);
  }, [product, viewProduct]);

  if (!product) {
    return <p className="wrap py-16 text-center text-[var(--muted)]">{copy.noResults}</p>;
  }

  const brand = getBrand(product.brand);
  const pair = pairProduct(product);
  const related = complementaryProducts(product, 8).filter((item) => item.slug !== pair?.slug);
  const recent = recentlyViewed
    .filter((item) => item !== product.slug)
    .map((item) => getProduct(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 8);
  const loved = wishlist.includes(product.slug);
  const p = profile(product);
  const image = product.images[active] || product.images[0];
  const brandLabel = brand ? (locale === "ar" ? brand.nameAr : brand.nameEn) : product.brand;

  return (
    <div>
      <div className="pdp">
        <div className="pdp-visual">
          <button
            type="button"
            onClick={() => toggleWishlist(product.slug)}
            className="absolute start-5 top-5 z-10 grid h-10 w-10 place-items-center"
            aria-label={copy.wishlist}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill={loved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
              <path d="M12 20s-7-4.4-9.2-8.2C1.2 9.2 2.4 6 5.6 5.6c1.8-.2 3.3.7 4.2 2 0.9-1.3 2.4-2.2 4.2-2 3.2.4 4.4 3.6 2.8 6.2C19 15.6 12 20 12 20z" />
            </svg>
          </button>
          <div className="product-shot relative aspect-square w-full max-w-[520px]">
            {image && (
              <Image
                src={image}
                alt={productName(product, locale)}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`product-shot relative h-14 w-14 ${active === i ? "outline outline-1 outline-[var(--ink)]" : ""}`}
                >
                  <Image src={src} alt="" fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pdp-buy">
          <p className="kicker">{brandLabel}</p>
          <h1 className="serif mt-3">{productShort(product, locale)}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Price product={product} locale={locale} size="pdp" />
            {product.salePercent > 0 && product.compareAtPrice > product.price && (
              <span className="sale-chip sale-chip-inline">
                {formatSale(product.salePercent, locale)}
              </span>
            )}
          </div>
          <p className="mt-1 text-[12px] text-[var(--muted)]">{copy.vatIncl}</p>
          <p className="mt-3 text-[13px] text-[var(--muted)]">
            {concentrationLabel(product, locale)} · {descriptor(product, locale)}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span className="size-chip">{formatSize(product.sizeMl, locale)}</span>
            <QtyControl value={qty} onChange={setQty} />
          </div>

          <p className="mt-5 text-[13px] text-[var(--muted)]">{copy.giftWrap} · {copy.giftWrapHint}</p>

          <button
            type="button"
            className="cta cta-solid mt-6 w-full"
            disabled={!product.inStock}
            onClick={() => addToCart(product.slug, qty)}
          >
            {product.inStock ? copy.addToCart : copy.soldOut}
          </button>

          <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--ivory)] p-4">
            <p className="text-[14px] font-semibold">{brandLabel}</p>
            <p className="mt-1 text-[13px] text-[var(--muted)]">{copy.brandOriginal}</p>
          </div>

          <div className="mt-8">
            <details className="acc" open>
              <summary>{copy.description}</summary>
              <div className="acc-body prose-ar">
                {(locale === "ar" ? product.descriptionAr : product.descriptionEn)
                  .split(/(?<=[.؟!])\s+/)
                  .filter(Boolean)
                  .map((part) => (
                    <p key={part}>{part}</p>
                  ))}
              </div>
            </details>
            <details className="acc">
              <summary>{copy.specs}</summary>
              <div className="acc-body">
                <p>{copy.size} — {formatSize(product.sizeMl, locale)}</p>
                <p>{copy.concentration} — {concentrationLabel(product, locale)}</p>
                <p>{copy.gender} — {product.gender === "men" ? copy.men : copy.women}</p>
              </div>
            </details>
            <details className="acc">
              <summary>{copy.theNotes}</summary>
              <div className="acc-body">
                <p>{copy.topNotes} — {p.top}</p>
                <p>{copy.heartNotes} — {p.heart}</p>
                <p>{copy.baseNotes} — {p.base}</p>
              </div>
            </details>
            <details className="acc">
              <summary>{copy.shippingInfo}</summary>
              <div className="acc-body">{copy.secureNote}</div>
            </details>
          </div>
        </div>
      </div>

      <section className="band band-stone">
        <div className="wrap py-12">
          <p className="text-[16px] font-semibold">{copy.firstReview}</p>
        </div>
      </section>

      {pair && <CompleteSet product={product} pair={pair} />}
      <UpsellRail title={copy.recommended} products={related} tone="mist" />
      <UpsellRail title={copy.recentlyViewed} products={recent} tone="cream" />
    </div>
  );
}
