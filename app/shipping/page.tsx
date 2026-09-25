"use client";

import { PageIntro } from "@/components/PageIntro";
import { useStore } from "@/components/store";
import { FREE_SHIPPING_FROM, SHIPPING_FEE, formatMoney } from "@/lib/format";
import { t } from "@/lib/i18n";

export default function ShippingPage() {
  const { locale } = useStore();
  const copy = t(locale);
  return (
    <article>
      <PageIntro kicker={copy.customerCare} title={copy.shippingInfo} />
      <div className="wrap max-w-2xl pb-20 text-center leading-9 text-[var(--muted)]">
        {locale === "ar" ? (
          <div className="space-y-6">
            <p>
              الشحن داخل المملكة العربية السعودية. يصبح مجانيًا للطلبات من{" "}
              {formatMoney(FREE_SHIPPING_FROM, "ar")}، وإلا تبلغ تكلفته{" "}
              {formatMoney(SHIPPING_FEE, "ar")}.
            </p>
            <p>تُحسب التكلفة قبل الدفع. الطلبات تُجهّز خلال يوم إلى ثلاثة أيام عمل.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <p>
              We ship across Saudi Arabia. Delivery is complimentary from{" "}
              {formatMoney(FREE_SHIPPING_FROM, "en")}, otherwise {formatMoney(SHIPPING_FEE, "en")}.
            </p>
            <p>Cost is shown before payment. Orders are prepared within 1–3 business days.</p>
          </div>
        )}
      </div>
    </article>
  );
}
