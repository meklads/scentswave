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
  formatMoney,
  shippingFor,
} from "@/lib/format";
import { t } from "@/lib/i18n";

export default function CheckoutPage() {
  const { locale, cart, clearCart } = useStore();
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
  const shipping = shippingFor(subtotal);
  const wrap = gift ? GIFT_WRAP_FEE : 0;
  const cod = payment === "cod" ? COD_FEE : 0;
  const total = subtotal + shipping + wrap + cod;

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
        <Link href="/shop" className="cta cta-solid mt-8">
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
      `الدفع: ${payment === "cod" ? "عند الاستلام" : "واتساب"}`,
      gift ? "تغليف هدية: نعم" : "تغليف هدية: لا",
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
    <div className="wrap grid gap-8 py-8 lg:grid-cols-[1fr_360px] lg:py-10">
      <form onSubmit={onSubmit} className="space-y-3">
        <h1 className="serif">{copy.checkout}</h1>
        <p className="text-[13px] text-[var(--muted)]">{copy.guestHint}</p>
        <input name="name" required placeholder={copy.name} className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-2.5 outline-none" />
        <input name="phone" required placeholder={copy.phone} className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-2.5 outline-none" />
        <input name="email" type="email" placeholder={copy.email} className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-2.5 outline-none" />
        <input name="city" required placeholder={copy.city} className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-2.5 outline-none" />
        <textarea name="address" required placeholder={copy.address} className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-2.5 outline-none" rows={2} />
        <label className="flex items-start gap-3 border border-[var(--line)] p-3 text-[13px]">
          <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="mt-0.5" />
          <span>
            <span className="block font-medium">{copy.giftWrap}</span>
            <span className="text-[var(--muted)]">
              {copy.giftWrapHint} · {formatMoney(GIFT_WRAP_FEE, locale)}
            </span>
          </span>
        </label>
        <fieldset className="space-y-2 pt-2">
          <legend className="mb-2 text-[13px] font-medium">{copy.payment}</legend>
          <label className="flex items-center gap-2 border border-[var(--line)] p-3 text-[13px]">
            <input
              type="radio"
              checked={payment === "whatsapp"}
              onChange={() => setPayment("whatsapp")}
            />
            {copy.payWhatsapp}
          </label>
          <label className="flex items-center gap-2 border border-[var(--line)] p-3 text-[13px]">
            <input
              type="radio"
              checked={payment === "cod"}
              onChange={() => setPayment("cod")}
            />
            {copy.payCod}
          </label>
        </fieldset>
        <button className="cta cta-solid mt-2 w-full">
          {copy.orderWhatsapp}
        </button>
        <p className="text-center text-[12px] text-[var(--muted)]">{copy.secureNote}</p>
      </form>
      <aside className="h-fit bg-[var(--paper)] p-5 text-sm">
        {lines.map((line) => (
          <div key={line.slug} className="flex items-center gap-3 border-b border-[var(--line)] py-3">
            <span className="relative h-14 w-12 shrink-0 bg-white">
              <Image src={line.product.images[0]} alt="" fill className="object-contain p-1.5" />
            </span>
            <p className="min-w-0 flex-1">
              <span className="line-clamp-2 block text-[13px]">
                {productShort(line.product, locale)} × {line.quantity}
              </span>
            </p>
            <span className="text-[13px]">{formatMoney(line.product.price * line.quantity, locale)}</span>
          </div>
        ))}
        <p className="mt-4 flex justify-between text-[13px]">
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
        <p className="mt-3 flex justify-between border-t border-[var(--line)] pt-3 text-[15px] font-medium">
          <span>{copy.total}</span>
          <span>{formatMoney(total, locale)}</span>
        </p>
        <CheckoutUpsell products={suggestions} />
      </aside>
    </div>
  );
}
