"use client";

import Image from "next/image";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

export default function JournalPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <article>
      <section className="wrap py-14 text-center md:py-20">
        <p className="kicker">{copy.journal}</p>
        <h1 className="serif mx-auto mt-5 max-w-3xl">{copy.artTitle}</h1>
      </section>
      <div className="relative h-[50vh] min-h-[340px] bg-[var(--paper)]">
        <Image src="/images/logo/bannet3.png" alt="" fill className="object-cover" />
      </div>
      <div className="wrap max-w-2xl py-12">
        <p className="text-sm leading-8 text-[var(--muted)]">{copy.philosophyBody}</p>
        <p className="mt-6 text-sm leading-8 text-[var(--muted)]">{copy.artBody}</p>
        <p className="serif mt-10">{copy.brandStatement}</p>
      </div>
    </article>
  );
}
