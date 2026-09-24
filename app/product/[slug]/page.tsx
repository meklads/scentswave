"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompleteSet } from "@/components/CompleteSet";
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
import {
  descriptor,
  labelFamily,
  labelMood,
  labelOccasion,
  profile,
} from "@/lib/fragrance";
import { formatMoney } from "@/lib/format";
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

  return (
    <div>
      <div className="wrap grid gap-6 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-8">
        <div className="flex gap-3">
          {product.images.length > 1 && (
            <div className="hidden w-16 shrink-0 flex-col gap-2 md:flex">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative aspect-square bg-[var(--paper)] ${active === i ? "outline outline-1 outline-[var(--ink)]" : ""}`}
                >
                  <Image src={src} alt="" fill className="object-contain p-1.5" />
                </button>
              ))}
            </div>
          )}
          <div className="relative aspect-square min-h-[320px] flex-1 bg-[var(--paper)]">
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
        </div>

        <div className="lg:sticky lg:top-[116px] lg:self-start">
          {brand && (
            <Link href={`/category/${brand.slug}`} className="kicker">
              {locale === "ar" ? brand.nameAr : brand.nameEn}
            </Link>
          )}
          <h1 className="serif mt-2">{productShort(product, locale)}</h1>
          <p className="mt-2 text-[13px] text-[var(--muted)]">
            {concentrationLabel(product, locale)} · {descriptor(product, locale)}
          </p>
          <p className="mt-4 text-[22px] font-medium">{formatMoney(product.price, locale)}</p>
          <p className="mt-4 max-w-md text-[14px] leading-7 text-[var(--muted)]">
            {locale === "ar" ? product.descriptionAr : product.descriptionEn}
          </p>
          <dl className="mt-5 grid max-w-sm grid-cols-2 gap-y-1.5 text-[13px]">
            <dt className="text-[var(--muted)]">{copy.family}</dt>
            <dd>{labelFamily(p.family, locale)}</dd>
            <dt className="text-[var(--muted)]">{copy.mood}</dt>
            <dd>{labelMood(p.mood, locale)}</dd>
            <dt className="text-[var(--muted)]">{copy.occasion}</dt>
            <dd>{labelOccasion(p.occasion, locale)}</dd>
            <dt className="text-[var(--muted)]">{copy.inStock}</dt>
            <dd>{copy.inStock}</dd>
          </dl>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 1)}
              className="w-14 border-b border-[var(--line)] bg-transparent py-2 text-sm outline-none"
            />
            <button type="button" onClick={() => addToCart(product.slug, qty)} className="cta">
              {copy.addToCart}
            </button>
            <Link href="/checkout" onClick={() => addToCart(product.slug, qty)} className="u-link">
              {copy.buyNow}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => toggleWishlist(product.slug)}
            className="mt-3 text-[13px] font-medium text-[var(--muted)]"
          >
            {loved ? copy.added : copy.wishlist}
          </button>
          <p className="mt-5 text-[12px] text-[var(--muted)]">{copy.secureNote}</p>
          <div className="mt-6 grid gap-6 border-t border-[var(--line)] pt-5 sm:grid-cols-2">
            <div>
              <p className="text-[14px] font-medium">{copy.theNotes}</p>
              <ul className="mt-2 space-y-1.5 text-[13px]">
                <li><span className="text-[var(--muted)]">{copy.topNotes} — </span>{p.top}</li>
                <li><span className="text-[var(--muted)]">{copy.heartNotes} — </span>{p.heart}</li>
                <li><span className="text-[var(--muted)]">{copy.baseNotes} — </span>{p.base}</li>
              </ul>
            </div>
            <div>
              <p className="text-[14px] font-medium">{copy.howToWear}</p>
              <p className="mt-2 text-[13px] leading-6 text-[var(--muted)]">
                {locale === "ar" ? "على النبض. بلا مبالغة. دعه يتحرك معك." : "On the pulse. Without excess. Let it move with you."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {pair && <CompleteSet product={product} pair={pair} />}
      <UpsellRail title={copy.alsoLove} products={related} />
      <UpsellRail title={copy.recentlyViewed} products={recent} />
    </div>
  );
}
