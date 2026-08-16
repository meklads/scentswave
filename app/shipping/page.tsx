"use client";

import { useStore } from "@/components/store";
import { FREE_SHIPPING_FROM, SHIPPING_FEE, formatMoney } from "@/lib/format";
import { t } from "@/lib/i18n";

export default function ShippingPage() {
  const { locale } = useStore();
  const copy = t(locale);
  return (
    <article className="wrap max-w-2xl py-12 md:py-16">
      <p className="caps">{copy.customerCare}</p>
      <h1 className="serif mt-5">{copy.shippingInfo}</h1>
      {locale === "ar" ? (
        <div className="mt-10 space-y-6 font-light leading-9 text-[var(--muted)]">
          <p>
            الشحن داخل المملكة العربية السعودية. يصبح مجانيًا للطلبات من{" "}
            {formatMoney(FREE_SHIPPING_FROM, "ar")}، وإلا تبلغ تكلفته{" "}
            {formatMoney(SHIPPING_FEE, "ar")}.
          </p>
          <p>تُحسب التكلفة قبل الدفع. الطلبات تُجهّز خلال يوم إلى ثلاثة أيام عمل.</p>
        </div>
      ) : (
        <div className="mt-10 space-y-6 font-light leading-9 text-[var(--muted)]">
          <p>
            We ship across Saudi Arabia. Delivery is complimentary from{" "}
            {formatMoney(FREE_SHIPPING_FROM, "en")}, otherwise {formatMoney(SHIPPING_FEE, "en")}.
          </p>
          <p>Cost is shown before payment. Orders are prepared within 1–3 business days.</p>
        </div>
      )}
    </article>
  );
}
