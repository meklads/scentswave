"use client";

import { PageIntro } from "@/components/PageIntro";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

const FAQ = {
  ar: [
    {
      q: "هل العطور أصلية؟",
      a: "نعم. موجة عطر تختار عطورًا أصلية من دورها. لسنا الموزع الرسمي لهذه الدور.",
    },
    {
      q: "ما طرق الدفع؟",
      a: "تأكيد الطلب عبر واتساب، أو الدفع عند الاستلام برسوم 15 ريالًا.",
    },
    {
      q: "كيف يتم الشحن؟",
      a: "داخل المملكة. يُجهّز الطلب خلال يوم إلى ثلاثة أيام عمل حسب التوفر. الشحن مجاني من 131 ر.س، وإلا 26 ر.س.",
    },
    {
      q: "هل يمكن إرجاع العطر؟",
      a: "يمكن إرجاع المنتج غير المفتوح بحالته الأصلية خلال 14 يومًا. العطور المفتوحة غير قابلة للإرجاع. تكلفة الشحن لا تُعاد إلا إذا وقع خطأ من موجة عطر. منتجات العروض نهائية.",
    },
    {
      q: "هل تقدمون عينات؟",
      a: "نعم. قسم مسافر وعينات يضم أحجام 2 و3 و5 و10 مل حسب التوفر.",
    },
    {
      q: "ما الفرق بين العينة وديكانت وحجم السفر؟",
      a: "العينة حجم صغير للتجربة (2–3 مل). الديكانت تعبئة صغيرة (5 مل). حجم السفر أكبر قليلًا (10 مل). ليست الزجاجة الكاملة.",
    },
    {
      q: "كيف أختار عطرًا؟",
      a: "استخدم «ابحث عن عطرك» للاقتراحات، أو تحدث مع مستشار عبر واتساب.",
    },
    {
      q: "كيف أتتبع الطلب؟",
      a: "أرسل رقم الطلب على واتساب 0502786513.",
    },
    {
      q: "كيف أتواصل معكم؟",
      a: "واتساب 0502786513، أو info@scentswave.com، من العاشرة صباحًا حتى العاشرة مساءً.",
    },
  ],
  en: [
    {
      q: "Are the fragrances original?",
      a: "Yes. Scents Wave selects original fragrances from their houses. We are not the official distributor of these maisons.",
    },
    {
      q: "Which payment methods do you accept?",
      a: "Confirm the order on WhatsApp, or pay cash on delivery for SAR 15.",
    },
    {
      q: "How does shipping work?",
      a: "Across Saudi Arabia. Orders are prepared within 1–3 business days. Shipping is free from SAR 131, otherwise SAR 26.",
    },
    {
      q: "Can I return a fragrance?",
      a: "Unopened products may be returned in original condition within 14 days. Opened fragrances cannot be returned. Outbound shipping is refunded only if Scents Wave made an error. Sale items are final.",
    },
    {
      q: "Do you offer samples?",
      a: "Yes. Travel & Samples includes 2, 3, 5 and 10 ml sizes when available.",
    },
    {
      q: "What is the difference between a sample, decant and travel size?",
      a: "A sample is a small try (2–3 ml). A decant is a small fill (5 ml). Travel size is slightly larger (10 ml). None of these is the full bottle.",
    },
    {
      q: "How can I choose a fragrance?",
      a: "Use Find Your Scent for suggestions, or speak with an advisor on WhatsApp.",
    },
    {
      q: "How can I track my order?",
      a: "Send your order number on WhatsApp 0502786513.",
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
