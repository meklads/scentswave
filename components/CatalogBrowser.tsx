"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { filterProducts } from "@/lib/catalog";
import { t } from "@/lib/i18n";

export function CatalogBrowser({
  titleAr,
  titleEn,
  gender,
  brand,
  featured,
  query = "",
  intro,
}: {
  titleAr: string;
  titleEn: string;
  gender?: string;
  brand?: string;
  featured?: boolean;
  query?: string;
  intro?: string;
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
    <div>
      <section className="wrap py-8 md:py-10">
        <p className="caps text-[var(--muted)]">{copy.collections}</p>
        <h1 className="serif mt-3">{locale === "ar" ? titleAr : titleEn}</h1>
        {intro && <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">{intro}</p>}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[13px] font-medium text-[var(--muted)]">
          <p>
            {list.length} {copy.results}
          </p>
          <label>
            {copy.sort}
            <select
              className="ms-2 border-0 bg-transparent py-1 text-[var(--ink)] outline-none"
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
      </section>
      <div className="wrap pb-16">
        {list.length === 0 ? (
          <p className="py-16 text-center text-[var(--muted)]">{copy.noResults}</p>
        ) : (
          <ProductGrid products={list} />
        )}
      </div>
    </div>
  );
}
