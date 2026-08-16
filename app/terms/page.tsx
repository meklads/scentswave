"use client";

import { useStore } from "@/components/store";

export default function TermsPage() {
  const { locale } = useStore();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 leading-8">
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl">
        {locale === "ar" ? "شروط الاستخدام" : "Terms of use"}
      </h1>
      {locale === "ar" ? (
        <>
          <p>
            يمكنك إرجاع أي منتج غير مفتوح بحالته الأصلية مع العبوة والإيصال خلال
            14 يومًا من تاريخ التسليم. لا يمكن إرجاع العطور المفتوحة أو المستخدمة.
          </p>
          <p className="mt-4">
            لا تُعاد تكلفة الشحن عند الإرجاع، إلا إذا وقع خطأ من موجة عطر. منتجات
            العروض غير قابلة للإرجاع.
          </p>
          <p className="mt-4">
            يمكنك الطلب كضيف أو بحساب. بتقديم الطلب فإنك توافق على هذه الشروط.
          </p>
        </>
      ) : (
        <>
          <p>
            Unopened products can be returned in original packaging within 14
            days of delivery. Opened or used fragrances cannot be returned.
          </p>
          <p className="mt-4">
            Outbound shipping is not refunded unless Scents Wave made an error.
            Sale items are final.
          </p>
          <p className="mt-4">
            You may order as a guest or with an account. Placing an order means
            you accept these terms.
          </p>
        </>
      )}
    </article>
  );
}
