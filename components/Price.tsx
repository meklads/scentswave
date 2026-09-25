"use client";

import { formatMoney, formatSaleShort } from "@/lib/format";
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
  const onSale = product.compareAtPrice > product.price && product.salePercent > 0;

  return (
    <p className={`price-row${size === "pdp" ? " is-pdp" : ""}`}>
      {onSale && <span className="price-cut">{formatSaleShort(product.salePercent, locale)}</span>}
      {onSale && <span className="price-was">{formatMoney(product.compareAtPrice, locale)}</span>}
      <span className="price-now">{formatMoney(product.price, locale)}</span>
    </p>
  );
}
