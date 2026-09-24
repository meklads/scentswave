"use client";

import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export function UpsellRail({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="wrap py-8 md:py-10">
      <div className="section-head">
        <h2>{title}</h2>
      </div>
      <div className="rail">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
