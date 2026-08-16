"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { getProduct, productShort } from "@/lib/catalog";
import { formatMoney, shippingFor } from "@/lib/format";
import { t } from "@/lib/i18n";

export default function CartPage() {
  const { locale, cart, setQty, removeFromCart } = useStore();
  const copy = t(locale);
  const lines = cart
    .map((item) => {
      const product = getProduct(item.slug);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );
  const shipping = shippingFor(subtotal);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">
          {copy.cart}
        </h1>
        <p className="mt-4 text-[var(--muted)]">{copy.emptyCart}</p>
        <Link href="/shop" className="mt-6 inline-block rounded-full bg-[var(--ink)] px-6 py-3 text-sm text-white">
          {copy.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="mb-8 font-[family-name:var(--font-display)] text-4xl">
          {copy.cart}
        </h1>
        <ul className="divide-y divide-[var(--line)] bg-white">
          {lines.map((line) => (
            <li key={line.slug} className="flex gap-4 p-4">
              <Link href={`/product/${line.slug}`} className="relative h-24 w-24 shrink-0 bg-[#f3eee7]">
                <Image
                  src={line.product.images[0]}
                  alt=""
                  fill
                  className="object-contain p-2"
                />
              </Link>
              <div className="flex-1">
                <Link href={`/product/${line.slug}`}>
                  {productShort(line.product, locale)}
                </Link>
                <p className="mt-1 text-sm">{formatMoney(line.product.price, locale)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={line.quantity}
                    onChange={(e) => setQty(line.slug, Number(e.target.value))}
                    className="w-16 rounded border border-[var(--line)] px-2 py-1 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeFromCart(line.slug)}
                    className="text-xs text-[var(--muted)]"
                  >
                    {copy.remove}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit bg-white p-6">
        <p className="flex justify-between py-2">
          <span>{copy.subtotal}</span>
          <span>{formatMoney(subtotal, locale)}</span>
        </p>
        <p className="flex justify-between py-2">
          <span>{copy.shipping}</span>
          <span>{shipping === 0 ? copy.free : formatMoney(shipping, locale)}</span>
        </p>
        <p className="mt-3 flex justify-between border-t border-[var(--line)] pt-4 text-lg">
          <span>{copy.total}</span>
          <span>{formatMoney(subtotal + shipping, locale)}</span>
        </p>
        <Link
          href="/checkout"
          className="mt-6 block rounded-full bg-[var(--ink)] py-3 text-center text-sm text-white"
        >
          {copy.checkout}
        </Link>
      </aside>
    </div>
  );
}
