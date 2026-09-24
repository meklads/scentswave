"use client";

import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/Price";
import { useStore } from "@/components/store";
import { getBrand, brandName, productShort } from "@/lib/catalog";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { locale, addToCart } = useStore();
  const copy = t(locale);
  const primary = product.images[0];
  const hover = product.images[1];
  const brand = getBrand(product.brand);
  const onSale = product.compareAtPrice > product.price && product.salePercent > 0;

  return (
    <article className="group">
      <div className="product-shot relative aspect-square">
        {onSale && <span className="sale-chip">-{product.salePercent}%</span>}
        {product.featured && !onSale && (
          <span className="absolute start-3 top-3 z-10 text-[11px] font-medium tracking-[0.14em] text-[var(--gold)]">
            {copy.exclusive}
          </span>
        )}
        {!product.inStock && (
          <span className="sale-chip">{copy.soldOut}</span>
        )}
        <Link href={`/product/${product.slug}`} className="absolute inset-0">
          {primary && (
            <Image
              src={primary}
              alt={productShort(product, locale)}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className={`object-contain p-2 transition-opacity duration-500 ${hover ? "group-hover:opacity-0" : ""}`}
            />
          )}
          {hover && (
            <Image
              src={hover}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-contain p-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col items-center gap-1 pt-4 text-center">
        <p className="caps text-[10px] text-[var(--muted)]">
          {brand ? brandName(brand, locale) : product.brand}
        </p>
        <Link href={`/product/${product.slug}`} className="product-name line-clamp-2 min-h-12">
          {productShort(product, locale)}
        </Link>
        <p className="text-[12px] text-[var(--muted)]">{product.sizeMl} ml</p>
        <Price product={product} locale={locale} />
        <button
          type="button"
          className="card-atc"
          disabled={!product.inStock}
          onClick={() => addToCart(product.slug, 1)}
        >
          {product.inStock ? copy.addToCart : copy.soldOut}
        </button>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
