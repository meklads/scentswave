"use client";

import { useStore } from "@/components/store";

const FAQ = {
  ar: [
    {
      q: "كيف أنشئ حسابًا؟",
      a: "أدخل اسمك وتاريخ ميلادك وبريدك وكلمة مرور، ثم وافق على الشروط وسياسة الخصوصية. يمكنك الطلب أيضًا كضيف.",
    },
    {
      q: "ما طرق الدفع؟",
      a: "مدى وفيزا وماستركارد عبر PayTabs، والدفع نقدًا عند الاستلام برسوم 15 ريالًا.",
    },
    {
      q: "هل العطور أصلية؟",
      a: "نعم. موجة عطر تبيع عطورًا أصلية 100٪ من دور العطور العالمية.",
    },
    {
      q: "كيف أتواصل معكم؟",
      a: "واتساب 0502786513، البريد info@scentswave.com، من 10 صباحًا حتى 10 مساءً بتوقيت السعودية.",
    },
  ],
  en: [
    {
      q: "How do I create an account?",
      a: "Enter your name, date of birth, email and password, then accept the terms. Guest checkout is also available.",
    },
    {
      q: "Which payment methods do you accept?",
      a: "Mada, Visa and Mastercard via PayTabs, plus cash on delivery for SAR 15.",
    },
    {
      q: "Are the fragrances original?",
      a: "Yes. Scents Wave sells 100% original designer fragrances.",
    },
    {
      q: "How can I reach you?",
      a: "WhatsApp 0502786513 or info@scentswave.com, 10 AM to 10 PM Saudi time.",
    },
  ],
};

export default function FaqPage() {
  const { locale } = useStore();
  const items = FAQ[locale];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-10 font-[family-name:var(--font-display)] text-4xl">
        {locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}
      </h1>
      <div className="space-y-6">
        {items.map((item) => (
          <section key={item.q} className="bg-white p-6">
            <h2 className="text-lg">{item.q}</h2>
            <p className="mt-2 leading-8 text-[var(--muted)]">{item.a}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
