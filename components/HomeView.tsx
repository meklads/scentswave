"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { brands, products } from "@/lib/catalog";
import { t } from "@/lib/i18n";

export function HomeView() {
  const { locale } = useStore();
  const copy = t(locale);
  const featured = products.filter((item) => item.featured).slice(0, 8);
  const men = products.filter((item) => item.gender === "men").slice(0, 4);
  const women = products.filter((item) => item.gender === "women").slice(0, 4);
  const [heroLine1, heroLine2] = copy.heroTitle.split("\n");

  return (
    <div>
      <section className="grid min-h-[calc(100vh-108px)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-16 md:px-16 lg:px-20">
          <p className="eyebrow mb-6">{copy.heroEyebrow}</p>
          <h1 className="display text-[42px] md:text-[64px] lg:text-[72px]">
            {heroLine1}
            {heroLine2 ? (
              <>
                <br />
                {heroLine2}
              </>
            ) : null}
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-8 text-[var(--muted)]">
            {copy.heroBody}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-dark">
              {copy.heroCta}
            </Link>
            <Link href="/category/picks" className="btn btn-line">
              {copy.picks}
            </Link>
          </div>
        </div>
        <div className="relative min-h-[420px] bg-[var(--bg-soft)]">
          <Image
            src="/images/products/full-Dior-Sauvage-Eau-de-Parfum.jpg"
            alt="Dior Sauvage"
            fill
            priority
            className="object-contain p-10 md:p-16"
            sizes="50vw"
          />
        </div>
      </section>

      <section className="border-y border-[var(--line)]">
        <div className="lux grid grid-cols-2 gap-8 py-8 md:grid-cols-4 md:py-10">
          {[copy.original, copy.fastShip, copy.cash, copy.mada].map((label) => (
            <p
              key={label}
              className="text-center text-[12px] tracking-[0.18em] text-[var(--muted)]"
            >
              {label}
            </p>
          ))}
        </div>
      </section>

      <section className="lux py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3">{copy.collections}</p>
            <h2 className="display text-4xl md:text-5xl">{copy.discover}</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Link href="/category/men" className="group relative min-h-[520px] overflow-hidden bg-[var(--bg-soft)]">
            <Image
              src="/images/products/full-Chanel-Bleu-De-For.jpg"
              alt={copy.men}
              fill
              className="object-contain p-16 transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="eyebrow mb-2">{copy.maison}</p>
              <h3 className="display text-3xl">{copy.men}</h3>
              <span className="mt-3 inline-block text-sm tracking-[0.14em] text-[var(--muted)]">
                {copy.shopMen}
              </span>
            </div>
          </Link>
          <Link href="/category/women" className="group relative min-h-[520px] overflow-hidden bg-[var(--bg-soft)]">
            <Image
              src="/images/products/full-La-vie-est-belle-LANCOME.jpg"
              alt={copy.women}
              fill
              className="object-contain p-16 transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="eyebrow mb-2">{copy.maison}</p>
              <h3 className="display text-3xl">{copy.women}</h3>
              <span className="mt-3 inline-block text-sm tracking-[0.14em] text-[var(--muted)]">
                {copy.shopWomen}
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-[var(--bg-soft)] py-24">
        <div className="lux">
          <SectionHead title={copy.picks} href="/category/picks" action={copy.viewAll} eyebrow={copy.featured} />
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="overflow-hidden py-16">
        <div className="lux mb-10">
          <p className="eyebrow">{copy.brands}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 px-8">
          {brands
            .filter((brand) => brand.logo)
            .map((brand) => (
              <Link
                key={brand.slug}
                href={`/category/${brand.slug}`}
                className="opacity-45 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={brand.logo as string}
                  alt={locale === "ar" ? brand.nameAr : brand.nameEn}
                  width={120}
                  height={44}
                  className="h-10 w-[120px] object-contain"
                />
              </Link>
            ))}
        </div>
      </section>

      <section className="lux grid gap-16 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative min-h-[460px] bg-[var(--bg-soft)]">
          <Image
            src="/images/products/full-Tom-Ford-Ombre-Leather.jpg"
            alt="Tom Ford"
            fill
            className="object-contain p-12"
          />
        </div>
        <div className="max-w-lg">
          <p className="eyebrow mb-5">{copy.maison}</p>
          <h2 className="display text-4xl md:text-5xl leading-tight">{copy.storyTitle}</h2>
          <p className="mt-6 text-[15px] leading-8 text-[var(--muted)]">{copy.storyBody}</p>
          <Link href="/shop" className="btn btn-line mt-10">
            {copy.heroCta}
          </Link>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-24">
        <div className="lux">
          <SectionHead title={copy.men} href="/category/men" action={copy.viewAll} eyebrow={copy.collections} />
          <ProductGrid products={men} />
        </div>
      </section>

      <section className="bg-[var(--bg-soft)] py-24">
        <div className="lux">
          <SectionHead title={copy.women} href="/category/women" action={copy.viewAll} eyebrow={copy.collections} />
          <ProductGrid products={women} />
        </div>
      </section>
    </div>
  );
}

function SectionHead({
  title,
  href,
  action,
  eyebrow,
}: {
  title: string;
  href: string;
  action: string;
  eyebrow: string;
}) {
  return (
    <div className="mb-12 flex items-end justify-between gap-6">
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="display text-4xl md:text-5xl">{title}</h2>
      </div>
      <Link href={href} className="text-[12px] tracking-[0.16em] text-[var(--muted)] hover:text-[var(--ink)]">
        {action}
      </Link>
    </div>
  );
}
