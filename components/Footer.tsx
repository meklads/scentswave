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
      <div className="footer-promises">
        <div className="wrap grid gap-6 py-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          <p>{copy.promiseShip}</p>
          <p>{copy.promiseCare}</p>
          <p>{copy.promiseGift}</p>
          <p>{copy.promiseOrigin}</p>
        </div>
      </div>

      <div className="wrap grid gap-14 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-20">
        <Col title={copy.houseOf}>
          <Link href="/house">{copy.house}</Link>
          <Link href="/discover">{copy.discovery}</Link>
          <Link href="/journal">{copy.journal}</Link>
          <Link href="/contact">{copy.contact}</Link>
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
          <p className="text-[14px] leading-8 text-[var(--muted)]">{copy.insiderBody}</p>
          <form className="mt-7 flex items-end gap-4 border-b border-[var(--ink)]/25">
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
          <p className="caps mt-10 mb-3">{copy.followUs}</p>
          <p className="text-[14px] text-[var(--muted)]">{EMAIL}</p>
        </div>
      </div>

      <div className="footer-end">
        <div className="wrap flex flex-col items-center gap-6 py-10 text-center">
          <Logo height={48} variant="full" className="justify-center" />
          <p className="text-[13px] leading-7 text-[var(--muted)]">{copy.founding}</p>
          <p className="caps text-[var(--muted)]">© {year} {copy.rights}</p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="caps mb-6">{title}</p>
      <div className="flex flex-col gap-3 text-[14px] leading-7 text-[var(--muted)]">
        {children}
      </div>
    </div>
  );
}
