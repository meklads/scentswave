"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

function ShopInner() {
  const q = useSearchParams().get("q") || "";
  const { locale } = useStore();
  const copy = t(locale);
  return <CatalogBrowser titleAr={copy.shop} titleEn={copy.shop} query={q} />;
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopInner />
    </Suspense>
  );
}
