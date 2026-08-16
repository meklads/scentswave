"use client";

import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/catalog";
import { EMAIL, PHONE_DISPLAY } from "@/lib/format";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";
import { brandName } from "@/lib/catalog";

export function Footer() {
  const { locale } = useStore();
  const copy = t(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--ink)] text-[var(--cream)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <p className="font-[family-name:var(--font-display)] text-2xl">
            {copy.storeName}
          </p>
          <p className="text-sm text-white/70 leading-7">{copy.footerAbout}</p>
        </div>
        <div>
          <p className="mb-3 text-sm tracking-wide text-[var(--gold)]">
            {copy.customerService}
          </p>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            <Link href="/contact">{copy.contact}</Link>
            <Link href="/faq">{copy.faq}</Link>
            <Link href="/shipping">{copy.shippingInfo}</Link>
            <Link href="/track-order">{copy.track}</Link>
            <Link href="/terms">{copy.terms}</Link>
            <Link href="/privacy">{copy.privacy}</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm tracking-wide text-[var(--gold)]">
            {copy.brands}
          </p>
          <div className="flex flex-col gap-2 text-sm text-white/80">
            {brands.slice(0, 8).map((brand) => (
              <Link key={brand.slug} href={`/category/${brand.slug}`}>
                {brandName(brand, locale)}
              </Link>
            ))}
            <Link href="/brands">{copy.allBrands}</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm tracking-wide text-[var(--gold)]">
            {copy.newsletter}
          </p>
          <p className="mb-4 text-sm text-white/70">{copy.newsletterHint}</p>
          <form className="flex gap-2" action="/contact">
            <input
              type="email"
              required
              placeholder={copy.email}
              className="w-full rounded-full bg-white/10 px-4 py-2 text-sm outline-none"
            />
            <button className="rounded-full bg-[var(--gold)] px-4 py-2 text-sm text-[var(--ink)]">
              {copy.subscribe}
            </button>
          </form>
          <p className="mt-6 text-sm text-white/70">
            {copy.hours}
            <br />
            {PHONE_DISPLAY}
            <br />
            {EMAIL}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Image
              src="/images/ui/Mada_Logo-1.svg"
              alt="Mada"
              width={54}
              height={24}
              className="h-6 w-auto invert"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {year} Scents Wave · {copy.rights}
      </div>
    </footer>
  );
}
