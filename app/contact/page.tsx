"use client";

import { t } from "@/lib/i18n";
import { EMAIL, PHONE_DISPLAY } from "@/lib/format";
import { useStore } from "@/components/store";

export default function ContactPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div className="wrap grid gap-10 py-12 md:py-16 lg:grid-cols-2">
      <div>
        <p className="caps">{copy.customerCare}</p>
        <h1 className="serif mt-5">{copy.contact}</h1>
        <p className="mt-6 max-w-sm font-light leading-8 text-[var(--muted)]">
          {copy.customerService} · {copy.hours}
        </p>
        <p className="mt-10 text-sm leading-8">
          {PHONE_DISPLAY}
          <br />
          {EMAIL}
        </p>
      </div>
      <form className="space-y-5" action={`mailto:${EMAIL}`}>
        <select name="reason" className="w-full border-0 border-b border-[var(--line)] bg-transparent py-3 outline-none">
          <option>{copy.reason}</option>
          <option>{copy.account}</option>
          <option>{copy.shop}</option>
          <option>{copy.shipping}</option>
        </select>
        <input name="name" required placeholder={copy.name} className="w-full border-0 border-b border-[var(--line)] bg-transparent py-3 outline-none" />
        <input name="email" type="email" required placeholder={copy.email} className="w-full border-0 border-b border-[var(--line)] bg-transparent py-3 outline-none" />
        <input name="phone" placeholder={copy.phone} className="w-full border-0 border-b border-[var(--line)] bg-transparent py-3 outline-none" />
        <textarea name="message" rows={5} placeholder={copy.notes} className="w-full border-0 border-b border-[var(--line)] bg-transparent py-3 outline-none" />
        <button type="submit" className="cta cta-solid mt-6">
          {copy.send}
        </button>
      </form>
    </div>
  );
}
