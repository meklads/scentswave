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
      <div className="wrap max-w-2xl space-y-6 pb-20 leading-9 text-[var(--muted)]">
        {locale === "ar" ? (
          <>
            <p>الشحن داخل المملكة العربية السعودية فقط.</p>
            <p>
              يصبح الشحن مجانيًا للطلبات من {formatMoney(FREE_SHIPPING_FROM, "ar")}، وإلا تبلغ تكلفته{" "}
              {formatMoney(SHIPPING_FEE, "ar")}. تُحسب التكلفة قبل الدفع.
            </p>
            <p>الطلبات تُجهّز خلال يوم إلى ثلاثة أيام عمل حسب التوفر.</p>
            <p>تتبع الشحن يتم عبر واتساب برقم الطلب بعد التأكيد.</p>
            <p>إذا وصل الطلب تالفًا، تواصل معنا فورًا عبر واتساب مع صورة للعبوة.</p>
            <p>
              الإرجاع: منتج غير مفتوح خلال ١٤ يومًا. العطور المفتوحة غير قابلة للإرجاع. التفاصيل في{" "}
              <a href="/terms" className="u-link">
                الشروط
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <p>We ship across Saudi Arabia only.</p>
            <p>
              Delivery is complimentary from {formatMoney(FREE_SHIPPING_FROM, "en")}, otherwise{" "}
              {formatMoney(SHIPPING_FEE, "en")}. Cost is shown before payment.
            </p>
            <p>Orders are prepared within 1–3 business days, subject to availability.</p>
            <p>Tracking is handled on WhatsApp with your order number after confirmation.</p>
            <p>If a package arrives damaged, contact us on WhatsApp immediately with a photo of the parcel.</p>
            <p>
              Returns: unopened products within 14 days. Opened fragrances cannot be returned. See{" "}
              <a href="/terms" className="u-link">
                terms
              </a>
              .
            </p>
          </>
        )}
      </div>
    </article>
  );
}
