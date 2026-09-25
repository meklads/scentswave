"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useStore } from "@/components/store";
import { complementaryProducts, getProduct, productShort } from "@/lib/catalog";
import {
  FREE_SHIPPING_FROM,
  discountFor,
  formatMoney,
  remainingForFreeShip,
  shippingFor,
} from "@/lib/format";
import { t } from "@/lib/i18n";
import { QtyControl } from "@/components/QtyControl";

export function CartDrawer() {
  const { locale, cart, cartOpen, closeCart, setQty, removeFromCart, addToCart, coupon, setCoupon } = useStore();
  const copy = t(locale);
  const [code, setCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const lines = cart
    .map((item) => {
      const product = getProduct(item.slug);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const discount = discountFor(subtotal, coupon);
  const afterDiscount = Math.max(0, subtotal - discount);
  const shipping = shippingFor(afterDiscount);
  const remain = remainingForFreeShip(afterDiscount);
  const progress = Math.min(100, (afterDiscount / FREE_SHIPPING_FROM) * 100);
  const extras = lines[0]
    ? complementaryProducts(lines[0].product, 4).filter(
        (item) => !lines.some((line) => line.slug === item.slug),
      )
    : [];

  function onCoupon(event: FormEvent) {
    event.preventDefault();
    const ok = setCoupon(code);
    setCouponError(ok ? "" : copy.couponInvalid);
  }

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button type="button" className="drawer-scrim absolute inset-0" onClick={closeCart} aria-label={copy.close} />
      <aside className="absolute inset-y-0 end-0 flex w-full max-w-[440px] flex-col bg-white">
        <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <p className="text-[16px] font-semibold">
            {copy.bagTitle} ({cart.reduce((n, i) => n + i.quantity, 0)} {copy.items})
          </p>
          <button type="button" onClick={closeCart} className="text-[14px]">
            {copy.close}
          </button>
        </div>

        <div className="flex-1 overflow-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="py-12">
              <p className="text-[17px] font-medium">{copy.emptyCart}</p>
              <Link href="/shop" onClick={closeCart} className="cta cta-solid mt-6 inline-flex">
                {copy.continueShopping}
              </Link>
            </div>
          ) : (
            <>
              <div className="ship-bar mb-5">
                <p className="text-[13px]">
                  {remain > 0
                    ? copy.remainingShip.replace("{amount}", formatMoney(remain, locale))
                    : copy.freeShipReached}
                </p>
                <div className="ship-track">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>

              <ul>
                {lines.map((line) => (
                  <li key={line.slug} className="flex gap-3 border-b border-[var(--line)] py-4">
                    <Link href={`/product/${line.slug}`} onClick={closeCart} className="product-shot relative h-20 w-16 shrink-0">
                      <Image src={line.product.images[0]} alt="" fill className="object-contain p-1" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link href={`/product/${line.slug}`} onClick={closeCart} className="line-clamp-2 text-[14px] font-medium">
                        {productShort(line.product, locale)}
                      </Link>
                      <p className="mt-1 text-[14px] font-semibold">{formatMoney(line.product.price, locale)}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <QtyControl value={line.quantity} onChange={(n) => setQty(line.slug, n)} />
                        <button type="button" onClick={() => removeFromCart(line.slug)} className="text-[12px] text-[var(--muted)]">
                          {copy.remove}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <form onSubmit={onCoupon} className="mt-5 flex gap-2">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={copy.couponPlaceholder}
                  className="field flex-1"
                />
                <button type="submit" className="cta shrink-0 px-4">
                  {copy.applyCoupon}
                </button>
              </form>
              {couponError && <p className="mt-2 text-[12px] text-[var(--sale)]">{couponError}</p>}
              {coupon && <p className="mt-2 text-[12px] text-[var(--ship)]">{copy.couponApplied}</p>}

              <div className="coupon-card mt-4">
                <p className="text-[12px] text-[var(--muted)]">{copy.availableCoupons}</p>
                <button
                  type="button"
                  className="mt-1 text-start text-[14px] font-medium"
                  onClick={() => {
                    setCode("WAVE20");
                    setCoupon("WAVE20");
                    setCouponError("");
                  }}
                >
                  WAVE20 · {copy.couponWave}
                </button>
              </div>

              {extras.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-[14px] font-semibold">{copy.recommended}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {extras.slice(0, 3).map((product) => (
                      <div key={product.slug} className="text-center">
                        <Link href={`/product/${product.slug}`} onClick={closeCart} className="product-shot relative mx-auto block aspect-square">
                          <Image src={product.images[0]} alt="" fill className="object-contain p-1" />
                        </Link>
                        <p className="mt-2 line-clamp-2 text-[11px]">{productShort(product, locale)}</p>
                        <p className="text-[12px] font-medium">{formatMoney(product.price, locale)}</p>
                        <button type="button" className="mt-1 text-[11px] underline" onClick={() => addToCart(product.slug, 1)}>
                          {copy.add}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-[var(--line)] px-5 py-4">
            <p className="flex justify-between text-[14px]">
              <span>{copy.subtotal}</span>
              <span>{formatMoney(subtotal, locale)}</span>
            </p>
            {discount > 0 && (
              <p className="flex justify-between text-[14px] text-[var(--sale)]">
                <span>{copy.discount}</span>
                <span>-{formatMoney(discount, locale)}</span>
              </p>
            )}
            <p className="flex justify-between text-[14px] text-[var(--muted)]">
              <span>{copy.shipping}</span>
              <span>{shipping === 0 ? copy.free : formatMoney(shipping, locale)}</span>
            </p>
            <Link href="/checkout" onClick={closeCart} className="cta cta-solid mt-4 w-full">
              {copy.checkout}
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
