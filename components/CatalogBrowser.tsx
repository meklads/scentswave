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
  const list = useMemo(
    () => filterProducts({ gender, brand, featured, sale, travel, q: query, sort }),
    [gender, brand, featured, sale, travel, query, sort],
  );

  return (
    <div>
      <section className="wrap py-12 text-center md:py-16">
        <p className="kicker">{copy.houseOf}</p>
        <h1 className="serif mt-5">{locale === "ar" ? titleAr : titleEn}</h1>
        {intro && <p className="mx-auto mt-5 max-w-xl text-[14px] leading-8 text-[var(--muted)]">{intro}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[12px] text-[var(--muted)]">
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
