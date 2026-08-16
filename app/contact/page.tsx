"use client";

import { t } from "@/lib/i18n";
import { EMAIL, PHONE_DISPLAY } from "@/lib/format";
import { useStore } from "@/components/store";

export default function ContactPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl">
          {copy.contact}
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          {copy.customerService} · {copy.hours}
        </p>
        <p className="mt-6 text-sm leading-8">
          {PHONE_DISPLAY}
          <br />
          {EMAIL}
        </p>
      </div>
      <form className="space-y-3 bg-white p-6" action={`mailto:${EMAIL}`}>
        <select name="reason" className="w-full border border-[var(--line)] px-4 py-3">
          <option>{copy.reason}</option>
          <option>{copy.account}</option>
          <option>{copy.shop}</option>
          <option>{copy.shipping}</option>
        </select>
        <input name="name" required placeholder={copy.name} className="w-full border border-[var(--line)] px-4 py-3" />
        <input name="email" type="email" required placeholder={copy.email} className="w-full border border-[var(--line)] px-4 py-3" />
        <input name="phone" placeholder={copy.phone} className="w-full border border-[var(--line)] px-4 py-3" />
        <textarea name="message" rows={5} placeholder={copy.notes} className="w-full border border-[var(--line)] px-4 py-3" />
        <button className="rounded-full bg-[var(--ink)] px-6 py-3 text-white">{copy.send}</button>
      </form>
    </div>
  );
}
