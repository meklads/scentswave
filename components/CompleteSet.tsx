"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { productShort } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/types";

export function CompleteSet({
  product,
  pair,
}: {
  product: Product;
  pair: Product;
}) {
  const { locale, addToCart } = useStore();
  const copy = t(locale);

  return (
    <section className="band band-paper py-6 md:py-10">
      <div className="wrap">
        <div className="complete-set">
          <p className="pdp-brand">{copy.completeSet}</p>
          <div className="mt-4 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto] md:gap-6">
            <SetItem product={product} />
            <span className="hidden text-center text-lg text-[#bbb] md:block">+</span>
            <SetItem product={pair} />
            <div className="flex flex-col items-start gap-2 md:items-end">
              <p className="price-now">{formatMoney(product.price + pair.price, locale)}</p>
              <button
                type="button"
                className="pdp-atc pdp-atc-mini"
                onClick={() => {
                  addToCart(product.slug, 1);
                  addToCart(pair.slug, 1);
                }}
              >
                {copy.addBoth}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SetItem({ product }: { product: Product }) {
  const { locale } = useStore();

  return (
    <Link href={`/product/${product.slug}`} className="flex items-center gap-3">
      <span className="product-shot relative h-20 w-16 shrink-0">
        <Image src={product.images[0]} alt="" fill className="object-contain p-2" />
      </span>
      <span>
        <span className="block text-[13px] font-medium leading-snug">
          {productShort(product, locale)}
        </span>
        <span className="price-now mt-1 block text-[16px]">
          {formatMoney(product.price, locale)}
        </span>
      </span>
    </Link>
  );
}
