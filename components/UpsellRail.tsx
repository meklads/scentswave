"use client";

import { ProductCard } from "@/components/ProductCard";
import { SectionHead } from "@/components/SectionHead";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";
import type { Product } from "@/lib/types";

export function UpsellRail({
  title,
  products,
  tone = "mist",
}: {
  title: string;
  products: Product[];
  tone?: "paper" | "blush" | "mist" | "sand" | "dusk" | "stone" | "cream";
}) {
  const { locale } = useStore();
  const copy = t(locale);
  if (products.length === 0) return null;

  return (
    <section className={`band band-${tone} py-10 md:py-14`}>
      <div className="wrap">
        <SectionHead title={title} />
        <div className="rail">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
