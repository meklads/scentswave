"use client";

import { ProductCard } from "@/components/ProductCard";
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
  if (products.length === 0) return null;

  return (
    <section className={`band band-${tone} py-10 md:py-14`}>
      <div className="wrap">
        <div className="section-head">
          <h2>{title}</h2>
        </div>
        <div className="rail">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
