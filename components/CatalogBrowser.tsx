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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl">
            {locale === "ar" ? titleAr : titleEn}
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {list.length} {copy.results}
          </p>
        </div>
        <label className="text-sm">
          {copy.sort}
          <select
            className="ms-3 rounded-full border border-[var(--line)] bg-white px-3 py-2"
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
        <div className="mb-8 flex flex-wrap gap-2">
          {brands.map((item) => (
            <a
              key={item.slug}
              href={`/category/${item.slug}`}
              className="rounded-full border border-[var(--line)] px-3 py-1 text-xs hover:border-[var(--ink)]"
            >
              {locale === "ar" ? item.nameAr : item.nameEn}
            </a>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <p className="py-20 text-center text-[var(--muted)]">{copy.noResults}</p>
      ) : (
        <ProductGrid products={list} />
      )}
    </div>
  );
}
