"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

export function Header() {
  const { locale, setLocale, cartCount, openCart } = useStore();
  const copy = t(locale);
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    setOpen(false);
    setSearch(false);
  }, [pathname]);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    router.push(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop");
    setSearch(false);
  }

  const nav = [
    { href: "/collections", label: copy.collections },
    { href: "/shop", label: copy.fragrances },
    { href: "/category/men", label: copy.men },
    { href: "/category/women", label: copy.women },
    { href: "/house", label: copy.house },
    { href: "/category/picks", label: copy.gifts },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white">
      <div className="wrap grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center gap-4 justify-self-start">
          <button type="button" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
            <Bars />
          </button>
          <Logo height={46} className="hidden sm:inline-flex" />
        </div>
        <div className="justify-self-center">
          <Logo height={42} className="sm:hidden" />
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="caps text-[11px] text-[var(--ink)] hover:opacity-60">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 justify-self-end text-[var(--ink)]">
          <button type="button" onClick={() => setLocale(locale === "ar" ? "en" : "ar")} className="hidden items-center gap-1 text-[11px] tracking-[0.12em] uppercase sm:flex">
            {copy.ksa}
          </button>
          <button type="button" onClick={() => setSearch((v) => !v)} aria-label="search">
            <Search />
          </button>
          <Link href="/account" aria-label={copy.account} className="hidden sm:block">
            <User />
          </Link>
          <Link href="/wishlist" aria-label={copy.wishlist} className="hidden sm:block">
            <Heart />
          </Link>
          <button type="button" onClick={openCart} className="relative" aria-label={copy.cart}>
            <Bag />
            <span className="absolute -top-2 -end-2 min-w-3 text-center text-[10px]">{cartCount}</span>
          </button>
        </div>
      </div>
      {search && (
        <form onSubmit={onSearch} className="border-t border-[var(--line)]">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={copy.searchPlaceholder}
            className="wrap w-full bg-transparent py-5 text-lg outline-none"
          />
        </form>
      )}
      {open && (
        <div className="border-t border-[var(--line)] bg-white px-5 py-8 lg:hidden">
          <div className="flex flex-col gap-5 text-[13px] tracking-[0.14em] uppercase">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            <button type="button" className="text-start" onClick={() => setLocale(locale === "ar" ? "en" : "ar")}>
              {copy.language}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Bars() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function Search() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16 21 21" />
    </svg>
  );
}
function User() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="8" r="2.6" />
      <path d="M6 19c1.2-2.5 3.4-3.8 6-3.8s4.8 1.3 6 3.8" />
    </svg>
  );
}
function Heart() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 3.8C19 15.6 12 20 12 20z" />
    </svg>
  );
}
function Bag() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M7 8h10l-.6 11H7.6L7 8z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  );
}
