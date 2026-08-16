"use client";

import Link from "next/link";
import { brandName, brands } from "@/lib/catalog";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export default function BrandsPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div className="wrap py-12 md:py-16">
      <p className="caps">{copy.maison}</p>
      <h1 className="serif mt-5 mb-20 text-5xl md:text-7xl">{copy.brands}</h1>
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/category/${brand.slug}`}
            className="border-b border-[var(--line)] py-5 text-lg font-light hover:text-[var(--gold)]"
          >
            {brandName(brand, locale)}
          </Link>
        ))}
      </div>
    </div>
  );
}
