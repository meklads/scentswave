"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { concentrationLabel, getBrand, productShort } from "@/lib/catalog";
import { descriptor } from "@/lib/fragrance";
import { formatMoney } from "@/lib/format";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { locale, addToCart } = useStore();
  const copy = t(locale);
  const brand = getBrand(product.brand);
  const image = product.images[0];

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--paper)]">
        {product.featured && (
          <span className="absolute start-3 top-3 z-10 text-[10px] tracking-[0.12em] uppercase text-[var(--muted)]">
            {copy.exclusive}
          </span>
        )}
        <Link href={`/product/${product.slug}`} className="absolute inset-0">
          {image && (
            <Image
              src={image}
              alt={productShort(product, locale)}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
        </Link>
        <button
          type="button"
          className="plus"
          aria-label={copy.addToCart}
          onClick={() => addToCart(product.slug, 1)}
        >
          +
        </button>
      </div>
      <div className="pt-3">
        <Link href={`/product/${product.slug}`} className="serif text-[18px] leading-snug">
          {productShort(product, locale)}
        </Link>
        <p className="mt-1 text-[13px] text-[var(--muted)]">
          {brand ? (locale === "ar" ? brand.nameAr : brand.nameEn) + " · " : ""}
          {concentrationLabel(product, locale)}
        </p>
        <p className="mt-1 text-[13px]">{formatMoney(product.price, locale)}</p>
        <p className="mt-1 text-[12px] text-[var(--muted)]">{descriptor(product, locale)}</p>
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
