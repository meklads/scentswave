"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export function ProductCarousel({
  tabs,
  bar = false,
  title,
  href,
}: {
  tabs: { id: string; label: string; products: Product[] }[];
  bar?: boolean;
  title?: string;
  href?: string;
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
    const card = node.firstElementChild?.clientWidth || 220;
    const delta = (card + 14) * dir * (locale === "ar" ? -1 : 1);
    node.scrollBy({ left: delta, behavior: "smooth" });
    setPage((n) => {
      const next = n + dir;
      if (next < 1) return pages;
      if (next > pages) return 1;
      return next;
    });
  }

  if (!current) return null;

  const heading = (
    <div className="section-head">
      <h2>{title || current.label}</h2>
      {href && (
        <Link href={href} className="u-link mt-2">
          {copy.shopNow}
        </Link>
      )}
    </div>
  );

  const pager = (
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
  );

  return (
    <section className={bar ? "hp-section" : "wrap py-6 md:py-8"}>
      <div className={bar ? "wrap" : undefined}>
        {heading}
        {bar && tabs.length > 1 && (
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
            {pager}
          </div>
        )}
        {!bar && (
          <div className="mb-4 flex justify-end">{pager}</div>
        )}
        <div ref={rail} className="rail">
          {current.products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        {bar && (
          <div className="hp-track">
            <span style={{ width: `${(page / pages) * 100}%` }} />
          </div>
        )}
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
