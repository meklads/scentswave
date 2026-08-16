"use client";

import Image from "next/image";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

export default function JournalPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <article>
      <section className="wrap py-10 md:py-14">
        <p className="caps text-[var(--muted)]">{copy.journal}</p>
        <h1 className="serif mt-3 max-w-3xl text-4xl md:text-5xl">{copy.artTitle}</h1>
      </section>
      <div className="relative h-[50vh] min-h-[340px] bg-[var(--paper)]">
        <Image src="/images/banners/AD3.jpg" alt="" fill className="object-cover" />
      </div>
      <div className="wrap max-w-2xl py-12">
        <p className="text-sm leading-8 text-[var(--muted)]">{copy.philosophyBody}</p>
        <p className="mt-6 text-sm leading-8 text-[var(--muted)]">{copy.artBody}</p>
        <p className="serif mt-10 text-3xl italic">{copy.brandStatement}</p>
      </div>
    </article>
  );
}
