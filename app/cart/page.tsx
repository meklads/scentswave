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
      <div className="wrap py-16 text-center">
        <p className="caps mb-4">{copy.maison}</p>
        <h1 className="serif">{copy.cart}</h1>
        <p className="mt-5 text-[var(--muted)]">{copy.emptyCart}</p>
        <Link href="/shop" className="cta cta-solid mt-10">
          {copy.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="serif mb-10">{copy.cart}</h1>
        <ul className="divide-y divide-[var(--line)]">
          {lines.map((line) => (
            <li key={line.slug} className="flex gap-5 py-6">
              <Link
                href={`/product/${line.slug}`}
                className="relative h-28 w-24 shrink-0 bg-[var(--bg-soft)]"
              >
                <Image
                  src={line.product.images[0]}
                  alt=""
                  fill
                  className="object-contain p-2"
                />
              </Link>
              <div className="flex-1">
                <Link href={`/product/${line.slug}`} className="font-light">
                  {productShort(line.product, locale)}
                </Link>
                <p className="mt-2 text-sm">{formatMoney(line.product.price, locale)}</p>
                <div className="mt-4 flex items-center gap-4">
                  <input
                    type="number"
                    min={1}
                    value={line.quantity}
                    onChange={(e) => setQty(line.slug, Number(e.target.value))}
                    className="w-16 border-b border-[var(--line)] bg-transparent py-1 text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeFromCart(line.slug)}
                    className="text-[13px] font-medium text-[var(--muted)]"
                  >
                    {copy.remove}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit bg-[var(--bg-soft)] p-8">
        <p className="flex justify-between py-2 text-sm">
          <span className="text-[var(--muted)]">{copy.subtotal}</span>
          <span>{formatMoney(subtotal, locale)}</span>
        </p>
        <p className="flex justify-between py-2 text-sm">
          <span className="text-[var(--muted)]">{copy.shipping}</span>
          <span>{shipping === 0 ? copy.free : formatMoney(shipping, locale)}</span>
        </p>
        <p className="mt-4 flex justify-between border-t border-[var(--line)] pt-5">
          <span>{copy.total}</span>
          <span>{formatMoney(subtotal + shipping, locale)}</span>
        </p>
        <Link href="/checkout" className="cta cta-solid mt-8 w-full">
          {copy.checkout}
        </Link>
      </aside>
    </div>
  );
}
