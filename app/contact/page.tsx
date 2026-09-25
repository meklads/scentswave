"use client";

import { PageIntro } from "@/components/PageIntro";
import { t } from "@/lib/i18n";
import { EMAIL, PHONE_DISPLAY } from "@/lib/format";
import { useStore } from "@/components/store";

export default function ContactPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div>
      <PageIntro kicker={copy.customerCare} title={copy.contact} body={`${copy.customerService} · ${copy.hours}`} />
      <div className="wrap grid gap-14 pb-20 md:grid-cols-2 md:gap-20">
        <div className="text-center md:text-start">
          <p className="text-[15px] leading-8 text-[var(--muted)]">
            {PHONE_DISPLAY}
            <br />
            {EMAIL}
          </p>
        </div>
        <form className="space-y-5" action={`mailto:${EMAIL}`}>
          <select name="reason" className="field">
            <option>{copy.reason}</option>
            <option>{copy.account}</option>
            <option>{copy.shop}</option>
            <option>{copy.shipping}</option>
          </select>
          <input name="name" required placeholder={copy.name} className="field" />
          <input name="email" type="email" required placeholder={copy.email} className="field" />
          <input name="phone" placeholder={copy.phone} className="field" />
          <textarea name="message" rows={5} placeholder={copy.notes} className="field" />
          <button type="submit" className="cta mt-6">
            {copy.send}
          </button>
        </form>
      </div>
    </div>
  );
}
