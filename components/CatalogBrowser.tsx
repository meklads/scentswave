"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { SampleCard } from "@/components/SampleCard";
import { useStore } from "@/components/store";
import { brandName, brands, filterProducts } from "@/lib/catalog";
import { WHATSAPP } from "@/lib/format";
import { t } from "@/lib/i18n";
import { filterSamples } from "@/lib/samples";

export function CatalogBrowser({
  titleAr,
  titleEn,
  gender,
  brand,
  featured,
  sale,
  travel,
  query = "",
  intro,
}: {
  titleAr: string;
  titleEn: string;
  gender?: string;
  brand?: string;
  featured?: boolean;
  sale?: boolean;
  travel?: boolean;
  query?: string;
  intro?: string;
}) {
  const { locale } = useStore();
  const copy = t(locale);
  const router = useRouter();
  const params = useSearchParams();
  const sort = params.get("sort") || "default";
  const size = (params.get("size") || "") as "" | "travel" | "100" | "large";
  const price = (params.get("price") || "") as "" | "low" | "mid" | "high";
  const brandFilter = params.get("brand") || brand || "";
  const list = useMemo(
    () =>
      filterProducts({
        gender,
        brand: brandFilter || undefined,
        featured,
        sale,
        travel,
        q: query,
        sort,
        size: size || undefined,
        price: price || undefined,
      }),
    [gender, brandFilter, featured, sale, travel, query, sort, size, price],
  );
  const sampleHits = useMemo(() => (query ? filterSamples({ q: query }).slice(0, 4) : []), [query]);

  const introTone = sale ? "blush" : travel ? "sand" : featured ? "dusk" : gender === "women" ? "blush" : gender === "men" ? "mist" : "stone";

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`?${next.toString()}`);
  }

  return (
    <div>
      <section className={`band band-${introTone}`}>
        <div className="wrap py-12 text-center md:py-16">
          <p className="kicker">{copy.maison}</p>
          <h1 className="serif mt-5">{locale === "ar" ? titleAr : titleEn}</h1>
          {intro && <p className="mx-auto mt-5 max-w-xl text-[14px] leading-8 text-[var(--muted)]">{intro}</p>}
          {query && list.length === 0 && (
            <p className="mx-auto mt-5 max-w-md text-[14px] leading-8 text-[var(--muted)]">
              {copy.emptySearch}{" "}
              <a className="u-link" href={`https://wa.me/${WHATSAPP}`}>
                {copy.talkAdvisor}
              </a>
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-[12px] text-[var(--muted)]">
            <p>
              {list.length} {copy.results}
            </p>
            {!brand && (
              <label>
                {copy.filterBrand}
                <select
                  className="ms-2 border-0 bg-transparent py-1 text-[var(--ink)] outline-none"
                  value={brandFilter}
                  onChange={(e) => setParam("brand", e.target.value)}
                >
                  <option value="">{copy.filterAll}</option>
                  {brands.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {brandName(item, locale)}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label>
              {copy.filterSize}
              <select
                className="ms-2 border-0 bg-transparent py-1 text-[var(--ink)] outline-none"
                value={size}
                onChange={(e) => setParam("size", e.target.value)}
              >
                <option value="">{copy.filterAll}</option>
                <option value="travel">{copy.sizeTravel}</option>
                <option value="100">{copy.size100}</option>
                <option value="large">{copy.sizeLarge}</option>
              </select>
            </label>
            <label>
              {copy.filterPrice}
              <select
                className="ms-2 border-0 bg-transparent py-1 text-[var(--ink)] outline-none"
                value={price}
                onChange={(e) => setParam("price", e.target.value)}
              >
                <option value="">{copy.filterAll}</option>
                <option value="low">{copy.priceLow}</option>
                <option value="mid">{copy.priceMid}</option>
                <option value="high">{copy.priceHigh}</option>
              </select>
            </label>
            <label>
              {copy.sort}
              <select
                className="ms-2 border-0 bg-transparent py-1 text-[var(--ink)] outline-none"
                value={sort}
                onChange={(e) => setParam("sort", e.target.value)}
              >
                <option value="default">{copy.sortDefault}</option>
                <option value="price-asc">{copy.sortPriceAsc}</option>
                <option value="price-desc">{copy.sortPriceDesc}</option>
                <option value="name">{copy.sortName}</option>
              </select>
            </label>
          </div>
        </div>
      </section>
      <div className="wrap py-12 md:py-16">
        {sampleHits.length > 0 && (
          <div className="mb-14">
            <p className="mb-6 text-[13px] font-medium">{copy.tryItFirst}</p>
            <div className="product-grid">
              {sampleHits.map((item) => (
                <SampleCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
        {list.length === 0 ? (
          <p className="py-16 text-center text-[var(--muted)]">
            {query ? copy.emptySearch : copy.noResults}
          </p>
        ) : (
          <ProductGrid products={list} />
        )}
        {query && (
          <p className="mt-10 text-center">
            <Link href={`https://wa.me/${WHATSAPP}`} className="u-link">
              {copy.talkAdvisor}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
