"use client";

import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { products } from "@/lib/catalog";
import { t } from "@/lib/i18n";

export default function WishlistPage() {
  const { locale, wishlist } = useStore();
  const copy = t(locale);
  const list = products.filter((item) => wishlist.includes(item.slug));

  return (
    <div>
      <PageIntro kicker={copy.maison} title={copy.wishlist} />
      <div className="wrap pb-20">
        {list.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-[var(--muted)]">{copy.emptyWishlist}</p>
            <Link href="/shop" className="cta mt-8 inline-flex">
              {copy.continueShopping}
            </Link>
          </div>
        ) : (
          <ProductGrid products={list} />
        )}
      </div>
    </div>
  );
}
