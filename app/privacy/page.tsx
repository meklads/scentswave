"use client";

import { useStore } from "@/components/store";
import { EMAIL } from "@/lib/format";
import { t } from "@/lib/i18n";

export default function PrivacyPage() {
  const { locale } = useStore();
  const copy = t(locale);
  return (
    <article className="wrap max-w-2xl py-12 md:py-16">
      <p className="caps">{copy.customerCare}</p>
      <h1 className="serif mt-5 text-5xl md:text-6xl">{copy.privacy}</h1>
      {locale === "ar" ? (
        <div className="mt-10 space-y-6 font-light leading-9 text-[var(--muted)]">
          <p>نجمع فقط ما يلزم لتنفيذ الطلب: الاسم، وسيلة التواصل، عنوان الشحن، وتفاصيل الطلب. لا نخزّن بيانات البطاقات.</p>
          <p>لأي طلب يتعلق ببياناتك: {EMAIL}.</p>
        </div>
      ) : (
        <div className="mt-10 space-y-6 font-light leading-9 text-[var(--muted)]">
          <p>We collect only what is needed to fulfill an order. Card details are processed by the payment provider, never stored here.</p>
          <p>Privacy requests: {EMAIL}.</p>
        </div>
      )}
    </article>
  );
}
