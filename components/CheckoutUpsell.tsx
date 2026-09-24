"use client";

import Image from "next/image";
import { useStore } from "@/components/store";
import { productShort } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export function CheckoutUpsell({ products }: { products: Product[] }) {
  const { locale, addToCart } = useStore();
  const copy = t(locale);
  if (products.length === 0) return null;

  return (
    <div className="mt-6 border-t border-[var(--line)] pt-5">
      <p className="mb-3 text-[13px] font-medium">{copy.checkoutSuggest}</p>
      <div className="grid gap-3">
        {products.map((product) => (
          <div key={product.slug} className="flex items-center gap-3">
            <span className="product-shot relative h-14 w-12 shrink-0">
              <Image src={product.images[0]} alt="" fill className="object-contain p-1.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-[13px] font-medium">
                {productShort(product, locale)}
              </p>
              <p className="text-[12px] text-[var(--muted)]">
                {formatMoney(product.price, locale)}
              </p>
            </div>
            <button
              type="button"
              className="text-[12px] font-medium text-[var(--gold-dark)]"
              onClick={() => addToCart(product.slug, 1)}
            >
              {copy.add}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
