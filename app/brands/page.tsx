"use client";

import Image from "next/image";
import Link from "next/link";
import { brandName, brands } from "@/lib/catalog";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export default function BrandsPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div className="lux py-16 md:py-20">
      <p className="eyebrow mb-4">{copy.maison}</p>
      <h1 className="display mb-16 text-5xl md:text-6xl">{copy.brands}</h1>
      <div className="grid grid-cols-2 gap-px bg-[var(--line)] md:grid-cols-4">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/category/${brand.slug}`}
            className="flex min-h-44 flex-col items-center justify-center gap-4 bg-white p-8 hover:bg-[var(--bg-soft)]"
          >
            {brand.logo ? (
              <Image
                src={brand.logo}
                alt={brandName(brand, locale)}
                width={140}
                height={56}
                className="h-12 w-full object-contain"
              />
            ) : (
              <span className="display text-2xl">{brandName(brand, locale)}</span>
            )}
            <span className="text-[12px] tracking-[0.14em] text-[var(--muted)]">
              {brandName(brand, locale)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
