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
        <div className="wrap grid gap-8 py-12 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[copy.promiseShip, copy.promiseCare, copy.promiseGift, copy.promiseOrigin].map((item) => (
            <p key={item} className="footer-promise">
              {item}
            </p>
          ))}
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
          <p className="footer-label">{copy.signUp}</p>
          <p className="mt-4 text-[14px] leading-8 text-[var(--cream-mute)]">{copy.insiderBody}</p>
          <form className="footer-subscribe mt-7 flex items-end gap-4">
            <input
              type="email"
              required
              placeholder={copy.email}
              className="w-full bg-transparent py-3 text-[14px] outline-none placeholder:text-[var(--cream-mute)]"
            />
            <button type="submit" className="footer-label pb-3">
              {copy.validate}
            </button>
          </form>
          <p className="footer-label mt-10 mb-3">{copy.followUs}</p>
          <p className="text-[14px] text-[var(--cream-mute)]">{EMAIL}</p>
        </div>
      </div>

      <div className="footer-end">
        <div className="wrap flex flex-col items-center gap-6 py-12 text-center">
          <Logo height={72} variant="original" className="justify-center" />
          <p className="max-w-md text-[13px] leading-7 text-[var(--cream-mute)]">{copy.founding}</p>
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
      <div className="flex flex-col gap-3 text-[14px] leading-7 text-[var(--cream-mute)]">
        {children}
      </div>
    </div>
  );
}
