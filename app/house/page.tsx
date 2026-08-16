"use client";

import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

export default function HousePage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div>
      <section className="wrap py-12 text-center md:py-16">
        <Logo variant="full" height={88} className="justify-center" />
        <h1 className="serif mx-auto mt-8 max-w-2xl text-4xl md:text-5xl">{copy.philosophyTitle}</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">{copy.philosophyBody}</p>
      </section>
      <section className="relative h-[50vh] min-h-[360px] bg-[var(--paper)]">
        <Image src="/images/logo/baner1.png" alt="" fill className="object-cover" />
      </section>
      <section className="wrap grid gap-10 py-12 md:grid-cols-3 md:py-16">
        {[copy.artTitle, copy.craftTitle, copy.packagingTitle].map((title, i) => (
          <div key={title}>
            <h2 className="serif text-2xl">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              {[copy.artBody, copy.craftBody, copy.packagingBody][i]}
            </p>
          </div>
        ))}
      </section>
      <section className="bg-[var(--paper)] py-16 text-center">
        <p className="serif mx-auto max-w-2xl text-3xl italic md:text-4xl">{copy.brandStatement}</p>
        <Link href="/shop" className="u-link mt-8 inline-block">
          {copy.discoverCollection}
        </Link>
      </section>
    </div>
  );
}
