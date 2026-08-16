"use client";

import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export default function TrackOrderPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl">
        {copy.track}
      </h1>
      <p className="mb-6 text-sm text-[var(--muted)]">
        {locale === "ar"
          ? "أدخل رقم الطلب والبريد الإلكتروني للفاتورة لعرض حالة الشحن."
          : "Enter your order number and billing email to see shipping status."}
      </p>
      <form className="space-y-3 bg-white p-6">
        <input
          placeholder={copy.orderNumber}
          className="w-full border border-[var(--line)] px-4 py-3"
        />
        <input
          type="email"
          placeholder={copy.email}
          className="w-full border border-[var(--line)] px-4 py-3"
        />
        <button type="button" className="w-full rounded-full bg-[var(--ink)] py-3 text-white">
          {copy.trackBtn}
        </button>
      </form>
    </div>
  );
}
