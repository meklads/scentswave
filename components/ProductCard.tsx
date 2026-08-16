"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { concentrationLabel, getBrand, brandName, productShort } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { locale, addToCart } = useStore();
  const copy = t(locale);
  const primary = product.images[0];
  const hover = product.images[1];
  const brand = getBrand(product.brand);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--paper)]">
        {product.featured && (
          <span className="absolute start-3 top-3 z-10 text-[11px] font-medium text-[var(--muted)]">
            {copy.exclusive}
          </span>
        )}
        <Link href={`/product/${product.slug}`} className="absolute inset-0">
          {primary && (
            <Image
              src={primary}
              alt={productShort(product, locale)}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-contain p-6 transition-opacity duration-500 ${hover ? "group-hover:opacity-0" : ""}`}
            />
          )}
          {hover && (
            <Image
              src={hover}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>
        <button
          type="button"
          className="plus"
          aria-label={copy.addToCart}
          onClick={() => addToCart(product.slug, 1)}
        >
          <BagMini />
        </button>
      </div>
      <div className="flex flex-col gap-1 pt-2">
        <p className="line-clamp-1 text-[12px] font-semibold">
          {brand ? brandName(brand, locale) : product.brand}
        </p>
        <Link href={`/product/${product.slug}`} className="line-clamp-2 min-h-8 text-[12px] font-normal leading-snug">
          {productShort(product, locale)}
        </Link>
        <p className="text-[12px] font-normal text-[var(--muted)]">
          {concentrationLabel(product, locale)}
        </p>
        <p className="text-[16px] font-semibold">{formatMoney(product.price, locale)}</p>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

function BagMini() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M7 8h10l-.6 11H7.6L7 8z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  );
}
