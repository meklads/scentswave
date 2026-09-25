"use client";

import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCarousel } from "@/components/ProductCarousel";
import { SampleCard } from "@/components/SampleCard";
import { SectionHead } from "@/components/SectionHead";
import { SetCard } from "@/components/SetCard";
import { useStore } from "@/components/store";
import { products, saleProducts } from "@/lib/catalog";
import { discoverySets } from "@/lib/discovery";
import { t } from "@/lib/i18n";
import { sampleProducts } from "@/lib/samples";
import styles from "./samples.module.css";

const HOME_SETS = ["women", "niche", "signature"];

export function HomeView() {
  const { locale } = useStore();
  const copy = t(locale);
  const rank = (a: (typeof products)[number], b: (typeof products)[number]) =>
    Number(b.featured) - Number(a.featured) || a.price - b.price;
  const men = products.filter((item) => item.gender === "men").sort(rank);
  const women = products.filter((item) => item.gender === "women").sort(rank);
  const featured = products.filter((item) => item.featured);
  const trending = featured;
  const offers = saleProducts(12);
  const samples = sampleProducts.filter((item) => item.featured);
  const sets = HOME_SETS.map((id) => discoverySets.find((item) => item.id === id)).filter(
    (item): item is NonNullable<(typeof discoverySets)[number]> => Boolean(item),
  );

  const paths = [
    { href: "/category/samples", title: copy.samples, img: men[0]?.images[0] },
    { href: "/sets", title: copy.discoverySets, img: women[0]?.images[0] },
    { href: "/category/men", title: copy.men, img: men[1]?.images[0] },
    { href: "/category/women", title: copy.women, img: women[1]?.images[0] },
  ];

  return (
    <div>
      <Hero />

      <div className="band band-white">
        <div className="wrap">
          <div className="trust-row">
            {[copy.promiseShip, copy.promiseCare, copy.promiseGift, copy.promiseOrigin].map((item) => (
              <p key={item} className="trust-item">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <ProductCarousel
        tone="paper"
        title={copy.offers}
        href="/category/offers"
        tabs={[{ id: "offers", label: copy.offers, products: offers }]}
      />

      <section className="band band-white">
        <div className="wrap py-10 md:py-12">
          <SectionHead layout="bar" title={copy.startWithSet} href="/sets" action={copy.viewAll} />
          <p className="mb-5 max-w-lg text-[13px] leading-7 text-[var(--muted)]">
            {copy.startWithSetBody}
          </p>
          <div className={styles.setGrid}>
            {sets.map((set) => (
              <SetCard key={set.id} set={set} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band-paper">
        <div className="wrap py-10 md:py-12">
          <SectionHead layout="bar" title={copy.sampleNow} href="/category/samples" action={copy.viewAll} />
          <p className="mb-5 max-w-lg text-[13px] leading-7 text-[var(--muted)]">
            {copy.tryBeforeBody}
          </p>
          <div className="rail">
            {samples.map((item) => (
              <SampleCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <ProductCarousel
        bar
        tone="white"
        title={copy.bestSellers}
        href="/shop"
        tabs={[
          { id: "best", label: copy.bestSellers, products: featured.concat(trending).slice(0, 12) },
          { id: "men", label: copy.menEdit, products: men.slice(0, 12) },
          { id: "women", label: copy.womenEdit, products: women.slice(0, 12) },
        ]}
      />

      <section className="band band-paper">
        <div className="wrap py-10 md:py-12">
          <SectionHead layout="bar" title={copy.shopByCategory} href="/shop" action={copy.viewAll} />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {paths.map((item) => (
              <Link key={item.href} href={item.href} className="group category-tile text-start">
                <div className="product-shot relative aspect-square">
                  {item.img && (
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <p className="card-brand mt-3 px-1">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-paper">
        <div className="wrap grid gap-3 py-10 md:grid-cols-2 md:py-12">
          <article className="help-card">
            <h2>{copy.findScent}</h2>
            <p>{copy.findScentBody}</p>
            <Link href="/discover" className="pdp-atc pdp-atc-mini">
              {copy.findScent}
            </Link>
          </article>
          <article className="help-card">
            <h2>{copy.talkAdvisor}</h2>
            <p>{copy.consultBody}</p>
            <a href="https://wa.me/966502786513" className="pdp-atc pdp-atc-mini">
              {copy.talkAdvisor}
            </a>
          </article>
        </div>
      </section>

      <section className="band band-white">
        <div className="wrap grid gap-3 py-10 md:grid-cols-3 md:gap-4 md:py-12">
          {[
            { title: copy.tile1Title, body: copy.tile1Body, cta: copy.tile1Cta, href: "/house" },
            { title: copy.tile2Title, body: copy.tile2Body, cta: copy.tile2Cta, href: "/shipping" },
            { title: copy.tile3Title, body: copy.tile3Body, cta: copy.tile3Cta, href: "/sets" },
          ].map((tile) => (
            <article key={tile.title} className="promise-card">
              <h3 className="card-brand">{tile.title}</h3>
              <p className="mt-3 text-[13px] leading-7 text-[var(--muted)]">{tile.body}</p>
              <Link href={tile.href} className="u-link mt-4 inline-block">
                {tile.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
