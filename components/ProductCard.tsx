"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { getBrand, productShort } from "@/lib/catalog";
import { descriptor } from "@/lib/fragrance";
import { formatMoney } from "@/lib/format";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { locale } = useStore();
  const copy = t(locale);
  const brand = getBrand(product.brand);
  const image = product.images[0];

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[3/4] overflow-hidden bg-[var(--cream)]">
        {image && (
          <Image
            src={image}
            alt={productShort(product, locale)}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="img-ken object-contain p-10"
          />
        )}
      </Link>
      <div className="pt-5">
        {brand && (
          <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--muted)]">
            {locale === "ar" ? brand.nameAr : brand.nameEn}
          </p>
        )}
        <Link href={`/product/${product.slug}`} className="mt-2 block font-light leading-7">
          {productShort(product, locale)}
        </Link>
        <p className="mt-1 text-[12px] text-[var(--muted)]">{descriptor(product, locale)}</p>
        <p className="mt-3 text-sm">{formatMoney(product.price, locale)}</p>
        <Link
          href={`/product/${product.slug}`}
          className="mt-4 inline-block text-[10px] tracking-[0.24em] uppercase text-[var(--charcoal)]"
        >
          {copy.viewFragrance} →
        </Link>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
