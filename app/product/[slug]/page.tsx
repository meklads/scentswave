"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import {
  concentrationLabel,
  getBrand,
  getProduct,
  productName,
  relatedProducts,
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

  useEffect(() => {
    if (product) viewProduct(product.slug);
  }, [product, viewProduct]);

  if (!product) {
    return <p className="wrap py-20 text-center text-[var(--muted)]">{copy.noResults}</p>;
  }

  const brand = getBrand(product.brand);
  const related = relatedProducts(product);
  const recent = recentlyViewed
    .filter((item) => item !== product.slug)
    .map((item) => getProduct(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 4);
  const loved = wishlist.includes(product.slug);
  const p = profile(product);

  return (
    <div>
      <div className="grid lg:grid-cols-2">
        <div className="bg-[var(--paper)]">
          {product.images.map((src) => (
            <div key={src} className="relative min-h-[70vh]">
              <Image
                src={src}
                alt={productName(product, locale)}
                fill
                className="object-contain p-10 md:p-16"
                sizes="50vw"
                priority
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center px-6 py-12 md:px-14 lg:px-16">
          {brand && (
            <Link href={`/category/${brand.slug}`} className="caps text-[var(--muted)]">
              {locale === "ar" ? brand.nameAr : brand.nameEn}
            </Link>
          )}
          <h1 className="serif mt-3">{productName(product, locale)}</h1>
          <p className="mt-3 text-sm text-[var(--muted)]">
            {concentrationLabel(product, locale)} · {descriptor(product, locale)}
          </p>
          <p className="mt-4 text-lg">{formatMoney(product.price, locale)}</p>
          <p className="mt-5 max-w-md text-sm leading-7 text-[var(--muted)]">
            {locale === "ar" ? product.descriptionAr : product.descriptionEn}
          </p>
          <dl className="mt-6 grid max-w-sm grid-cols-2 gap-y-2 text-sm">
            <dt className="text-[var(--muted)]">{copy.family}</dt>
            <dd>{labelFamily(p.family, locale)}</dd>
            <dt className="text-[var(--muted)]">{copy.mood}</dt>
            <dd>{labelMood(p.mood, locale)}</dd>
            <dt className="text-[var(--muted)]">{copy.occasion}</dt>
            <dd>{labelOccasion(p.occasion, locale)}</dd>
            <dt className="text-[var(--muted)]">{copy.inStock}</dt>
            <dd>{copy.inStock}</dd>
          </dl>
          <div className="sticky bottom-0 mt-8 flex flex-wrap items-center gap-4 bg-white py-4">
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
          <button type="button" onClick={() => toggleWishlist(product.slug)} className="mt-2 self-start text-[13px] font-medium text-[var(--muted)]">
            {loved ? copy.added : copy.wishlist}
          </button>
          <div className="mt-10 grid gap-8 border-t border-[var(--line)] pt-8 sm:grid-cols-2">
            <div>
              <p className="text-[17px] font-medium">{copy.theNotes}</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><span className="text-[var(--muted)]">{copy.topNotes} — </span>{p.top}</li>
                <li><span className="text-[var(--muted)]">{copy.heartNotes} — </span>{p.heart}</li>
                <li><span className="text-[var(--muted)]">{copy.baseNotes} — </span>{p.base}</li>
              </ul>
            </div>
            <div>
              <p className="text-[17px] font-medium">{copy.howToWear}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {locale === "ar" ? "على النبض. بلا مبالغة. دعه يتحرك معك." : "On the pulse. Without excess. Let it move with you."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="wrap py-14">
          <p className="serif">{copy.related}</p>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
      {recent.length > 0 && (
        <section className="wrap pb-16">
          <p className="serif">{locale === "ar" ? "شوهد مؤخرًا" : "Recently viewed"}</p>
          <div className="mt-8">
            <ProductGrid products={recent} />
          </div>
        </section>
      )}
    </div>
  );
}
