"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { brands, products } from "@/lib/catalog";
import { t } from "@/lib/i18n";

const HERO = [
  {
    src: "/images/banners/Scents-Wave-Final5.png",
    href: "/category/men",
  },
  {
    src: "/images/banners/Scents-Wave-Final6.png",
    href: "/category/women",
  },
  {
    src: "/images/banners/Scents-Wave-Final7.png",
    href: "/shop",
  },
];

const ADS = [
  { src: "/images/banners/AD3.jpg", href: "/category/dior" },
  { src: "/images/banners/AD4.jpg", href: "/category/chanel" },
  { src: "/images/banners/AD5.jpg", href: "/category/tom-ford" },
];

export function HomeView() {
  const { locale } = useStore();
  const copy = t(locale);
  const featured = products.filter((item) => item.featured).slice(0, 8);
  const men = products.filter((item) => item.gender === "men").slice(0, 8);
  const women = products.filter((item) => item.gender === "women").slice(0, 8);

  return (
    <div>
      <section className="grid md:grid-cols-3">
        {HERO.map((slide) => (
          <Link key={slide.src} href={slide.href} className="relative min-h-[280px] md:min-h-[420px] overflow-hidden">
            <Image
              src={slide.src}
              alt={copy.storeName}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </Link>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
        {[
          { src: "/images/ui/100-Original.svg", label: copy.original },
          { src: "/images/ui/shipping-fast-svgrepo-com.svg", label: copy.fastShip },
          { src: "/images/ui/hand-money-cash-hold-svgrepo-com.svg", label: copy.cash },
          { src: "/images/ui/Mada_Logo-1.svg", label: copy.mada },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <Image src={item.src} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-12 md:grid-cols-2">
        <Link href="/category/men" className="relative min-h-56 overflow-hidden bg-[var(--ink)] text-[var(--cream)]">
          <Image
            src="/images/banners/sw-baner-main.jpg"
            alt={copy.men}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
            <h2 className="font-[family-name:var(--font-display)] text-4xl">{copy.men}</h2>
            <span className="mt-2 text-sm tracking-wide">{copy.shopMen}</span>
          </div>
        </Link>
        <Link href="/category/women" className="relative min-h-56 overflow-hidden bg-[var(--gold-dark)] text-white">
          <Image
            src="/images/banners/ad.jpg"
            alt={copy.women}
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
            <h2 className="font-[family-name:var(--font-display)] text-4xl">{copy.women}</h2>
            <span className="mt-2 text-sm tracking-wide">{copy.shopWomen}</span>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <SectionHead title={copy.picks} href="/category/picks" action={copy.viewAll} />
        <ProductGrid products={featured} />
      </section>

      <section className="border-y border-[var(--line)] bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-4">
          {brands
            .filter((brand) => brand.logo)
            .map((brand) => (
              <Link key={brand.slug} href={`/category/${brand.slug}`} className="opacity-80 hover:opacity-100">
                <Image
                  src={brand.logo as string}
                  alt={locale === "ar" ? brand.nameAr : brand.nameEn}
                  width={110}
                  height={48}
                  className="h-12 w-[110px] object-contain"
                />
              </Link>
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHead title={copy.men} href="/category/men" action={copy.viewAll} />
        <ProductGrid products={men} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <SectionHead title={copy.women} href="/category/women" action={copy.viewAll} />
        <ProductGrid products={women} />
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-16 md:grid-cols-3">
        {ADS.map((ad) => (
          <Link key={ad.src} href={ad.href} className="relative min-h-44 overflow-hidden">
            <Image src={ad.src} alt="" fill className="object-cover" />
          </Link>
        ))}
      </section>

      <section className="relative mx-4 mb-16 overflow-hidden md:mx-auto md:max-w-6xl min-h-32">
        <Image
          src="/images/ui/top-shipping.webp"
          alt={copy.fastShip}
          fill
          className="object-cover"
        />
      </section>
    </div>
  );
}

function SectionHead({
  title,
  href,
  action,
}: {
  title: string;
  href: string;
  action: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <h2 className="font-[family-name:var(--font-display)] text-3xl">{title}</h2>
      <Link href={href} className="text-sm text-[var(--gold-dark)]">
        {action}
      </Link>
    </div>
  );
}
