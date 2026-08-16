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
    <article className="group relative flex flex-col bg-white">
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-[#f3eee7]">
        {product.salePercent > 0 && (
          <span className="absolute start-3 top-3 z-10 rounded-full bg-[var(--ink)] px-2.5 py-1 text-[11px] text-white">
            {copy.sale} {product.salePercent}%
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.slug);
          }}
          className="absolute end-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90"
          aria-label={copy.wishlist}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={loved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.7"
            className={loved ? "text-[var(--gold-dark)]" : ""}
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
            className="object-contain p-6 transition duration-500 group-hover:scale-105"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 px-1 pt-3 pb-4">
        {brand && (
          <p className="text-[11px] tracking-[0.16em] uppercase text-[var(--muted)]">
            {locale === "ar" ? brand.nameAr : brand.nameEn}
          </p>
        )}
        <Link href={`/product/${product.slug}`} className="text-sm leading-6 min-h-12">
          {productShort(product, locale)}
        </Link>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="font-medium">{formatMoney(product.price, locale)}</span>
          {product.compareAtPrice > product.price && (
            <span className="text-xs text-[var(--muted)] line-through">
              {formatMoney(product.compareAtPrice, locale)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => addToCart(product.slug)}
          className="mt-3 w-full rounded-full border border-[var(--ink)] py-2 text-xs tracking-wide hover:bg-[var(--ink)] hover:text-[var(--cream)]"
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
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
