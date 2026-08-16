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
      <button type="button" className="absolute inset-0 bg-[var(--charcoal)]/25" onClick={closeCart} aria-label={copy.close} />
      <aside className="absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-[var(--ivory)]">
        <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-5">
          <p className="caps">{copy.cart}</p>
          <button type="button" onClick={closeCart} className="text-[11px] tracking-[0.2em] uppercase">
            {copy.close}
          </button>
        </div>
        <div className="flex-1 overflow-auto px-6">
          {lines.length === 0 ? (
            <p className="py-16 text-sm text-[var(--muted)]">{copy.emptyCart}</p>
          ) : (
            <ul>
              {lines.map((line) => (
                <li key={line.slug} className="flex gap-4 border-b border-[var(--line)] py-5">
                  <Link href={`/product/${line.slug}`} onClick={closeCart} className="relative h-24 w-20 shrink-0 bg-[var(--cream)]">
                    <Image src={line.product.images[0]} alt="" fill className="object-contain p-2" />
                  </Link>
                  <div className="flex-1">
                    <Link href={`/product/${line.slug}`} onClick={closeCart} className="text-sm">
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
                      <button type="button" onClick={() => removeFromCart(line.slug)} className="text-[11px] tracking-[0.16em] uppercase text-[var(--muted)]">
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
              <span className="text-[var(--muted)]">{copy.subtotal}</span>
              <span>{formatMoney(subtotal, locale)}</span>
            </p>
            <p className="mt-2 flex justify-between text-sm">
              <span className="text-[var(--muted)]">{copy.shipping}</span>
              <span>{shipping === 0 ? copy.free : formatMoney(shipping, locale)}</span>
            </p>
            <Link href="/checkout" onClick={closeCart} className="cta cta-solid mt-6 w-full">
              {copy.checkout}
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
