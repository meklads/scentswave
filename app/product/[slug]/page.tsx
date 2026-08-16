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
      <p className="lux py-32 text-center text-[var(--muted)]">{copy.noResults}</p>
    );
  }

  const brand = getBrand(product.brand);
  const related = relatedProducts(product);
  const loved = wishlist.includes(product.slug);

  return (
    <div className="lux py-12 md:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-4">
          {product.images.map((src) => (
            <div key={src} className="relative aspect-[4/5] bg-[var(--bg-soft)]">
              <Image
                src={src}
                alt={productName(product, locale)}
                fill
                className="object-contain p-10 md:p-16"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          ))}
        </div>
        <div className="lg:sticky lg:top-32 lg:self-start">
          {brand && (
            <Link
              href={`/category/${brand.slug}`}
              className="eyebrow"
            >
              {locale === "ar" ? brand.nameAr : brand.nameEn}
            </Link>
          )}
          <h1 className="display mt-4 text-4xl md:text-5xl leading-tight">
            {productName(product, locale)}
          </h1>
          <div className="mt-6 flex items-baseline gap-3 text-lg">
            <span>{formatMoney(product.price, locale)}</span>
            {product.compareAtPrice > product.price && (
              <span className="text-base text-[var(--muted)] line-through">
                {formatMoney(product.compareAtPrice, locale)}
              </span>
            )}
          </div>
          <p className="mt-5 text-sm tracking-[0.08em] text-[var(--muted)]">
            {product.sizeMl}ml · {product.concentration.toUpperCase()} · {copy.inStock}
          </p>
          <p className="mt-8 max-w-md text-[15px] leading-8 text-[var(--muted)]">
            {locale === "ar" ? product.descriptionAr : product.descriptionEn}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addToCart(product.slug)}
              className="btn btn-dark"
            >
              {copy.addToCart}
            </button>
            <Link
              href="/checkout"
              onClick={() => addToCart(product.slug)}
              className="btn btn-line"
            >
              {copy.buyNow}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => toggleWishlist(product.slug)}
            className="mt-5 text-sm tracking-[0.12em] text-[var(--muted)]"
          >
            {loved ? copy.added : copy.wishlist}
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <p className="eyebrow mb-4">{copy.discover}</p>
          <h2 className="display mb-12 text-4xl">{copy.related}</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
