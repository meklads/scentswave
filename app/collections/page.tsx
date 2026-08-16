"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { products } from "@/lib/catalog";
import { t } from "@/lib/i18n";

export default function CollectionsPage() {
  const { locale } = useStore();
  const copy = t(locale);
  const men = products.find((p) => p.gender === "men");
  const women = products.find((p) => p.gender === "women");
  const sign = products.find((p) => p.featured);

  const tiles = [
    { href: "/category/men", title: copy.men, img: men?.images[0] },
    { href: "/category/women", title: copy.women, img: women?.images[0] },
    { href: "/category/picks", title: copy.picks, img: sign?.images[0] },
    { href: "/shop", title: copy.shop, img: products[4]?.images[0] },
  ];

  return (
    <div>
      <section className="shell py-24 md:py-32">
        <p className="caps">{copy.collections}</p>
        <h1 className="serif mt-5 max-w-3xl text-5xl md:text-7xl">{copy.heroLine}</h1>
        <p className="mt-6 max-w-lg font-light leading-8 text-[var(--muted)]">
          {copy.philosophyBody}
        </p>
      </section>
      <div className="grid md:grid-cols-2">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href} className="group relative min-h-[60vh] overflow-hidden bg-[var(--cream)]">
            {tile.img && (
              <Image src={tile.img} alt={tile.title} fill className="img-ken object-contain p-16" />
            )}
            <div className="absolute inset-x-0 bottom-0 p-10">
              <h2 className="serif text-4xl">{tile.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
