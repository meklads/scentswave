"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompleteSet } from "@/components/CompleteSet";
import { Price } from "@/components/Price";
import { QtyControl } from "@/components/QtyControl";
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
import { descriptor, profile } from "@/lib/fragrance";
import { t } from "@/lib/i18n";

export default function ProductPage() {
  const slug = String(useParams().slug || "");
  const product = getProduct(slug);
  const { locale, addToCart, toggleWishlist, wishlist, viewProduct, recentlyViewed } = useStore();
  const copy = t(locale);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (product) viewProduct(product.slug);
    setActive(0);
    setQty(1);
  }, [product, viewProduct]);

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
  const p = profile(product);
  const image = product.images[active] || product.images[0];
  const brandLabel = brand ? (locale === "ar" ? brand.nameAr : brand.nameEn) : product.brand;

  return (
    <div>
      <div className="pdp">
        <div className="pdp-visual">
          <div className="product-shot relative aspect-square w-full max-w-[520px]">
            {product.salePercent > 0 && product.compareAtPrice > product.price && (
              <span className="sale-chip">-{product.salePercent}%</span>
            )}
            {image && (
              <Image
                src={image}
                alt={productName(product, locale)}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}
          </div>
        </div>

        <div className="pdp-buy">
          <p className="kicker">{brandLabel}</p>
          <h1 className="serif mt-4">{productShort(product, locale)}</h1>
          <div className="mt-5">
            <Price product={product} locale={locale} size="pdp" />
          </div>
          <p className="mt-3 text-[13px] text-[var(--muted)]">
            {concentrationLabel(product, locale)} · {descriptor(product, locale)}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span className="size-chip">{product.sizeMl}ml</span>
            <QtyControl value={qty} onChange={setQty} />
          </div>

          <p className="mt-5 text-[13px] text-[var(--muted)]">{copy.giftWrap} · {copy.giftWrapHint}</p>

          <button
            type="button"
            className="cta cta-solid mt-6 w-full"
            disabled={!product.inStock}
            onClick={() => addToCart(product.slug, qty)}
          >
            {product.inStock ? copy.addToCart : copy.soldOut}
          </button>

          <button
            type="button"
            onClick={() => toggleWishlist(product.slug)}
            className="mt-4 text-[13px] text-[var(--muted)]"
          >
            {loved ? copy.added : copy.wishlist}
          </button>

          <div className="mt-10">
            <details className="acc" open>
              <summary>{copy.description}</summary>
              <div className="acc-body">
                {locale === "ar" ? product.descriptionAr : product.descriptionEn}
              </div>
            </details>
            <details className="acc">
              <summary>{copy.theNotes}</summary>
              <div className="acc-body">
                <p>{copy.topNotes} — {p.top}</p>
                <p>{copy.heartNotes} — {p.heart}</p>
                <p>{copy.baseNotes} — {p.base}</p>
              </div>
            </details>
            <details className="acc">
              <summary>{copy.shippingInfo}</summary>
              <div className="acc-body">{copy.secureNote}</div>
            </details>
          </div>
        </div>
      </div>

      {pair && <CompleteSet product={product} pair={pair} />}
      <UpsellRail title={copy.alsoLove} products={related} />
      <UpsellRail title={copy.recentlyViewed} products={recent} />
    </div>
  );
}
