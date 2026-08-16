"use client";

import { useStore } from "@/components/store";
import { EMAIL } from "@/lib/format";

export default function PrivacyPage() {
  const { locale } = useStore();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 leading-8">
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl">
        {locale === "ar" ? "سياسة الخصوصية" : "Privacy policy"}
      </h1>
      {locale === "ar" ? (
        <>
          <p>
            تجمع موجة عطر البيانات اللازمة لتنفيذ الطلبات: الاسم، وسيلة التواصل،
            عنوان الشحن، وتفاصيل الطلب. لا نخزّن بيانات البطاقات؛ الدفع يتم عبر
            مزود الدفع.
          </p>
          <p className="mt-4">
            لأي طلب يتعلق ببياناتك راسلنا على {EMAIL}.
          </p>
        </>
      ) : (
        <>
          <p>
            Scents Wave collects only what is needed to fulfill orders: name,
            contact details, shipping address, and order data. Card details are
            processed by the payment provider, not stored on this site.
          </p>
          <p className="mt-4">Privacy requests: {EMAIL}.</p>
        </>
      )}
    </article>
  );
}
