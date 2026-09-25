"use client";

import { PageIntro } from "@/components/PageIntro";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";

export default function TrackOrderPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div>
      <PageIntro
        kicker={copy.customerCare}
        title={copy.track}
        body={
          locale === "ar"
            ? "أدخل رقم الطلب والبريد لعرض حالة الشحن."
            : "Enter your order number and email to see shipping status."
        }
      />
      <form className="mx-auto max-w-md space-y-5 px-5 pb-20">
        <input placeholder={copy.orderNumber} className="field" />
        <input type="email" placeholder={copy.email} className="field" />
        <button type="button" className="cta mt-6 w-full">
          {copy.trackBtn}
        </button>
      </form>
    </div>
  );
}
