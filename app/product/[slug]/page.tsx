"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import {
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
    return <p className="shell py-32 text-center text-[var(--muted)]">{copy.noResults}</p>;
  }

  const brand = getBrand(product.brand);
  const related = relatedProducts(product);
  const recent = recentlyViewed
    .filter((item) => item !== product.slug)
    .map((item) => getProduct(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3);
  const loved = wishlist.includes(product.slug);
  const p = profile(product);

  return (
    <div>
      <div className="grid min-h-[80vh] lg:grid-cols-2">
        <div className="bg-[var(--cream)]">
          {product.images.map((src) => (
            <div key={src} className="relative min-h-[80vh] lg:sticky lg:top-[84px]">
              <Image
                src={src}
                alt={productName(product, locale)}
                fill
                className="object-contain p-12 md:p-20"
                sizes="50vw"
                priority
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center px-8 py-16 md:px-16 lg:px-20">
          {brand && (
            <Link href={`/category/${brand.slug}`} className="caps">
              {locale === "ar" ? brand.nameAr : brand.nameEn}
            </Link>
          )}
          <h1 className="serif mt-5 text-4xl md:text-5xl leading-tight">
            {productName(product, locale)}
          </h1>
          <p className="mt-4 text-sm text-[var(--muted)]">{descriptor(product, locale)}</p>
          <p className="mt-6 text-xl">{formatMoney(product.price, locale)}</p>
          <p className="mt-6 max-w-md font-light leading-8 text-[var(--muted)]">
            {locale === "ar" ? product.descriptionAr : product.descriptionEn}
          </p>
          <dl className="mt-8 grid max-w-sm grid-cols-2 gap-y-3 text-sm">
            <dt className="text-[var(--muted)]">{copy.family}</dt>
            <dd>{labelFamily(p.family, locale)}</dd>
            <dt className="text-[var(--muted)]">{copy.mood}</dt>
            <dd>{labelMood(p.mood, locale)}</dd>
            <dt className="text-[var(--muted)]">{copy.occasion}</dt>
            <dd>{labelOccasion(p.occasion, locale)}</dd>
            <dt className="text-[var(--muted)]">{copy.size}</dt>
            <dd>{product.sizeMl}ml · {product.concentration.toUpperCase()}</dd>
            <dt className="text-[var(--muted)]">{copy.inStock}</dt>
            <dd>{copy.inStock}</dd>
          </dl>
          <div className="sticky bottom-0 mt-10 flex flex-col gap-4 bg-[var(--ivory)] py-4 sm:flex-row sm:items-center">
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 1)}
              className="w-16 border-b border-[var(--line)] bg-transparent py-2 text-sm outline-none"
            />
            <button type="button" onClick={() => addToCart(product.slug, qty)} className="cta cta-solid">
              {copy.addToCart}
            </button>
            <Link href="/checkout" onClick={() => addToCart(product.slug, qty)} className="cta cta-ghost">
              {copy.buyNow}
            </Link>
          </div>
          <button type="button" onClick={() => toggleWishlist(product.slug)} className="mt-4 self-start text-[11px] tracking-[0.2em] uppercase text-[var(--muted)]">
            {loved ? copy.added : copy.wishlist}
          </button>
        </div>
      </div>

      <section className="shell grid gap-16 py-28 md:grid-cols-2">
        <div>
          <p className="caps">{copy.theScent}</p>
          <p className="mt-6 max-w-md font-light leading-9 text-[var(--muted)]">
            {locale === "ar" ? product.descriptionAr : product.descriptionEn}
          </p>
        </div>
        <div>
          <p className="caps">{copy.theNotes}</p>
          <ul className="mt-6 space-y-4 text-sm">
            <li><span className="text-[var(--muted)]">{copy.topNotes} — </span>{p.top}</li>
            <li><span className="text-[var(--muted)]">{copy.heartNotes} — </span>{p.heart}</li>
            <li><span className="text-[var(--muted)]">{copy.baseNotes} — </span>{p.base}</li>
          </ul>
        </div>
        <div>
          <p className="caps">{copy.theExperience}</p>
          <p className="mt-6 max-w-md font-light leading-9 text-[var(--muted)]">
            {copy.philosophyBody}
          </p>
        </div>
        <div>
          <p className="caps">{copy.theCraft}</p>
          <p className="mt-6 max-w-md font-light leading-9 text-[var(--muted)]">
            {copy.craftBody}
          </p>
        </div>
        <div>
          <p className="caps">{copy.howToWear}</p>
          <p className="mt-6 max-w-md font-light leading-9 text-[var(--muted)]">
            {locale === "ar"
              ? "على النبض. بلا مبالغة. دعه يتحرك معك."
              : "On the pulse. Without excess. Let it move with you."}
          </p>
        </div>
        <div>
          <p className="caps">{copy.ingredients}</p>
          <p className="mt-6 max-w-md font-light leading-9 text-[var(--muted)]">
            {product.sizeMl}ml · {product.concentration.toUpperCase()} · {copy.original}
          </p>
        </div>
        <div>
          <p className="caps">{copy.shippingInfo}</p>
          <p className="mt-6 max-w-md font-light leading-9 text-[var(--muted)]">
            {copy.fastShip}
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-[var(--line)] py-28">
          <div className="shell">
            <p className="caps">{copy.related}</p>
            <div className="mt-12">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      )}
      {recent.length > 0 && (
        <section className="border-t border-[var(--line)] py-28">
          <div className="shell">
            <p className="caps">{locale === "ar" ? "شوهد مؤخرًا" : "Recently viewed"}</p>
            <div className="mt-12">
              <ProductGrid products={recent} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
