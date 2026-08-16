"use client";

import { useStore } from "@/components/store";
import { FREE_SHIPPING_FROM, SHIPPING_FEE, formatMoney } from "@/lib/format";

export default function ShippingPage() {
  const { locale } = useStore();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 leading-8">
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl">
        {locale === "ar" ? "معلومات الشحن" : "Shipping info"}
      </h1>
      {locale === "ar" ? (
        <>
          <p>
            الشحن داخل المملكة العربية السعودية. يصبح الشحن مجانيًا للطلبات التي
            تبلغ {formatMoney(FREE_SHIPPING_FROM, "ar")} أو أكثر، وإلا تبلغ
            تكلفة الشحن {formatMoney(SHIPPING_FEE, "ar")}.
          </p>
          <p className="mt-4">
            تُحسب تكلفة الشحن قبل الدفع. الطلبات تُجهّز خلال يوم إلى ثلاثة أيام
            عمل حسب التوفر.
          </p>
        </>
      ) : (
        <>
          <p>
            We ship across Saudi Arabia. Shipping is free on orders of{" "}
            {formatMoney(FREE_SHIPPING_FROM, "en")} or more, otherwise{" "}
            {formatMoney(SHIPPING_FEE, "en")}.
          </p>
          <p className="mt-4">
            Shipping is calculated before payment. Orders are prepared within
            1–3 business days depending on availability.
          </p>
        </>
      )}
    </article>
  );
}
