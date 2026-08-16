"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useStore } from "@/components/store";
import { EMAIL, PHONE_DISPLAY } from "@/lib/format";
import { t } from "@/lib/i18n";

export function Footer() {
  const { locale } = useStore();
  const copy = t(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--ivory)]">
      <div className="shell py-24">
        <div className="max-w-xl">
          <Logo height={88} />
          <p className="mt-10 text-[11px] tracking-[0.42em] uppercase text-[var(--muted)]">
            Scents Wave
          </p>
          <p className="mt-2 text-lg font-light">{copy.storeName}</p>
          <p className="serif mt-10 text-3xl md:text-4xl italic text-[var(--charcoal)]">
            {copy.brandStatement}
          </p>
        </div>
        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <Col title={copy.shop}>
            <Link href="/shop">{copy.shop}</Link>
            <Link href="/collections">{copy.collections}</Link>
            <Link href="/category/men">{copy.men}</Link>
            <Link href="/category/women">{copy.women}</Link>
          </Col>
          <Col title={copy.house}>
            <Link href="/house">{copy.house}</Link>
            <Link href="/journal">{copy.journal}</Link>
            <Link href="/discover">{copy.discover}</Link>
          </Col>
          <Col title={copy.customerCare}>
            <Link href="/shipping">{copy.shippingInfo}</Link>
            <Link href="/faq">{copy.faq}</Link>
            <Link href="/track-order">{copy.track}</Link>
            <Link href="/terms">{copy.terms}</Link>
            <Link href="/privacy">{copy.privacy}</Link>
          </Col>
          <Col title={copy.contact}>
            <p>{PHONE_DISPLAY}</p>
            <p>{EMAIL}</p>
            <p>{copy.hours}</p>
            <form action="/contact" className="mt-4 border-b border-[var(--charcoal)]">
              <input name="email" type="email" required placeholder={copy.email} className="w-full bg-transparent py-2 text-sm outline-none" />
            </form>
          </Col>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <p className="shell py-6 text-[10px] tracking-[0.22em] uppercase text-[var(--muted)]">
          © {year} Scents Wave · {copy.rights}
        </p>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="caps mb-5">{title}</p>
      <div className="flex flex-col gap-3 text-sm text-[var(--muted)]">{children}</div>
    </div>
  );
}
