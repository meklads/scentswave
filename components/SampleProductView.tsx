"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart } from "@/components/ProductCard";
import { PdpGallery } from "@/components/PdpGallery";
import { SampleCard } from "@/components/SampleCard";
import { SectionHead } from "@/components/SectionHead";
import { useStore } from "@/components/store";
import { brandName, getBrand, getProduct } from "@/lib/catalog";
import { sizeRole } from "@/lib/discovery";
import { formatMoney, formatSize } from "@/lib/format";
import { t } from "@/lib/i18n";
import { sampleGallery, sampleShot } from "@/lib/sample-image";
import { findSampleBySku, perfumeName, sampleProducts, sampleTypeLabel } from "@/lib/samples";

export function SampleProductView({ sku }: { sku: string }) {
  const found = findSampleBySku(sku);
  const { locale, addToCart, toggleWishlist, wishlist } = useStore();
  const copy = t(locale);
  const [current, setCurrent] = useState(sku);

  if (!found) return <p className="wrap py-16 text-center">{copy.noResults}</p>;

  const { item } = found;
  const size = item.sizes.find((option) => option.sku === current) || found.size;
  const brand = getBrand(item.brand);
  const full = getProduct(item.sourceSlug);
  const role = sizeRole(size.sizeMl, locale);
  const related = sampleProducts.filter((entry) => entry.id !== item.id && (entry.brand === item.brand || entry.gender === item.gender)).slice(0, 8);
  const brandLabel = brand ? brandName(brand, locale) : item.brand;
  const gallery = sampleGallery(item.sourceSlug, size.image);
  const shot = sampleShot(item.sourceSlug, size.image);
  const loved = wishlist.includes(size.sku);

  return (
    <div className="pdp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${item.perfumeNameEn} ${size.sizeMl}ml`,
            brand: { "@type": "Brand", name: brandLabel },
            offers: {
              "@type": "Offer",
              priceCurrency: "SAR",
              price: size.priceSAR,
              availability: item.availability ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
      <div className="pdp">
        <div className="pdp-buy">
          <nav className="pdp-crumb">
            <Link href="/">{copy.home}</Link>
            <Link href="/category/samples">{copy.samples}</Link>
            <span>{perfumeName(item, locale)}</span>
          </nav>

          <div className="pdp-head">
            <button
              type="button"
              onClick={() => toggleWishlist(size.sku)}
              className={`pdp-heart${loved ? " is-loved" : ""}`}
              aria-label={copy.wishlist}
            >
              <Heart filled={loved} />
            </button>
            <div>
              {item.featured && item.availability && <span className="card-pop pdp-pop">{copy.bestSellers}</span>}
              {!item.availability && <span className="card-pop pdp-pop is-gone">{copy.soldOut}</span>}
              <p className="pdp-brand">{brandLabel}</p>
              <h1 className="pdp-title">{perfumeName(item, locale)}</h1>
            </div>
          </div>

          <p className="price-row is-pdp">
            <span className="price-now">{formatMoney(size.priceSAR, locale)}</span>
          </p>
          <p className="pdp-vat">
            {copy.vatIncl}
            {" · "}
            {sampleTypeLabel(size.type, locale)}
            {" · "}
            {formatSize(size.sizeMl, locale)}
          </p>
          {role.purpose && <p className="pdp-note">{role.purpose}</p>}

          <div className="pdp-opts">
            {item.sizes.map((option) => (
              <button
                key={option.sku}
                type="button"
                onClick={() => setCurrent(option.sku)}
                className={`size-chip${option.sku === size.sku ? " is-on" : ""}`}
              >
                {formatSize(option.sizeMl, locale)}
              </button>
            ))}
          </div>

          {full && (
            <Link href={`/product/${full.slug}`} className="pdp-try">
              {locale === "ar" ? "استكشف الزجاجة الكاملة" : "Explore the full bottle"}
            </Link>
          )}

          <button
            type="button"
            className="pdp-atc"
            disabled={!item.availability}
            onClick={() => addToCart(size.sku, 1)}
          >
            {item.availability ? copy.addToCart : copy.soldOut}
          </button>
          <div className="pdp-dock">
            <span className="price-now">{formatMoney(size.priceSAR, locale)}</span>
            <button
              type="button"
              className="pdp-atc"
              disabled={!item.availability}
              onClick={() => addToCart(size.sku, 1)}
            >
              {item.availability ? copy.addToCart : copy.soldOut}
            </button>
          </div>

          <div className="pdp-acc">
            <details className="acc" open>
              <summary>{copy.description}</summary>
              <div className="acc-body">
                <p>
                  {locale === "ar"
                    ? `${perfumeName(item, "ar")} بحجم ${formatSize(size.sizeMl, "ar")} للتجربة على البشرة قبل الالتزام بالزجاجة الكاملة.`
                    : `${perfumeName(item, "en")} in ${size.sizeMl}ml, to wear on skin before committing to the full bottle.`}
                </p>
              </div>
            </details>
            <details className="acc">
              <summary>{copy.specs}</summary>
              <div className="acc-body">
                <p>
                  {locale === "ar"
                    ? "هذا الحجم الصغير يُعبأ من العطر الأصلي نفسه الذي نبيعه بالزجاجة الكاملة. ليس عينة المصنع الرسمية. موجة عطر ليست الموزع الرسمي للدار."
                    : "This smaller fill comes from the same original fragrance we sell as a full bottle. It is not a manufacturer-issued sample. Scents Wave is not the official distributor of the house."}
                </p>
              </div>
            </details>
          </div>
        </div>

        <PdpGallery images={gallery.length ? gallery : [shot]} alt={perfumeName(item, locale)} />
      </div>

      {related.length > 0 && (
        <section className="band band-paper py-10 md:py-14">
          <div className="wrap">
            <SectionHead layout="bar" title={copy.recommended} href="/category/samples" action={copy.viewAll} />
            <div className="rail">
              {related.map((entry) => (
                <SampleCard key={entry.id} item={entry} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
