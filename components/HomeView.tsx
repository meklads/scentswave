"use client";

import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCarousel } from "@/components/ProductCarousel";
import { useStore } from "@/components/store";
import { products } from "@/lib/catalog";
import { t } from "@/lib/i18n";

export function HomeView() {
  const { locale } = useStore();
  const copy = t(locale);
  const men = products.filter((item) => item.gender === "men");
  const women = products.filter((item) => item.gender === "women");
  const featured = products.filter((item) => item.featured);
  const newest = [...products].slice(-12).reverse();
  const trending = products.slice(0, 12);

  const categories = [
    { href: "/shop", title: copy.fragrances, img: men[1]?.images[0] },
    { href: "/category/men", title: copy.men, img: men[0]?.images[0] },
    { href: "/category/women", title: copy.women, img: women[0]?.images[0] },
    { href: "/category/picks", title: copy.gifts, img: featured[0]?.images[0] },
  ];

  return (
    <div>
      <Hero />

      <ProductCarousel
        title={copy.newLaunches}
        href="/shop"
        tabs={[{ id: "new", label: copy.newLaunches, products: newest }]}
      />

      <ProductCarousel
        bar
        href="/shop"
        tabs={[
          { id: "fragrances", label: copy.fragrances, products: trending },
          { id: "men", label: copy.menEdit, products: men.slice(0, 12) },
          { id: "women", label: copy.womenEdit, products: women.slice(0, 12) },
        ]}
      />

      <section className="wrap py-8 md:py-10">
        <div className="section-head">
          <h2>{copy.shopByCategory}</h2>
          <Link href="/shop" className="u-link mt-2">
            {copy.shopNow}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <div className="relative aspect-square overflow-hidden bg-white">
                {item.img && (
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}
              </div>
              <p className="mt-2.5 text-center text-[13px] font-medium tracking-[0.08em]">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <ProductCarousel
        title={copy.bestSellers}
        href="/category/picks"
        tabs={[{ id: "best", label: copy.bestSellers, products: featured.concat(trending).slice(0, 12) }]}
      />

      <section className="border-y border-[var(--line)]">
        <div className="wrap grid gap-6 py-8 md:grid-cols-3 md:gap-8 md:py-10">
          {[
            { title: copy.tile1Title, body: copy.tile1Body, cta: copy.tile1Cta, href: "/house" },
            { title: copy.tile2Title, body: copy.tile2Body, cta: copy.tile2Cta, href: "/shipping" },
            { title: copy.tile3Title, body: copy.tile3Body, cta: copy.tile3Cta, href: "/category/picks" },
          ].map((tile) => (
            <article key={tile.title} className="text-center">
              <h3 className="text-[15px] font-medium tracking-[0.08em]">{tile.title}</h3>
              <p className="mt-2 text-[14px] leading-7 text-[var(--muted)]">{tile.body}</p>
              <Link href={tile.href} className="u-link mt-3">
                {tile.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
