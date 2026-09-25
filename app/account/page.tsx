"use client";

import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";
import { WHATSAPP } from "@/lib/format";

export default function AccountPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div>
      <PageIntro
        kicker={copy.customerCare}
        title={copy.account}
        body={locale === "ar" ? "يمكنك إتمام الطلب كضيف دون حساب." : "You can complete an order as a guest."}
      />
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 px-5 pb-20 text-center">
        <Link href="/shop" className="cta cta-solid w-full">
          {copy.guestShop}
        </Link>
        <a href={`https://wa.me/${WHATSAPP}`} className="u-link">
          {copy.talkAdvisor}
        </a>
        <Link href="/faq" className="u-link">
          {copy.faq}
        </Link>
      </div>
    </div>
  );
}
