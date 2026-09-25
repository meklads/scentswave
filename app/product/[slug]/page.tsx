"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompleteSet } from "@/components/CompleteSet";
import { Heart } from "@/components/ProductCard";
import { PdpGallery } from "@/components/PdpGallery";
import { Price } from "@/components/Price";
import { QtyControl } from "@/components/QtyControl";
import { SampleProductView } from "@/components/SampleProductView";
import { UpsellRail } from "@/components/UpsellRail";
import { useStore } from "@/components/store";
import {
  complementaryProducts,
  concentrationLabel,
  getBrand,
  getProduct,
  pairProduct,
  productName,
  productShort,
} from "@/lib/catalog";
import { formatMoney, formatSize } from "@/lib/format";
import { t } from "@/lib/i18n";
import { defaultSize, findSampleBySku, findSampleBySource } from "@/lib/samples";

export default function ProductPage() {
  const slug = String(useParams().slug || "");
  const sampleMatch = findSampleBySku(slug);
  const product = sampleMatch ? undefined : getProduct(slug);
  const { locale, addToCart, toggleWishlist, wishlist, viewProduct, recentlyViewed } = useStore();
  const copy = t(locale);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) viewProduct(product.slug);
    setQty(1);
  }, [product, viewProduct]);

  if (sampleMatch) {
    return <SampleProductView sku={slug} />;
  }

  if (!product) {
    return <p className="wrap py-16 text-center text-[var(--muted)]">{copy.noResults}</p>;
  }

  const brand = getBrand(product.brand);
  const pair = pairProduct(product);
  const related = complementaryProducts(product, 8).filter((item) => item.slug !== pair?.slug);
  const recent = recentlyViewed
    .filter((item) => item !== product.slug)
    .map((item) => getProduct(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 8);
  const loved = wishlist.includes(product.slug);
  const sample = findSampleBySource(product.slug);
  const hasNotes = Boolean(product.topNotes || product.heartNotes || product.baseNotes);
  const brandLabel = brand ? (locale === "ar" ? brand.nameAr : brand.nameEn) : product.brand;
  const genderHref = product.gender === "women" ? "/category/women" : "/category/men";
  const genderLabel = product.gender === "women" ? copy.women : copy.men;

  return (
    <div className="pdp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: productName(product, "en"),
            brand: { "@type": "Brand", name: brandLabel },
            image: product.images,
            offers: {
              "@type": "Offer",
              priceCurrency: "SAR",
              price: product.price,
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />

      <div className="pdp">
        <div className="pdp-buy">
          <nav className="pdp-crumb">
            <Link href="/">{copy.home}</Link>
            <Link href={genderHref}>{genderLabel}</Link>
            <span>{productShort(product, locale)}</span>
          </nav>

          <div className="pdp-head">
            <button
              type="button"
              onClick={() => toggleWishlist(product.slug)}
              className={`pdp-heart${loved ? " is-loved" : ""}`}
              aria-label={copy.wishlist}
            >
              <Heart filled={loved} />
            </button>
            <div>
              {product.featured && product.inStock && <span className="card-pop pdp-pop">{copy.bestSellers}</span>}
              {!product.inStock && <span className="card-pop pdp-pop is-gone">{copy.soldOut}</span>}
              <p className="pdp-brand">{brandLabel}</p>
              <h1 className="pdp-title">{productShort(product, locale)}</h1>
            </div>
          </div>

          <Price product={product} locale={locale} size="pdp" />
          <p className="pdp-vat">
            {copy.vatIncl}
            {" · "}
            {concentrationLabel(product, locale)}
            {" · "}
            {product.inStock ? copy.inStock : copy.soldOut}
          </p>

          <div className="pdp-opts">
            <span className="size-chip is-on">{formatSize(product.sizeMl, locale)}</span>
            <QtyControl value={qty} onChange={setQty} />
          </div>

          {sample && (
            <Link href={`/product/${defaultSize(sample).sku}`} className="pdp-try">
              {copy.tryItFirst}
              {" — "}
              {sample.sizes.map((option) => formatSize(option.sizeMl, locale)).join(" · ")}
            </Link>
          )}

          <button
            type="button"
            className="pdp-atc"
            disabled={!product.inStock}
            onClick={() => addToCart(product.slug, qty)}
          >
            {product.inStock ? copy.addToCart : copy.soldOut}
          </button>
          <div className="pdp-dock">
            <span className="price-now">{formatMoney(product.price, locale)}</span>
            <button
              type="button"
              className="pdp-atc"
              disabled={!product.inStock}
              onClick={() => addToCart(product.slug, qty)}
            >
              {product.inStock ? copy.addToCart : copy.soldOut}
            </button>
          </div>

          <div className="pdp-acc">
            <details className="acc" open>
              <summary>{copy.description}</summary>
              <div className="acc-body prose-ar">
                {(locale === "ar" ? product.descriptionAr : product.descriptionEn)
                  .split(/(?<=[.؟!])\s+/)
                  .filter(Boolean)
                  .map((part) => (
                    <p key={part}>{part}</p>
                  ))}
              </div>
            </details>
            <details className="acc">
              <summary>{copy.specs}</summary>
              <div className="acc-body">
                <p>{copy.size} — {formatSize(product.sizeMl, locale)}</p>
                <p>{copy.concentration} — {concentrationLabel(product, locale)}</p>
                <p>{copy.gender} — {genderLabel}</p>
                <p>{copy.authenticityTitle} — {copy.authenticityBody}</p>
              </div>
            </details>
            {hasNotes && (
              <details className="acc">
                <summary>{copy.theNotes}</summary>
                <div className="acc-body">
                  {product.topNotes && <p>{copy.topNotes} — {product.topNotes}</p>}
                  {product.heartNotes && <p>{copy.heartNotes} — {product.heartNotes}</p>}
                  {product.baseNotes && <p>{copy.baseNotes} — {product.baseNotes}</p>}
                </div>
              </details>
            )}
            <details className="acc">
              <summary>{copy.shippingInfo}</summary>
              <div className="acc-body">{copy.secureNote}</div>
            </details>
          </div>
        </div>

        <PdpGallery images={product.images} alt={productName(product, locale)} />
      </div>

      {pair && <CompleteSet product={product} pair={pair} />}
      <UpsellRail title={copy.recommended} products={related} />
      <UpsellRail title={copy.recentlyViewed} products={recent} />
    </div>
  );
}
