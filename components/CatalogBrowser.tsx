"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { brands, filterProducts } from "@/lib/catalog";
import { t } from "@/lib/i18n";

export function CatalogBrowser({
  titleAr,
  titleEn,
  gender,
  brand,
  featured,
  query = "",
}: {
  titleAr: string;
  titleEn: string;
  gender?: string;
  brand?: string;
  featured?: boolean;
  query?: string;
}) {
  const { locale } = useStore();
  const copy = t(locale);
  const router = useRouter();
  const params = useSearchParams();
  const sort = params.get("sort") || "default";
  const list = useMemo(
    () => filterProducts({ gender, brand, featured, q: query, sort }),
    [gender, brand, featured, query, sort],
  );

  return (
    <div className="lux py-16 md:py-20">
      <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-4">{copy.collections}</p>
          <h1 className="display text-4xl md:text-6xl">
            {locale === "ar" ? titleAr : titleEn}
          </h1>
          <p className="mt-4 text-sm text-[var(--muted)]">
            {list.length} {copy.results}
          </p>
        </div>
        <label className="text-[12px] tracking-[0.14em] text-[var(--muted)]">
          {copy.sort}
          <select
            className="ms-3 border-0 border-b border-[var(--line)] bg-transparent py-2 text-[var(--ink)] outline-none"
            value={sort}
            onChange={(e) => {
              const next = new URLSearchParams(params.toString());
              next.set("sort", e.target.value);
              router.push(`?${next.toString()}`);
            }}
          >
            <option value="default">{copy.sortDefault}</option>
            <option value="price-asc">{copy.sortPriceAsc}</option>
            <option value="price-desc">{copy.sortPriceDesc}</option>
            <option value="name">{copy.sortName}</option>
          </select>
        </label>
      </div>

      {!brand && !gender && !featured && (
        <div className="mb-12 flex flex-wrap gap-x-6 gap-y-3">
          {brands.map((item) => (
            <a
              key={item.slug}
              href={`/category/${item.slug}`}
              className="text-[12px] tracking-[0.12em] text-[var(--muted)] hover:text-[var(--ink)]"
            >
              {locale === "ar" ? item.nameAr : item.nameEn}
            </a>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <p className="py-24 text-center text-[var(--muted)]">{copy.noResults}</p>
      ) : (
        <ProductGrid products={list} />
      )}
    </div>
  );
}
