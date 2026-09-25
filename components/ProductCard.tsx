"use client";

import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/Price";
import { useStore } from "@/components/store";
import { concentrationLabel, getBrand, brandName, productShort } from "@/lib/catalog";
import { t } from "@/lib/i18n";
import { defaultSize, findSampleBySource } from "@/lib/samples";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { locale, addToCart, toggleWishlist, wishlist } = useStore();
  const copy = t(locale);
  const primary = product.images[0];
  const hover = product.images[1];
  const brand = getBrand(product.brand);
  const loved = wishlist.includes(product.slug);
  const sample = findSampleBySource(product.slug);

  return (
    <article className="ticket group">
      <div className="product-shot relative aspect-square">
        <button
          type="button"
          aria-label={copy.wishlist}
          onClick={() => toggleWishlist(product.slug)}
          className={`card-heart${loved ? " is-loved" : ""}`}
        >
          <Heart filled={loved} />
        </button>
        {!product.inStock && <span className="sale-chip">{copy.soldOut}</span>}
        <Link href={`/product/${product.slug}`} className="absolute inset-0">
          {primary && (
            <Image
              src={primary}
              alt={productShort(product, locale)}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className={`object-contain p-3 transition-opacity duration-500 ${hover ? "group-hover:opacity-0" : ""}`}
            />
          )}
          {hover && (
            <Image
              src={hover}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-contain p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>
      </div>
      <div className="card-copy">
        {product.featured && (
          <p className="card-mark">
            <Star />
            <span>{copy.selection}</span>
          </p>
        )}
        <p className="card-brand">{brand ? brandName(brand, locale) : product.brand}</p>
        <Link href={`/product/${product.slug}`} className="product-name">
          {productShort(product, locale)}
        </Link>
        <p className="card-meta">{concentrationLabel(product, locale)}</p>
        <Price product={product} locale={locale} />
        <button
          type="button"
          className="card-atc"
          disabled={!product.inStock}
          onClick={() => addToCart(product.slug, 1)}
        >
          {product.inStock ? copy.addToCart : copy.soldOut}
        </button>
        {sample && (
          <Link href={`/product/${defaultSize(sample).sku}`} className="u-link mt-1 text-[11px]">
            {copy.tryItFirst}
          </Link>
        )}
      </div>
    </article>
  );
}

export function Heart({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
      <path d="M12 20s-7-4.4-9.2-8.2C1.2 9.2 2.4 6 5.6 5.6c1.8-.2 3.3.7 4.2 2 0.9-1.3 2.4-2.2 4.2-2 3.2.4 4.4 3.6 2.8 6.2C19 15.6 12 20 12 20z" />
    </svg>
  );
}

function Star() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.6 14.7 9l6.8.6-5.2 4.5 1.6 6.6L12 17.2 6.1 20.7 7.7 14.1 2.5 9.6 9.3 9z" />
    </svg>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
