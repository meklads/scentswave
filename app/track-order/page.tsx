"use client";

import { PageIntro } from "@/components/PageIntro";
import { t } from "@/lib/i18n";
import { useStore } from "@/components/store";
import { WHATSAPP } from "@/lib/format";

export default function TrackOrderPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div>
      <PageIntro kicker={copy.customerCare} title={copy.track} body={copy.trackHint} />
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 px-5 pb-20 text-center">
        <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("أرغب بتتبع طلبي")}`} className="cta cta-solid w-full">
          {copy.talkAdvisor}
        </a>
      </div>
    </div>
  );
}
