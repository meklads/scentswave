"use client";

import { useRef, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export function ProductCarousel({
  tabs,
  bar = false,
}: {
  tabs: { id: string; label: string; products: Product[] }[];
  bar?: boolean;
}) {
  const { locale } = useStore();
  const copy = t(locale);
  const [active, setActive] = useState(tabs[0]?.id || "");
  const [page, setPage] = useState(1);
  const rail = useRef<HTMLDivElement>(null);
  const current = tabs.find((tab) => tab.id === active) || tabs[0];
  const pages = 3;

  function move(dir: number) {
    const node = rail.current;
    if (!node) return;
    const card = node.firstElementChild?.clientWidth || 280;
    const delta = (card + 16) * dir * (locale === "ar" ? -1 : 1);
    node.scrollBy({ left: delta, behavior: "smooth" });
    setPage((n) => {
      const next = n + dir;
      if (next < 1) return pages;
      if (next > pages) return 1;
      return next;
    });
  }

  if (!current) return null;

  if (!bar) {
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

  return (
    <section className="hp-section">
      <div className="wrap">
        <div className="hp-head">
          <div className="hp-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActive(tab.id);
                  setPage(1);
                  rail.current?.scrollTo({ left: 0 });
                }}
                className={`hp-tab ${active === tab.id ? "is-on" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="hp-pager">
            <button type="button" className="hp-page-btn" onClick={() => move(-1)} aria-label={copy.prev}>
              <Chevron dir={locale === "ar" ? "right" : "left"} />
            </button>
            <span>
              {page}/{pages}
            </span>
            <button type="button" className="hp-page-btn" onClick={() => move(1)} aria-label={copy.next}>
              <Chevron dir={locale === "ar" ? "left" : "right"} />
            </button>
          </div>
        </div>
        <div ref={rail} className="rail">
          {current.products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <div className="hp-track">
          <span style={{ width: `${(page / pages) * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      {dir === "left" ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}
