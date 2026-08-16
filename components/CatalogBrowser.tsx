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
      <section className="border-b border-[var(--line)] bg-[var(--cream)]">
        <div className="shell py-20 md:py-28">
          <p className="caps">{copy.collections}</p>
          <h1 className="serif mt-5 max-w-3xl text-5xl md:text-7xl">
            {locale === "ar" ? titleAr : titleEn}
          </h1>
          {intro && (
            <p className="mt-6 max-w-lg font-light leading-8 text-[var(--muted)]">{intro}</p>
          )}
          <p className="mt-8 text-[12px] tracking-[0.18em] uppercase text-[var(--muted)]">
            {list.length} {copy.results}
          </p>
        </div>
      </section>
      <div className="shell py-16 md:py-20">
        <label className="mb-12 block text-[11px] tracking-[0.2em] uppercase text-[var(--muted)]">
          {copy.sort}
          <select
            className="ms-4 border-0 bg-transparent py-1 text-[var(--charcoal)] outline-none"
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
        {list.length === 0 ? (
          <p className="py-24 text-center text-[var(--muted)]">{copy.noResults}</p>
        ) : (
          <ProductGrid products={list} />
        )}
      </div>
    </div>
  );
}
