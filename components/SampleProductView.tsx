"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SampleCard } from "@/components/SampleCard";
import { useStore } from "@/components/store";
import { brandName, getBrand, getProduct } from "@/lib/catalog";
import { sizeRole } from "@/lib/discovery";
import { formatMoney, formatSize } from "@/lib/format";
import { sampleGallery, sampleShot } from "@/lib/sample-image";
import { findSampleBySku, perfumeName, sampleProducts, sampleTypeLabel } from "@/lib/samples";
import { t } from "@/lib/i18n";

export function SampleProductView({ sku }: { sku: string }) {
  const found = findSampleBySku(sku);
  const { locale, addToCart } = useStore();
  const copy = t(locale);
  const [current, setCurrent] = useState(sku);
  const [active, setActive] = useState(0);

  if (!found) return <p className="wrap py-16 text-center">{copy.noResults}</p>;

  const { item } = found;
  const size = item.sizes.find((option) => option.sku === current) || found.size;
  const brand = getBrand(item.brand);
  const full = getProduct(item.sourceSlug);
  const role = sizeRole(size.sizeMl, locale);
  const related = sampleProducts.filter((entry) => entry.id !== item.id && (entry.brand === item.brand || entry.gender === item.gender)).slice(0, 4);
  const brandLabel = brand ? brandName(brand, locale) : item.brand;
  const gallery = sampleGallery(item.sourceSlug, size.image);
  const shot = sampleShot(item.sourceSlug, size.image);

  return (
    <div>
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
        <div className="pdp-visual">
          <div className="product-shot relative aspect-square w-full max-w-[520px]">
            <Image
              src={gallery[active] || shot}
              alt={perfumeName(item, locale)}
              fill
              className="object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`product-shot relative h-14 w-14 ${active === index ? "outline outline-1 outline-[var(--ink)]" : ""}`}
                >
                  <Image src={src} alt="" fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="pdp-buy">
          <p className="kicker">{brandLabel}</p>
          <h1 className="serif mt-3">{perfumeName(item, locale)}</h1>
          <p className="mt-3 text-[13px] text-[var(--muted)]">
            {sampleTypeLabel(size.type, locale)} · {role.name !== sampleTypeLabel(size.type, locale) ? `${role.name} · ` : ""}
            {formatSize(size.sizeMl, locale)}
          </p>
          <p className="mt-4 text-[22px] font-medium">{formatMoney(size.priceSAR, locale)}</p>
          <p className="mt-2 text-[13px] text-[var(--muted)]">{role.purpose}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {item.sizes.map((option) => (
              <button
                key={option.sku}
                type="button"
                onClick={() => setCurrent(option.sku)}
                className={`size-chip ${option.sku === size.sku ? "outline outline-1 outline-[var(--ink)]" : ""}`}
              >
                {formatSize(option.sizeMl, locale)}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="cta cta-solid mt-6 w-full"
            disabled={!item.availability}
            onClick={() => addToCart(size.sku, 1)}
          >
            {item.availability ? copy.addToCart : copy.soldOut}
          </button>
          <div className="pdp-dock">
            <span className="price-now">{formatMoney(size.priceSAR, locale)}</span>
            <button
              type="button"
              className="cta cta-solid"
              disabled={!item.availability}
              onClick={() => addToCart(size.sku, 1)}
            >
              {item.availability ? copy.addToCart : copy.soldOut}
            </button>
          </div>
          {full && (
            <Link href={`/product/${full.slug}`} className="u-link mt-6 inline-block">
              {locale === "ar" ? "استكشف الزجاجة الكاملة" : "Explore the full bottle"}
            </Link>
          )}
          <div className="mt-8 border border-[var(--line)] p-4">
            <p className="text-[14px] font-semibold">{copy.authenticityTitle}</p>
            <p className="mt-2 text-[13px] leading-7 text-[var(--muted)]">
              {locale === "ar"
                ? "هذا الحجم الصغير يُعبأ من العطر الأصلي نفسه الذي نبيعه بالزجاجة الكاملة. ليس عينة المصنع الرسمية. موجة عطر ليست الموزع الرسمي للدار."
                : "This smaller fill comes from the same original fragrance we sell as a full bottle. It is not a manufacturer-issued sample. Scents Wave is not the official distributor of the house."}
            </p>
          </div>
          <div className="mt-8">
            <details className="acc" open>
              <summary>{locale === "ar" ? "العطر" : "The fragrance"}</summary>
              <div className="acc-body">
                <p>
                  {locale === "ar"
                    ? `${perfumeName(item, "ar")} بحجم ${formatSize(size.sizeMl, "ar")} للتجربة على البشرة قبل الالتزام بالزجاجة الكاملة.`
                    : `${perfumeName(item, "en")} in ${size.sizeMl}ml, to wear on skin before committing to the full bottle.`}
                </p>
              </div>
            </details>
            <details className="acc">
              <summary>{locale === "ar" ? "لماذا هذا الحجم؟" : "Why this size?"}</summary>
              <div className="acc-body">
                <p>{role.purpose}</p>
              </div>
            </details>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="band band-stone">
          <div className="wrap py-14">
            <h2 className="serif text-center">{copy.youMayEnjoy}</h2>
            <div className="product-grid mt-10">
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
