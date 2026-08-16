"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

export default function CollectionsPage() {
  const { locale } = useStore();
  const copy = t(locale);

  const tiles = [
    { href: "/category/men", title: copy.men, img: "/images/logo/bannet1.png" },
    { href: "/category/women", title: copy.women, img: "/images/logo/bannet2.png" },
    { href: "/category/picks", title: copy.picks, img: "/images/logo/bannet3.png" },
    { href: "/shop", title: copy.fragrances, img: "/images/logo/bannet1.png" },
  ];

  return (
    <div>
      <section className="wrap py-10 md:py-14">
        <h1 className="serif text-4xl md:text-5xl">{copy.collections}</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">{copy.collectionsBody}</p>
      </section>
      <div className="wrap grid grid-cols-2 gap-4 pb-16 md:grid-cols-4 md:gap-5">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href} className="group">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--paper)]">
              <Image
                src={tile.img}
                alt={tile.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <h2 className="serif mt-3 text-xl">{tile.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
