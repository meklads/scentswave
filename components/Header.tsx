"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

export function Header() {
  const { locale, setLocale, cartCount, wishlist } = useStore();
  const copy = t(locale);
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    setOpen(false);
    setSearch(false);
  }, [pathname]);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const query = q.trim();
    router.push(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
    setSearch(false);
  }

  const nav = [
    { href: "/shop", label: copy.shop },
    { href: "/category/men", label: copy.men },
    { href: "/category/women", label: copy.women },
    { href: "/brands", label: copy.brands },
    { href: "/category/picks", label: copy.picks },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md">
      <div className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
        <div className="lux flex h-9 items-center justify-between text-[11px] tracking-[0.14em] text-[var(--muted)]">
          <p>{copy.freeShippingBanner}</p>
          <div className="flex items-center gap-6">
            <a href="tel:+966502786513" className="hidden sm:inline hover:text-[var(--ink)]">
              050 278 6513
            </a>
            <button
              type="button"
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="hover:text-[var(--ink)]"
            >
              {copy.language}
            </button>
          </div>
        </div>
      </div>

      <div className="lux grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">
        <button
          type="button"
          className="justify-self-start md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          <MenuIcon />
        </button>
        <nav className="hidden md:flex items-center gap-8 justify-self-start text-[13px] tracking-[0.08em]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--muted)] hover:text-[var(--ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="flex items-center gap-3 justify-self-center">
          <Image
            src="/images/logo/favicon.png"
            alt={copy.storeName}
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="text-[22px] font-light tracking-wide">{copy.storeName}</span>
        </Link>

        <div className="flex items-center gap-5 justify-self-end text-[var(--ink)]">
          <button type="button" onClick={() => setSearch((v) => !v)} aria-label={copy.shop}>
            <SearchIcon />
          </button>
          <Link href="/account" aria-label={copy.account} className="hidden sm:block">
            <UserIcon />
          </Link>
          <Link href="/wishlist" className="relative" aria-label={copy.wishlist}>
            <HeartIcon />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>
          <Link href="/cart" className="relative" aria-label={copy.cart}>
            <BagIcon />
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </Link>
        </div>
      </div>

      {search && (
        <div className="border-t border-[var(--line)] bg-white">
          <form onSubmit={onSearch} className="lux py-5">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="w-full border-0 border-b border-[var(--line)] bg-transparent py-3 text-lg outline-none focus:border-[var(--ink)]"
            />
          </form>
        </div>
      )}

      {open && (
        <div className="border-t border-[var(--line)] bg-white px-6 py-8 md:hidden">
          <div className="flex flex-col gap-5 text-lg font-light">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -top-1.5 -end-2 min-w-4 h-4 rounded-full bg-[var(--ink)] px-1 text-[10px] leading-4 text-white text-center">
      {children}
    </span>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16.5 16.5 21 21" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="8" r="3" />
      <path d="M5.5 19c1.4-2.8 3.8-4.2 6.5-4.2S17.1 16.2 18.5 19" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M7 8h10l-.8 12H7.8L7 8z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  );
}
