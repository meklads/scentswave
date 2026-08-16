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
        <h1 className="serif">
          {locale === "ar" ? "تم استلام طلبك" : "Order received"}
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          {locale === "ar" ? "رقم الطلب" : "Order number"}: {done}
        </p>
        <Link href="/shop" className="cta cta-solid mt-8">
          {copy.continueShopping}
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
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
    <div className="wrap grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
      <form onSubmit={onSubmit} className="space-y-4">
        <h1 className="serif">
          {copy.checkout}
        </h1>
        <p className="text-sm text-[var(--muted)]">{copy.guestHint}</p>
        <input name="name" required placeholder={copy.name} className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 outline-none" />
        <input name="phone" required placeholder={copy.phone} className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 outline-none" />
        <input name="email" type="email" placeholder={copy.email} className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 outline-none" />
        <input name="city" required placeholder={copy.city} className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 outline-none" />
        <textarea name="address" required placeholder={copy.address} className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 outline-none" rows={3} />
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
        <button className="cta cta-solid mt-4 w-full">
          {copy.orderWhatsapp}
        </button>
      </form>
      <aside className="h-fit bg-[var(--bg-soft)] p-8 text-sm">
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
