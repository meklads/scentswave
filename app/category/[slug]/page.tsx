"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { getBrand } from "@/lib/catalog";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

function CategoryInner() {
  const slug = String(useParams().slug || "");
  const { locale } = useStore();
  const copy = t(locale);
  const brand = getBrand(slug);

  if (slug === "men" || slug === "fragrance_men") {
    return <CatalogBrowser titleAr={copy.men} titleEn={copy.men} gender="men" />;
  }
  if (slug === "women" || slug === "fragrance_women") {
    return (
      <CatalogBrowser titleAr={copy.women} titleEn={copy.women} gender="women" />
    );
  }
  if (slug === "picks") {
    return (
      <CatalogBrowser titleAr={copy.picks} titleEn={copy.picks} featured />
    );
  }
  if (brand) {
    return (
      <CatalogBrowser
        titleAr={brand.nameAr}
        titleEn={brand.nameEn}
        brand={brand.slug}
      />
    );
  }
  return <CatalogBrowser titleAr={copy.shop} titleEn={copy.shop} />;
}

export default function CategoryPage() {
  return (
    <Suspense>
      <CategoryInner />
    </Suspense>
  );
}
