"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckoutUpsell } from "@/components/CheckoutUpsell";
import { QtyControl } from "@/components/QtyControl";
import { useStore } from "@/components/store";
import { getProduct, productShort, upsellProducts } from "@/lib/catalog";
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
      <div className="wrap py-20 text-center">
        <p className="kicker">{copy.houseOf}</p>
        <h1 className="serif mt-5">{copy.bagTitle}</h1>
        <p className="mt-5 text-[var(--muted)]">{copy.emptyCart}</p>
        <Link href="/shop" className="cta mt-10 inline-flex">
          {copy.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap py-12 md:py-16">
      <nav className="mb-6 text-center text-[12px] text-[var(--muted)]">
        <Link href="/">{copy.home}</Link>
        <span className="px-2">/</span>
        <span>{copy.bagTitle}</span>
      </nav>
      <h1 className="serif mb-12 text-center">{copy.bagTitle}</h1>
      <div className="hidden border-b border-[var(--line)] pb-3 text-[12px] text-[var(--muted)] md:grid md:grid-cols-[1fr_140px_160px_120px]">
        <span>{copy.productCol}</span>
        <span>{copy.priceCol}</span>
        <span>{copy.qtyCol}</span>
        <span className="text-end">{copy.totalCol}</span>
      </div>
      <ul>
        {lines.map((line) => (
          <li
            key={line.slug}
            className="grid gap-4 border-b border-[var(--line)] py-5 md:grid-cols-[1fr_140px_160px_120px] md:items-center"
          >
            <Link href={`/product/${line.slug}`} className="flex items-center gap-4">
              <span className="product-shot relative h-20 w-16 shrink-0">
                <Image src={line.product.images[0]} alt="" fill className="object-contain p-2" />
              </span>
              <span className="text-[14px] font-medium">{productShort(line.product, locale)}</span>
            </Link>
            <p className="text-[14px]">{formatMoney(line.product.price, locale)}</p>
            <div>
              <QtyControl value={line.quantity} onChange={(n) => setQty(line.slug, n)} />
              <button
                type="button"
                onClick={() => removeFromCart(line.slug)}
                className="mt-2 block text-[12px] text-[var(--muted)]"
              >
                {copy.remove}
              </button>
            </div>
            <p className="text-end text-[14px] font-medium">
              {formatMoney(line.product.price * line.quantity, locale)}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-end gap-3">
        <p className="flex w-full max-w-sm justify-between text-[14px]">
          <span>{copy.subtotal}</span>
          <span>{formatMoney(subtotal, locale)}</span>
        </p>
        <p className="flex w-full max-w-sm justify-between text-[14px] text-[var(--muted)]">
          <span>{copy.shipping}</span>
          <span>{shipping === 0 ? copy.free : formatMoney(shipping, locale)}</span>
        </p>
        <Link href="/checkout" className="cta w-full max-w-sm">
          {copy.checkout}
        </Link>
        <Link href="/shop" className="u-link">
          {copy.continueShopping}
        </Link>
      </div>
      <CheckoutUpsell products={upsellProducts(lines.map((line) => line.slug), 4)} />
    </div>
  );
}
