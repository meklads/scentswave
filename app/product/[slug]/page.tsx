"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import {
  getBrand,
  getProduct,
  productName,
  relatedProducts,
} from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { t } from "@/lib/i18n";

export default function ProductPage() {
  const slug = String(useParams().slug || "");
  const product = getProduct(slug);
  const { locale, addToCart, toggleWishlist, wishlist } = useStore();
  const copy = t(locale);

  if (!product) {
    return (
      <p className="mx-auto max-w-6xl px-4 py-24 text-center">{copy.noResults}</p>
    );
  }

  const brand = getBrand(product.brand);
  const related = relatedProducts(product);
  const loved = wishlist.includes(product.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="grid gap-4">
          {product.images.map((src) => (
            <div key={src} className="relative aspect-square bg-white">
              <Image
                src={src}
                alt={productName(product, locale)}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          ))}
        </div>
        <div>
          {brand && (
            <Link
              href={`/category/${brand.slug}`}
              className="text-xs tracking-[0.2em] uppercase text-[var(--gold-dark)]"
            >
              {locale === "ar" ? brand.nameAr : brand.nameEn}
            </Link>
          )}
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight">
            {productName(product, locale)}
          </h1>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl">{formatMoney(product.price, locale)}</span>
            {product.compareAtPrice > product.price && (
              <span className="text-[var(--muted)] line-through">
                {formatMoney(product.compareAtPrice, locale)}
              </span>
            )}
            {product.salePercent > 0 && (
              <span className="rounded-full bg-[var(--ink)] px-3 py-1 text-xs text-white">
                {copy.sale} {product.salePercent}%
              </span>
            )}
          </div>
          <p className="mt-4 text-sm text-[var(--muted)]">
            {copy.size}: {product.sizeMl}ml · {copy.concentration}:{" "}
            {product.concentration.toUpperCase()} · {copy.inStock}
          </p>
          <p className="mt-6 max-w-lg leading-8 text-[var(--muted)]">
            {locale === "ar" ? product.descriptionAr : product.descriptionEn}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addToCart(product.slug)}
              className="rounded-full bg-[var(--ink)] px-8 py-3 text-sm text-[var(--cream)]"
            >
              {copy.addToCart}
            </button>
            <Link
              href="/checkout"
              onClick={() => addToCart(product.slug)}
              className="rounded-full border border-[var(--ink)] px-8 py-3 text-sm"
            >
              {copy.buyNow}
            </Link>
            <button
              type="button"
              onClick={() => toggleWishlist(product.slug)}
              className="rounded-full border border-[var(--line)] px-4 py-3 text-sm"
            >
              {loved ? copy.added : copy.wishlist}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-[family-name:var(--font-display)] text-3xl">
            {copy.related}
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
