"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
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
    { href: "/shop", label: copy.shop },
    { href: "/collections", label: copy.collections },
    { href: "/house", label: copy.house },
    { href: "/discover", label: copy.discover },
    { href: "/journal", label: copy.journal },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--ivory)]/92 backdrop-blur-md">
      <div className="shell flex h-11 items-center justify-between text-[10px] tracking-[0.28em] uppercase text-[var(--muted)]">
        <span>{copy.tagline}</span>
        <button type="button" onClick={() => setLocale(locale === "ar" ? "en" : "ar")}>
          {copy.language}
        </button>
      </div>
      <div className="shell grid h-[84px] grid-cols-[1fr_auto_1fr] items-center border-t border-[var(--line)]">
        <div className="justify-self-start">
          <button type="button" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
            <Bars />
          </button>
          <nav className="hidden lg:flex items-center gap-9 text-[11px] tracking-[0.22em] uppercase">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-[var(--muted)] hover:text-[var(--charcoal)]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <Logo height={58} className="justify-self-center" />
        <div className="flex items-center gap-5 justify-self-end">
          <button type="button" onClick={() => setSearch((v) => !v)} aria-label="search">
            <Search />
          </button>
          <Link href="/account" aria-label={copy.account} className="hidden sm:block">
            <User />
          </Link>
          <button type="button" onClick={openCart} className="relative" aria-label={copy.cart}>
            <Bag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -end-2 text-[9px] tracking-[0.12em]">{cartCount}</span>
            )}
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
            className="shell w-full bg-transparent py-6 text-2xl font-light outline-none"
          />
        </form>
      )}
      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--ivory)] px-6 py-10 lg:hidden">
          <div className="flex flex-col gap-6 text-lg font-light tracking-[0.12em] uppercase">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Bars() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}
function Search() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="11" cy="11" r="6.2" />
      <path d="M16.2 16.2 21 21" />
    </svg>
  );
}
function User() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="8" r="2.8" />
      <path d="M5.8 19c1.3-2.6 3.6-4 6.2-4s4.9 1.4 6.2 4" />
    </svg>
  );
}
function Bag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M7.2 8h9.6l-.7 11H7.9L7.2 8z" />
      <path d="M9.2 8V7a2.8 2.8 0 0 1 5.6 0v1" />
    </svg>
  );
}
