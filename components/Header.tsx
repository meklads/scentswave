"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";
import { PHONE_DISPLAY } from "@/lib/format";

export function Header() {
  const { locale, setLocale, cartCount, wishlist } = useStore();
  const copy = t(locale);
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const query = q.trim();
    router.push(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
    setOpen(false);
  }

  const nav = [
    { href: "/shop", label: copy.shop },
    { href: "/category/men", label: copy.men },
    { href: "/category/women", label: copy.women },
    { href: "/brands", label: copy.brands },
    { href: "/category/picks", label: copy.picks },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--cream)]/95 backdrop-blur border-b border-[var(--line)]">
      <div className="bg-[var(--ink)] text-[var(--cream)] text-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
          <p>{copy.freeShippingBanner}</p>
          <div className="flex items-center gap-4">
            <a href={`tel:+966502786513`} className="hidden sm:inline">
              {PHONE_DISPLAY}
            </a>
            <button
              type="button"
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="tracking-wide"
            >
              {copy.language}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <button
          type="button"
          className="md:hidden text-[var(--ink)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          <MenuIcon />
        </button>

        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo/favicon.png"
            alt={copy.storeName}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="leading-tight">
            <span className="block font-[family-name:var(--font-display)] text-lg text-[var(--ink)]">
              {copy.storeName}
            </span>
            <span className="block text-[10px] tracking-[0.18em] uppercase text-[var(--gold)]">
              {copy.tagline}
            </span>
          </span>
        </Link>

        <form onSubmit={onSearch} className="hidden md:flex flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={copy.searchPlaceholder}
            className="w-full rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm outline-none focus:border-[var(--gold)]"
          />
        </form>

        <nav className="flex items-center gap-3 text-sm">
          <Link href="/account" aria-label={copy.account}>
            <UserIcon />
          </Link>
          <Link href="/wishlist" className="relative" aria-label={copy.wishlist}>
            <HeartIcon />
            {wishlist.length > 0 && (
              <Badge>{wishlist.length}</Badge>
            )}
          </Link>
          <Link href="/cart" className="relative" aria-label={copy.cart}>
            <BagIcon />
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </Link>
        </nav>
      </div>

      <nav className="hidden md:block border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-8 px-4 py-3 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[var(--gold-dark)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[var(--line)] bg-[var(--cream)] px-4 py-4">
          <form onSubmit={onSearch} className="mb-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="w-full rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm"
            />
          </form>
          <div className="flex flex-col gap-3 text-sm">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
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
    <span className="absolute -top-1.5 -end-1.5 min-w-4 h-4 rounded-full bg-[var(--gold)] px-1 text-[10px] leading-4 text-white text-center">
      {children}
    </span>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19c1.5-3 4-4.5 7-4.5S17.5 16 19 19" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  );
}
