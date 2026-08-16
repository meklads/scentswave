"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { getBrand, productShort } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { locale, addToCart, toggleWishlist, wishlist } = useStore();
  const copy = t(locale);
  const brand = getBrand(product.brand);
  const loved = wishlist.includes(product.slug);
  const image = product.images[0];

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-soft)]"
      >
        {product.salePercent > 0 && (
          <span className="absolute start-4 top-4 z-10 text-[11px] tracking-[0.16em] text-[var(--muted)]">
            −{product.salePercent}%
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.slug);
          }}
          className="absolute end-4 top-4 z-10 text-[var(--ink)]"
          aria-label={copy.wishlist}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={loved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" />
          </svg>
        </button>
        {image && (
          <Image
            src={image}
            alt={productShort(product, locale)}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-8 transition duration-700 group-hover:scale-[1.04]"
          />
        )}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-5 opacity-0 transition duration-300 group-hover:opacity-100 max-md:hidden">
          <span className="pointer-events-auto">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product.slug);
              }}
              className="btn btn-dark min-h-11 px-6 text-[11px]"
            >
              {copy.addToCart}
            </button>
          </span>
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-1 pt-4">
        {brand && (
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--muted)]">
            {locale === "ar" ? brand.nameAr : brand.nameEn}
          </p>
        )}
        <Link href={`/product/${product.slug}`} className="text-[15px] font-light leading-7">
          {productShort(product, locale)}
        </Link>
        <div className="mt-2 flex items-baseline gap-2 text-sm">
          <span>{formatMoney(product.price, locale)}</span>
          {product.compareAtPrice > product.price && (
            <span className="text-[var(--muted)] line-through">
              {formatMoney(product.compareAtPrice, locale)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => addToCart(product.slug)}
          className="mt-4 text-start text-[12px] tracking-[0.14em] text-[var(--muted)] md:hidden"
        >
          {copy.addToCart}
        </button>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
