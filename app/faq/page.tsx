"use client";

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
      a: "مدى وفيزا وماستركارد عبر PayTabs، والدفع عند الاستلام برسوم ١٥ ريالًا.",
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
      a: "Mada, Visa and Mastercard via PayTabs, plus cash on delivery for SAR 15.",
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
    <div className="wrap max-w-3xl py-12 md:py-16">
      <p className="caps">{copy.customerCare}</p>
      <h1 className="serif mt-5 text-5xl md:text-6xl">{copy.faq}</h1>
      <div className="mt-16 space-y-12">
        {items.map((item) => (
          <section key={item.q}>
            <h2 className="serif text-2xl md:text-3xl">{item.q}</h2>
            <p className="mt-4 font-light leading-8 text-[var(--muted)]">{item.a}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
