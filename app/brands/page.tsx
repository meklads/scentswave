"use client";

import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { brandName, brands } from "@/lib/catalog";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export default function BrandsPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div>
      <PageIntro kicker={copy.maison} title={copy.brands} />
      <div className="wrap grid gap-x-10 gap-y-2 pb-20 sm:grid-cols-2 md:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/category/${brand.slug}`}
            className="border-b border-[var(--line)] py-5 text-[17px] hover:opacity-55"
          >
            {brandName(brand, locale)}
          </Link>
        ))}
      </div>
    </div>
  );
}
