"use client";

import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

export default function TermsPage() {
  const { locale } = useStore();
  const copy = t(locale);
  return (
    <article className="wrap max-w-2xl py-12 md:py-16">
      <p className="caps">{copy.customerCare}</p>
      <h1 className="serif mt-5">{copy.terms}</h1>
      {locale === "ar" ? (
        <div className="mt-10 space-y-6 font-light leading-9 text-[var(--muted)]">
          <p>يمكن إرجاع أي منتج غير مفتوح بحالته الأصلية مع العبوة خلال ١٤ يومًا من التسليم. العطور المفتوحة غير قابلة للإرجاع.</p>
          <p>لا تُعاد تكلفة الشحن إلا إذا وقع خطأ من موجة عطر. منتجات العروض نهائية.</p>
          <p>يمكن الطلب كضيف أو بحساب. بتقديم الطلب فإنك توافق على هذه الشروط.</p>
        </div>
      ) : (
        <div className="mt-10 space-y-6 font-light leading-9 text-[var(--muted)]">
          <p>Unopened products may be returned in original packaging within 14 days. Opened fragrances cannot be returned.</p>
          <p>Outbound shipping is not refunded unless Scents Wave made an error. Sale items are final.</p>
          <p>You may order as a guest. Placing an order means you accept these terms.</p>
        </div>
      )}
    </article>
  );
}
