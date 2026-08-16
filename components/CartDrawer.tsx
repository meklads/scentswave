"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { getProduct, productShort } from "@/lib/catalog";
import { formatMoney, shippingFor } from "@/lib/format";
import { t } from "@/lib/i18n";

export function CartDrawer() {
  const { locale, cart, cartOpen, closeCart, setQty, removeFromCart } = useStore();
  const copy = t(locale);
  const lines = cart
    .map((item) => {
      const product = getProduct(item.slug);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = shippingFor(subtotal);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button type="button" className="absolute inset-0 bg-black/25" onClick={closeCart} aria-label={copy.close} />
      <aside className="absolute inset-y-0 end-0 flex w-full max-w-[420px] flex-col bg-white">
        <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-5">
          <p className="text-sm">
            {copy.bagTitle} ({cart.reduce((n, i) => n + i.quantity, 0)} {copy.items})
          </p>
          <button type="button" onClick={closeCart} className="caps">
            {copy.close}
          </button>
        </div>
        <div className="flex-1 overflow-auto px-6">
          {lines.length === 0 ? (
            <div className="py-12">
              <p className="text-[17px] font-medium">{copy.emptyCart}</p>
              <p className="mt-3 text-sm text-[var(--muted)]">{copy.bagEmptyHint}</p>
              <Link href="/shop" onClick={closeCart} className="u-link mt-6">
                {copy.continueShopping}
              </Link>
            </div>
          ) : (
            <ul>
              {lines.map((line) => (
                <li key={line.slug} className="flex gap-4 border-b border-[var(--line)] py-5">
                  <Link href={`/product/${line.slug}`} onClick={closeCart} className="relative h-24 w-20 shrink-0 bg-[var(--paper)]">
                    <Image src={line.product.images[0]} alt="" fill className="object-contain p-2" />
                  </Link>
                  <div className="flex-1">
                    <Link href={`/product/${line.slug}`} onClick={closeCart} className="text-[13px] font-normal">
                      {productShort(line.product, locale)}
                    </Link>
                    <p className="mt-1 text-sm">{formatMoney(line.product.price, locale)}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={(e) => setQty(line.slug, Number(e.target.value))}
                        className="w-12 border-b border-[var(--line)] bg-transparent py-1 text-sm outline-none"
                      />
                      <button type="button" onClick={() => removeFromCart(line.slug)} className="text-[13px] font-medium text-[var(--muted)]">
                        {copy.remove}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-[var(--line)] px-6 py-6">
            <p className="flex justify-between text-sm">
              <span>{copy.subtotal}</span>
              <span>{formatMoney(subtotal, locale)}</span>
            </p>
            <p className="mt-2 flex justify-between text-sm text-[var(--muted)]">
              <span>{copy.shipping}</span>
              <span>{shipping === 0 ? copy.free : formatMoney(shipping, locale)}</span>
            </p>
            <Link href="/checkout" onClick={closeCart} className="cta mt-5 w-full">
              {copy.checkout}
            </Link>
            <Link href="/shop" onClick={closeCart} className="u-link mt-4 w-full text-center">
              {copy.continueShopping}
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
