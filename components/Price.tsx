"use client";

import { formatMoney } from "@/lib/format";
import type { Locale, Product } from "@/lib/types";

export function Price({
  product,
  locale,
  size = "card",
}: {
  product: Product;
  locale: Locale;
  size?: "card" | "pdp";
}) {
  const onSale = product.compareAtPrice > product.price;
  const priceClass = size === "pdp" ? "text-[22px] font-medium" : "text-[15px] font-medium";
  const oldClass = size === "pdp" ? "text-[14px]" : "text-[12px]";

  return (
    <p className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${size === "card" ? "justify-center" : ""}`}>
      <span className={priceClass}>{formatMoney(product.price, locale)}</span>
      {onSale && (
        <span className={`${oldClass} text-[var(--muted)] line-through`}>
          {formatMoney(product.compareAtPrice, locale)}
        </span>
      )}
    </p>
  );
}
