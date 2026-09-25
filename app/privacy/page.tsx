"use client";

import { PageIntro } from "@/components/PageIntro";
import { useStore } from "@/components/store";
import { EMAIL } from "@/lib/format";
import { t } from "@/lib/i18n";

export default function PrivacyPage() {
  const { locale } = useStore();
  const copy = t(locale);
  return (
    <article>
      <PageIntro kicker={copy.customerCare} title={copy.privacy} />
      <div className="wrap max-w-2xl space-y-6 pb-20 text-center leading-9 text-[var(--muted)]">
        {locale === "ar" ? (
          <>
            <p>نجمع فقط ما يلزم لتنفيذ الطلب: الاسم، وسيلة التواصل، عنوان الشحن، وتفاصيل الطلب. لا نخزّن بيانات البطاقات.</p>
            <p>لأي طلب يتعلق ببياناتك: {EMAIL}.</p>
          </>
        ) : (
          <>
            <p>We collect only what is needed to fulfill an order. Card details are never stored here.</p>
            <p>Privacy requests: {EMAIL}.</p>
          </>
        )}
      </div>
    </article>
  );
}
