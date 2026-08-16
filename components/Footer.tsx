"use client";

import Image from "next/image";
import Link from "next/link";
import { brandName, brands } from "@/lib/catalog";
import { EMAIL, PHONE_DISPLAY } from "@/lib/format";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export function Footer() {
  const { locale } = useStore();
  const copy = t(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-white">
      <div className="lux grid gap-12 py-20 md:grid-cols-4">
        <div className="md:col-span-1 space-y-4">
          <p className="text-2xl font-light">{copy.storeName}</p>
          <p className="max-w-xs text-sm leading-8 text-[var(--muted)]">
            {copy.footerAbout}
          </p>
        </div>
        <div>
          <p className="eyebrow mb-5">{copy.customerService}</p>
          <div className="flex flex-col gap-3 text-sm text-[var(--muted)]">
            <Link href="/contact" className="hover:text-[var(--ink)]">{copy.contact}</Link>
            <Link href="/faq" className="hover:text-[var(--ink)]">{copy.faq}</Link>
            <Link href="/shipping" className="hover:text-[var(--ink)]">{copy.shippingInfo}</Link>
            <Link href="/track-order" className="hover:text-[var(--ink)]">{copy.track}</Link>
            <Link href="/terms" className="hover:text-[var(--ink)]">{copy.terms}</Link>
            <Link href="/privacy" className="hover:text-[var(--ink)]">{copy.privacy}</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5">{copy.brands}</p>
          <div className="flex flex-col gap-3 text-sm text-[var(--muted)]">
            {brands.slice(0, 7).map((brand) => (
              <Link key={brand.slug} href={`/category/${brand.slug}`} className="hover:text-[var(--ink)]">
                {brandName(brand, locale)}
              </Link>
            ))}
            <Link href="/brands" className="hover:text-[var(--ink)]">{copy.allBrands}</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5">{copy.newsletter}</p>
          <p className="mb-5 text-sm leading-7 text-[var(--muted)]">{copy.newsletterHint}</p>
          <form className="flex border-b border-[var(--ink)]" action="/contact">
            <input
              type="email"
              required
              placeholder={copy.email}
              className="w-full bg-transparent py-2 text-sm outline-none"
            />
            <button className="text-sm tracking-[0.12em]">{copy.subscribe}</button>
          </form>
          <p className="mt-8 text-sm leading-7 text-[var(--muted)]">
            {copy.hours}
            <br />
            {PHONE_DISPLAY}
            <br />
            {EMAIL}
          </p>
          <Image
            src="/images/ui/Mada_Logo-1.svg"
            alt="Mada"
            width={52}
            height={22}
            className="mt-5 h-5 w-auto opacity-70"
          />
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <p className="lux py-5 text-[11px] tracking-[0.14em] text-[var(--muted)]">
          © {year} Scents Wave · {copy.rights}
        </p>
      </div>
    </footer>
  );
}
