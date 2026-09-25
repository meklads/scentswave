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
        <div className="wrap grid gap-6 py-8 text-center sm:grid-cols-2 sm:gap-8 sm:py-12 lg:grid-cols-4">
          {[copy.promiseShip, copy.promiseCare, copy.promiseGift, copy.promiseOrigin].map((item) => (
            <p key={item} className="footer-promise">
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="wrap grid gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-16 lg:grid-cols-4 lg:gap-12 lg:py-20">
        <Col title={copy.shop}>
          <Link href="/shop">{copy.fragrances}</Link>
          <Link href="/category/men">{copy.men}</Link>
          <Link href="/category/women">{copy.women}</Link>
          <Link href="/category/samples">{copy.samples}</Link>
          <Link href="/collections">{copy.collections}</Link>
        </Col>
        <Col title={copy.discovery}>
          <Link href="/category/samples">{copy.samples}</Link>
          <Link href="/sets">{copy.discoverySets}</Link>
          <Link href="/discover">{copy.findScent}</Link>
          <Link href="/contact">{copy.talkAdvisor}</Link>
          <Link href="/house">{copy.house}</Link>
        </Col>
        <Col title={copy.customerCare}>
          <Link href="/shipping">{copy.shippingInfo}</Link>
          <Link href="/terms">{copy.returns}</Link>
          <Link href="/faq">{copy.faq}</Link>
          <Link href="/contact">{copy.contact}</Link>
          <p>{PHONE_DISPLAY}</p>
        </Col>
        <div>
          <p className="footer-label">{copy.signUp}</p>
          <p className="mt-4 text-[14px] leading-8 text-[var(--on-black-soft)]">{copy.insiderBody}</p>
          <form className="footer-subscribe mt-7 flex items-end gap-4">
            <input
              type="email"
              required
              placeholder={copy.email}
              className="w-full bg-transparent py-3 text-[14px] outline-none placeholder:text-[var(--on-black-soft)]"
            />
            <button type="submit" className="footer-label pb-3">
              {copy.validate}
            </button>
          </form>
          <p className="footer-label mt-10 mb-3">{copy.followUs}</p>
          <p className="text-[14px] text-[var(--on-black-soft)]">{EMAIL}</p>
          <p className="footer-label mt-8 mb-3">{copy.legal}</p>
          <div className="flex flex-col gap-3 text-[15px] leading-7 text-[var(--on-black-soft)]">
            <Link href="/privacy">{copy.privacy}</Link>
            <Link href="/terms">{copy.terms}</Link>
          </div>
        </div>
      </div>

      <div className="footer-end">
        <div className="wrap flex flex-col items-center gap-5 py-8 text-center md:gap-6 md:py-12">
          <Logo height={56} variant="original" className="justify-center" />
          <p className="max-w-md text-[13px] leading-7 text-[var(--on-black-soft)]">{copy.founding}</p>
          <p className="max-w-lg text-[12px] leading-7 text-[var(--on-black-soft)]">{copy.authenticityBody}</p>
          <p className="footer-label">© {year} {copy.rights}</p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="footer-label mb-6">{title}</p>
      <div className="flex flex-col gap-3 text-[15px] leading-7 text-[var(--on-black-soft)]">
        {children}
      </div>
    </div>
  );
}
