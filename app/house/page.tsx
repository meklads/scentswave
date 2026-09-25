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
      <section className="wrap py-16 text-center md:py-24">
        <p className="kicker">{copy.houseOf}</p>
        <Logo variant="full" height={72} className="mx-auto mt-8 justify-center" />
        <h1 className="serif mx-auto mt-10 max-w-3xl">{copy.philosophyTitle}</h1>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-8 text-[var(--muted)]">{copy.philosophyBody}</p>
      </section>
      <section className="relative h-[56vh] min-h-[380px] bg-[var(--sand)]">
        <Image src="/images/logo/bannet1.png" alt="" fill className="object-cover" />
      </section>
      <section className="wrap grid gap-12 py-16 md:grid-cols-3 md:gap-16 md:py-24">
        {[copy.artTitle, copy.craftTitle, copy.packagingTitle].map((title, i) => (
          <div key={title} className="text-center">
            <h2 className="product-name">{title}</h2>
            <p className="mt-5 text-[14px] leading-8 text-[var(--muted)]">
              {[copy.artBody, copy.craftBody, copy.packagingBody][i]}
            </p>
          </div>
        ))}
      </section>
      <section className="border-y border-[var(--line)] py-20 text-center md:py-24">
        <p className="kicker">{copy.precious}</p>
        <p className="serif mx-auto mt-6 max-w-3xl">{copy.brandStatement}</p>
        <Link href="/shop" className="u-link mt-10 inline-block">
          {copy.discoverCollection}
        </Link>
      </section>
    </div>
  );
}
