"use client";

import { PageIntro } from "@/components/PageIntro";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

const FAQ = {
  ar: [
    {
      q: "هل العطور أصلية؟",
      a: "نعم. موجة عطر تختار عطورًا أصلية من دور العطور، وتعرضها كأعمال لا كسلع.",
    },
    {
      q: "ما طرق الدفع؟",
      a: "تأكيد الطلب عبر واتساب، أو الدفع عند الاستلام برسوم ١٥ ريالًا.",
    },
    {
      q: "كيف يتم الشحن؟",
      a: "داخل المملكة. يُجهّز الطلب خلال يوم إلى ثلاثة أيام عمل حسب التوفر.",
    },
    {
      q: "كيف أتواصل معكم؟",
      a: "واتساب ٠٥٠٢٧٨٦٥١٣، أو info@scentswave.com، من العاشرة صباحًا حتى العاشرة مساءً.",
    },
  ],
  en: [
    {
      q: "Are the fragrances original?",
      a: "Yes. Scents Wave selects original maisons and presents them as works, not commodities.",
    },
    {
      q: "Which payment methods do you accept?",
      a: "Confirm the order on WhatsApp, or pay cash on delivery for SAR 15.",
    },
    {
      q: "How does shipping work?",
      a: "Across Saudi Arabia. Orders are prepared within one to three business days.",
    },
    {
      q: "How can I reach you?",
      a: "WhatsApp 0502786513 or info@scentswave.com, 10:00–22:00 Saudi time.",
    },
  ],
};

export default function FaqPage() {
  const { locale } = useStore();
  const copy = t(locale);
  const items = FAQ[locale];

  return (
    <div>
      <PageIntro kicker={copy.customerCare} title={copy.faq} />
      <div className="wrap max-w-2xl pb-20">
        {items.map((item) => (
          <details key={item.q} className="acc">
            <summary>{item.q}</summary>
            <div className="acc-body">{item.a}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
