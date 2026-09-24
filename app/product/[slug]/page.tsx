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
      <nav className="wrap pt-5 text-[12px] text-[var(--muted)]">
        <Link href="/">{copy.home}</Link>
        <span className="px-2">/</span>
        <Link href="/shop">{copy.fragrances}</Link>
        <span className="px-2">/</span>
        <span>{productShort(product, locale)}</span>
      </nav>

      <div className="wrap grid gap-8 py-6 lg:grid-cols-2 lg:gap-14 lg:py-8">
        <div>
          <div className="relative aspect-square bg-white">
            {product.salePercent > 0 && product.compareAtPrice > product.price && (
              <span className="sale-chip">-{product.salePercent}%</span>
            )}
            {image && (
              <Image
                src={image}
                alt={productName(product, locale)}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative h-16 w-16 bg-white ${active === i ? "outline outline-1 outline-[var(--ink)]" : ""}`}
                >
                  <Image src={src} alt="" fill className="object-contain p-1.5" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="kicker">{brandLabel}</p>
          <h1 className="serif mt-2">{productShort(product, locale)}</h1>
          <p className="mt-2 text-[13px] text-[var(--muted)]">
            {concentrationLabel(product, locale)} · {descriptor(product, locale)}
          </p>
          <div className="mt-4">
            <Price product={product} locale={locale} size="pdp" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QtyControl value={qty} onChange={setQty} />
            <button
              type="button"
              className="cta flex-1"
              disabled={!product.inStock}
              onClick={() => addToCart(product.slug, qty)}
            >
              {product.inStock ? copy.addToCart : copy.soldOut}
            </button>
          </div>
          <Link href="/checkout" onClick={() => addToCart(product.slug, qty)} className="u-link mt-4">
            {copy.buyNow}
          </Link>
          <button
            type="button"
            onClick={() => toggleWishlist(product.slug)}
            className="mt-3 block text-[13px] font-medium text-[var(--muted)]"
          >
            {loved ? copy.added : copy.wishlist}
          </button>
          <p className="mt-5 text-[12px] text-[var(--muted)]">{copy.secureNote}</p>

          <div className="mt-6">
            <details className="acc" open>
              <summary>{copy.description}</summary>
              <div className="acc-body">
                {locale === "ar" ? product.descriptionAr : product.descriptionEn}
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

      {pair && <CompleteSet product={product} pair={pair} />}
      <UpsellRail title={copy.alsoLove} products={related} />
      <UpsellRail title={copy.recentlyViewed} products={recent} />
    </div>
  );
}
