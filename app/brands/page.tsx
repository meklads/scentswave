"use client";

import Link from "next/link";
import { useStore } from "@/components/store";
import { brands } from "@/lib/catalog";
import { brandName } from "@/lib/catalog";
import { t } from "@/lib/i18n";
import Image from "next/image";

export default function BrandsPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-10 font-[family-name:var(--font-display)] text-4xl">
        {copy.brands}
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/category/${brand.slug}`}
            className="flex flex-col items-center gap-3 bg-white p-6 hover:bg-[#f3eee7]"
          >
            {brand.logo ? (
              <Image
                src={brand.logo}
                alt={brandName(brand, locale)}
                width={140}
                height={64}
                className="h-16 w-full object-contain"
              />
            ) : (
              <span className="font-[family-name:var(--font-display)] text-2xl">
                {brandName(brand, locale)}
              </span>
            )}
            <span className="text-sm">{brandName(brand, locale)}</span>
            <span className="text-xs text-[var(--muted)]">{brand.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
