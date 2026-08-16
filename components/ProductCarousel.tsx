"use client";

import { useRef, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export function ProductCarousel({
  tabs,
}: {
  tabs: { id: string; label: string; products: Product[] }[];
}) {
  const { locale } = useStore();
  const copy = t(locale);
  const [active, setActive] = useState(tabs[0]?.id || "");
  const rail = useRef<HTMLDivElement>(null);
  const current = tabs.find((tab) => tab.id === active) || tabs[0];

  function move(dir: number) {
    const node = rail.current;
    if (!node) return;
    const card = node.firstElementChild?.clientWidth || 280;
    const delta = (card + 16) * dir * (locale === "ar" ? -1 : 1);
    node.scrollBy({ left: delta, behavior: "smooth" });
  }

  if (!current) return null;

  return (
    <section className="wrap py-12 md:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`caps pb-1 ${active === tab.id ? "border-b border-[var(--ink)]" : "text-[var(--muted)]"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className="arrow" onClick={() => move(-1)} aria-label={copy.prev}>
            <Chevron dir={locale === "ar" ? "right" : "left"} />
          </button>
          <span className="text-[var(--muted)]">/</span>
          <button type="button" className="arrow" onClick={() => move(1)} aria-label={copy.next}>
            <Chevron dir={locale === "ar" ? "left" : "right"} />
          </button>
        </div>
      </div>
      <div ref={rail} className="rail">
        {current.products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      {dir === "left" ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}
