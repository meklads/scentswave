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
      <div className="border-b border-white/10">
        <div className="wrap grid gap-8 py-12 text-center text-[13px] leading-7 sm:grid-cols-3 lg:grid-cols-5">
          <Service icon={<Truck />} text={copy.serviceDelivery} />
          <Service icon={<Phone />} text={copy.serviceCare} />
          <Service icon={<Lock />} text={copy.servicePay} />
          <Service icon={<Gift />} text={copy.serviceGift} />
          <Service icon={<Flask />} text={copy.serviceSample} />
        </div>
      </div>

      <div className="wrap py-16 text-center">
        <p className="kicker">{copy.newsletter}</p>
        <h2 className="serif mt-3 text-[#f4efe6]">{copy.newsletterTitle}</h2>
        <p className="mt-3 text-[15px] text-[#a89f93]">{copy.newsletterSub}</p>
        <form className="mx-auto mt-8 flex max-w-md items-end gap-4 border-b border-[rgba(196,163,90,0.45)]">
          <input
            type="email"
            required
            placeholder={copy.email}
            className="w-full bg-transparent py-3 text-[15px] text-[#f4efe6] outline-none placeholder:text-[#7a7368]"
          />
          <button type="submit" className="caps pb-3 text-[var(--gold-soft)]">
            {copy.validate}
          </button>
        </form>
      </div>

      <div className="wrap grid gap-10 border-t border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <Col title={copy.stores}>
          <p>{copy.ksa}</p>
          <Link href="/contact">{copy.contact}</Link>
        </Col>
        <Col title={copy.customerCare}>
          <Link href="/contact">{copy.contact}</Link>
          <Link href="/track-order">{copy.track}</Link>
          <Link href="/faq">{copy.faq}</Link>
          <Link href="/shipping">{copy.shippingInfo}</Link>
        </Col>
        <Col title={copy.legal}>
          <Link href="/terms">{copy.terms}</Link>
          <Link href="/privacy">{copy.privacy}</Link>
        </Col>
        <Col title={copy.social}>
          <p>{PHONE_DISPLAY}</p>
          <p>{EMAIL}</p>
        </Col>
      </div>

      <div className="border-t border-[rgba(196,163,90,0.22)]">
        <div className="wrap grid grid-cols-[1fr_auto_1fr] items-center py-6 text-[12px] text-[#8a8278]">
          <p>© {year} {copy.rights}</p>
          <Logo height={44} variant="original" />
          <p className="justify-self-end">{copy.ksa}</p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[15px] font-medium text-[#f4efe6]">{title}</p>
      <div className="flex flex-col gap-2.5 text-[14px] text-[#a89f93]">
        {children}
      </div>
    </div>
  );
}

function Service({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 px-2">
      <span className="text-[var(--gold)]">{icon}</span>
      <p className="text-[#d8d0c4]">{text}</p>
    </div>
  );
}

function Truck() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
      <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
      <circle cx="7" cy="17" r="1.4" />
      <circle cx="17" cy="17" r="1.4" />
    </svg>
  );
}
function Phone() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
      <path d="M7 3h10v18H7z" />
      <path d="M11 18h2" />
    </svg>
  );
}
function Lock() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
      <rect x="6" y="11" width="12" height="9" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
function Gift() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
      <path d="M4 12h16v8H4zM3 8h18v4H3z" />
      <path d="M12 8v12M12 8c0-3 4-4 4-1.5S13 8 12 8c0-3-4-4-4-1.5S11 8 12 8z" />
    </svg>
  );
}
function Flask() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
      <path d="M9 3h6M10 3v6L6 18a4 4 0 0 0 3.5 3h5A4 4 0 0 0 18 18l-4-9V3" />
    </svg>
  );
}
