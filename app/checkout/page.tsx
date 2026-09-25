"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckoutUpsell } from "@/components/CheckoutUpsell";
import { useStore } from "@/components/store";
import { getProduct, productShort, upsellProducts } from "@/lib/catalog";
import {
  COD_FEE,
  GIFT_WRAP_FEE,
  WHATSAPP,
  discountFor,
  formatMoney,
  shippingFor,
} from "@/lib/format";
import { t } from "@/lib/i18n";

export default function CheckoutPage() {
  const { locale, cart, clearCart, coupon } = useStore();
  const copy = t(locale);
  const [payment, setPayment] = useState<"whatsapp" | "cod">("whatsapp");
  const [gift, setGift] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const lines = cart
    .map((item) => {
      const product = getProduct(item.slug);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const suggestions = upsellProducts(lines.map((line) => line.slug), 3);
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );
  const discount = discountFor(subtotal, coupon);
  const afterDiscount = Math.max(0, subtotal - discount);
  const shipping = shippingFor(afterDiscount);
  const wrap = gift ? GIFT_WRAP_FEE : 0;
  const cod = payment === "cod" ? COD_FEE : 0;
  const total = afterDiscount + shipping + wrap + cod;

  const summary = useMemo(() => {
    return lines
      .map(
        (line) =>
          `${productShort(line.product, "ar")} x${line.quantity} — ${line.product.price}`,
      )
      .join("\n");
  }, [lines]);

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="serif">
          {locale === "ar" ? "تم استلام طلبك" : "Order received"}
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          {copy.orderNumber}: {done}
        </p>
        <Link href="/shop" className="cta mt-8 inline-flex">
          {copy.continueShopping}
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p>{copy.emptyCart}</p>
        <Link href="/shop" className="cta cta-ghost mt-8 inline-flex">
          {copy.continueShopping}
        </Link>
      </div>
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = `SW-${Date.now().toString().slice(-8)}`;
    const first = String(data.get("firstName") || "");
    const last = String(data.get("lastName") || "");
    const name = `${first} ${last}`.trim() || String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const city = String(data.get("city") || "");
    const address = String(data.get("address") || "");
    const message = [
      `طلب جديد ${id}`,
      `الاسم: ${name}`,
      `الجوال: ${phone}`,
      `المدينة: ${city}`,
      `العنوان: ${address}`,
      `الدفع: ${payment === "cod" ? "عند الاستلام" : "واتساب"}`,
      gift ? "تغليف هدية: نعم" : "تغليف هدية: لا",
      coupon ? `كوبون: ${coupon}` : "",
      summary,
      `الإجمالي: ${total} SAR`,
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    clearCart();
    setDone(id);
  }

  return (
    <div className="wrap grid gap-10 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-10">
      <form onSubmit={onSubmit} className="space-y-8">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[17px] font-medium">{copy.contactInfo}</h2>
            <p className="text-[12px] text-[var(--muted)]">{copy.guestHint}</p>
          </div>
          <input name="email" type="email" placeholder={copy.email} className="field" />
          <input name="phone" required placeholder={copy.phone} className="field mt-3" />
        </section>

        <section>
          <h2 className="mb-3 text-[17px] font-medium">{copy.delivery}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="firstName" required placeholder={copy.firstName} className="field" />
            <input name="lastName" required placeholder={copy.lastName} className="field" />
          </div>
          <input name="city" required placeholder={copy.city} className="field mt-3" />
          <textarea name="address" required placeholder={copy.address} className="field mt-3" rows={2} />
          <label className="mt-3 flex items-start gap-3 text-[13px]">
            <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="mt-0.5" />
            <span>
              <span className="block font-medium">{copy.giftWrap}</span>
              <span className="text-[var(--muted)]">
                {copy.giftWrapHint} · {formatMoney(GIFT_WRAP_FEE, locale)}
              </span>
            </span>
          </label>
        </section>

        <section>
          <h2 className="mb-3 text-[17px] font-medium">{copy.shippingMethod}</h2>
          <div className="flex items-center justify-between border border-[var(--line)] px-4 py-3 text-[14px]">
            <span>{copy.fastShip}</span>
            <span>{shipping === 0 ? copy.free : formatMoney(shipping, locale)}</span>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-[17px] font-medium">{copy.payment}</h2>
          <label className="flex items-center gap-2 border border-[var(--line)] px-4 py-3 text-[14px]">
            <input
              type="radio"
              checked={payment === "whatsapp"}
              onChange={() => setPayment("whatsapp")}
            />
            {copy.payWhatsapp}
          </label>
          <label className="mt-2 flex items-center gap-2 border border-[var(--line)] px-4 py-3 text-[14px]">
            <input
              type="radio"
              checked={payment === "cod"}
              onChange={() => setPayment("cod")}
            />
            {copy.payCod}
          </label>
        </section>

        <button className="cta w-full">{copy.orderWhatsapp}</button>
        <p className="text-center text-[12px] text-[var(--muted)]">{copy.secureNote}</p>
      </form>

      <aside className="panel h-fit text-sm">
        {lines.map((line) => (
          <div key={line.slug} className="flex items-center gap-3 border-b border-[var(--line)] py-3">
            <span className="product-shot relative h-14 w-12 shrink-0">
              <span className="absolute -top-2 -end-2 z-10 grid h-5 min-w-5 place-items-center border border-[var(--ink)] bg-[var(--ivory)] text-[10px]">
                {line.quantity}
              </span>
              <Image src={line.product.images[0]} alt="" fill className="object-contain p-1.5" />
            </span>
            <p className="min-w-0 flex-1 line-clamp-2 text-[13px]">
              {productShort(line.product, locale)}
            </p>
            <span className="text-[13px]">{formatMoney(line.product.price * line.quantity, locale)}</span>
          </div>
        ))}
        <p className="mt-4 flex justify-between text-[13px]">
          <span>{copy.subtotal}</span>
          <span>{formatMoney(subtotal, locale)}</span>
        </p>
        {discount > 0 && (
          <p className="flex justify-between text-[13px] text-[var(--sale)]">
            <span>{copy.discount} {coupon}</span>
            <span>-{formatMoney(discount, locale)}</span>
          </p>
        )}
        <p className="flex justify-between text-[13px]">
          <span>{copy.shipping}</span>
          <span>{shipping === 0 ? copy.free : formatMoney(shipping, locale)}</span>
        </p>
        {gift && (
          <p className="flex justify-between text-[13px]">
            <span>{copy.giftWrap}</span>
            <span>{formatMoney(wrap, locale)}</span>
          </p>
        )}
        {cod > 0 && (
          <p className="flex justify-between text-[13px]">
            <span>COD</span>
            <span>{formatMoney(cod, locale)}</span>
          </p>
        )}
        <p className="mt-3 flex justify-between border-t border-[var(--line)] pt-3 text-[16px] font-medium">
          <span>{copy.total}</span>
          <span>{formatMoney(total, locale)}</span>
        </p>
        <CheckoutUpsell products={suggestions} />
      </aside>
    </div>
  );
}
