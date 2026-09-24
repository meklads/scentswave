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
    <section className="wrap py-8">
      <div className="border border-[var(--line)] p-4 md:p-5">
        <p className="kicker">{copy.completeSet}</p>
        <div className="mt-4 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto] md:gap-6">
          <SetItem product={product} />
          <span className="hidden text-center text-lg text-[var(--gold)] md:block">+</span>
          <SetItem product={pair} />
          <div className="flex flex-col items-start gap-2 md:items-end">
            <p className="text-[18px] font-medium">
              {formatMoney(product.price + pair.price, locale)}
            </p>
            <button
              type="button"
              className="cta"
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
    </section>
  );
}

function SetItem({ product }: { product: Product }) {
  const { locale } = useStore();

  return (
    <Link href={`/product/${product.slug}`} className="flex items-center gap-3">
      <span className="relative h-20 w-16 shrink-0 bg-white">
        <Image src={product.images[0]} alt="" fill className="object-contain p-2" />
      </span>
      <span>
        <span className="block text-[13px] font-medium leading-snug">
          {productShort(product, locale)}
        </span>
        <span className="mt-1 block text-[13px] text-[var(--muted)]">
          {formatMoney(product.price, locale)}
        </span>
      </span>
    </Link>
  );
}
