"use client";

import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export default function TrackOrderPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div className="wrap max-w-lg py-12 md:py-16">
      <p className="caps">{copy.customerCare}</p>
      <h1 className="serif mt-5 text-5xl md:text-6xl">{copy.track}</h1>
      <p className="mt-6 font-light leading-8 text-[var(--muted)]">
        {locale === "ar"
          ? "أدخل رقم الطلب والبريد لعرض حالة الشحن."
          : "Enter your order number and email to see shipping status."}
      </p>
      <form className="mt-12 space-y-5">
        <input
          placeholder={copy.orderNumber}
          className="w-full border-0 border-b border-[var(--line)] bg-transparent py-3 outline-none"
        />
        <input
          type="email"
          placeholder={copy.email}
          className="w-full border-0 border-b border-[var(--line)] bg-transparent py-3 outline-none"
        />
        <button type="button" className="cta cta-solid mt-6">
          {copy.trackBtn}
        </button>
      </form>
    </div>
  );
}
