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
    <footer className="site-footer mt-auto">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-20">
        <Col title={copy.houseOf}>
          <Link href="/house">{copy.house}</Link>
          <Link href="/discover">{copy.discovery}</Link>
          <Link href="/journal">{copy.journal}</Link>
          <Link href="/contact">{copy.contact}</Link>
          <p className="pt-2">{copy.founding}</p>
        </Col>
        <Col title={copy.customerCare}>
          <Link href="/contact">{copy.contact}</Link>
          <Link href="/track-order">{copy.track}</Link>
          <Link href="/faq">{copy.faq}</Link>
          <Link href="/shipping">{copy.shippingInfo}</Link>
          <p>{PHONE_DISPLAY}</p>
        </Col>
        <Col title={copy.legal}>
          <Link href="/terms">{copy.terms}</Link>
          <Link href="/privacy">{copy.privacy}</Link>
        </Col>
        <div>
          <p className="caps mb-5">{copy.signUp}</p>
          <p className="text-[13px] leading-7 text-[var(--muted)]">{copy.insiderBody}</p>
          <form className="mt-6 flex items-end gap-4 border-b border-[var(--ink)]">
            <input
              type="email"
              required
              placeholder={copy.email}
              className="w-full bg-transparent py-3 text-[14px] outline-none placeholder:text-[var(--muted)]"
            />
            <button type="submit" className="caps pb-3">
              {copy.validate}
            </button>
          </form>
          <p className="caps mt-8 mb-3">{copy.followUs}</p>
          <p className="text-[13px] text-[var(--muted)]">{EMAIL}</p>
        </div>
      </div>

      <div className="border-t border-[rgba(18,18,18,0.1)]">
        <div className="wrap flex flex-col items-center gap-5 py-8 text-center">
          <Logo height={44} variant="full" className="justify-center" />
          <p className="caps text-[var(--muted)]">© {year} {copy.rights}</p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="caps mb-5">{title}</p>
      <div className="flex flex-col gap-2.5 text-[13px] leading-7 text-[var(--muted)]">
        {children}
      </div>
    </div>
  );
}
