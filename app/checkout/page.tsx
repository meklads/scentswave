"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useStore } from "@/components/store";
import { getProduct, productShort } from "@/lib/catalog";
import {
  COD_FEE,
  WHATSAPP,
  formatMoney,
  shippingFor,
} from "@/lib/format";
import { t } from "@/lib/i18n";

export default function CheckoutPage() {
  const { locale, cart, clearCart } = useStore();
  const copy = t(locale);
  const [payment, setPayment] = useState<"mada" | "cod">("mada");
  const [done, setDone] = useState<string | null>(null);

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
  const cod = payment === "cod" ? COD_FEE : 0;
  const total = subtotal + shipping + cod;

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
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">
          {locale === "ar" ? "تم استلام طلبك" : "Order received"}
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          {locale === "ar" ? "رقم الطلب" : "Order number"}: {done}
        </p>
        <Link href="/shop" className="mt-8 inline-block rounded-full bg-[var(--ink)] px-6 py-3 text-white">
          {copy.continueShopping}
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p>{copy.emptyCart}</p>
        <Link href="/shop" className="mt-6 inline-block text-[var(--gold-dark)]">
          {copy.continueShopping}
        </Link>
      </div>
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = `SW-${Date.now().toString().slice(-8)}`;
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const city = String(data.get("city") || "");
    const address = String(data.get("address") || "");
    const message = [
      `طلب جديد ${id}`,
      `الاسم: ${name}`,
      `الجوال: ${phone}`,
      `المدينة: ${city}`,
      `العنوان: ${address}`,
      `الدفع: ${payment}`,
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
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1fr_320px]">
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">
          {copy.checkout}
        </h1>
        <p className="text-sm text-[var(--muted)]">{copy.guestHint}</p>
        <input name="name" required placeholder={copy.name} className="w-full border border-[var(--line)] px-4 py-3" />
        <input name="phone" required placeholder={copy.phone} className="w-full border border-[var(--line)] px-4 py-3" />
        <input name="email" type="email" placeholder={copy.email} className="w-full border border-[var(--line)] px-4 py-3" />
        <input name="city" required placeholder={copy.city} className="w-full border border-[var(--line)] px-4 py-3" />
        <textarea name="address" required placeholder={copy.address} className="w-full border border-[var(--line)] px-4 py-3" rows={3} />
        <fieldset className="space-y-2">
          <legend className="mb-2 text-sm">{copy.payment}</legend>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={payment === "mada"}
              onChange={() => setPayment("mada")}
            />
            {copy.payMada}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={payment === "cod"}
              onChange={() => setPayment("cod")}
            />
            {copy.payCod}
          </label>
        </fieldset>
        <button className="w-full rounded-full bg-[var(--ink)] py-3 text-white">
          {copy.orderWhatsapp}
        </button>
      </form>
      <aside className="h-fit bg-white p-6 text-sm">
        {lines.map((line) => (
          <p key={line.slug} className="flex justify-between gap-3 py-2">
            <span>
              {productShort(line.product, locale)} × {line.quantity}
            </span>
            <span>{formatMoney(line.product.price * line.quantity, locale)}</span>
          </p>
        ))}
        <p className="mt-4 flex justify-between">
          <span>{copy.shipping}</span>
          <span>{shipping === 0 ? copy.free : formatMoney(shipping, locale)}</span>
        </p>
        {cod > 0 && (
          <p className="flex justify-between">
            <span>COD</span>
            <span>{formatMoney(cod, locale)}</span>
          </p>
        )}
        <p className="mt-3 flex justify-between border-t border-[var(--line)] pt-3 text-base">
          <span>{copy.total}</span>
          <span>{formatMoney(total, locale)}</span>
        </p>
      </aside>
    </div>
  );
}
