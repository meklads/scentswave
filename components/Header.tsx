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
    { href: "/category/picks", label: copy.gifts },
    { href: "/house", label: copy.house },
  ];

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="wrap grid h-[88px] grid-cols-[auto_1fr_auto] items-center gap-4 md:h-[100px]">
        <div className="flex items-center gap-3">
          <button type="button" className="header-icon lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
            <Bars />
          </button>
          <Logo variant="original" height={68} />
        </div>
        <nav className="hidden items-center justify-center gap-6 xl:gap-9 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5 justify-self-end">
          <button
            type="button"
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            className="header-meta hidden sm:flex"
          >
            {locale === "ar" ? "AR" : "EN"} / {copy.sar}
          </button>
          <button type="button" className="header-icon" onClick={() => setSearch((v) => !v)} aria-label="search">
            <Search />
          </button>
          <Link href="/contact" aria-label={copy.stores} className="header-icon hidden sm:grid">
            <Pin />
          </Link>
          <Link href="/account" aria-label={copy.account} className="header-icon hidden sm:grid">
            <User />
          </Link>
          <button type="button" onClick={openCart} className="header-icon relative" aria-label={copy.cart}>
            <Bag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -end-2 min-w-3 text-center text-[10px] text-[#f4efe6]">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
      {search && (
        <form onSubmit={onSearch} className="border-t border-white/15">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={copy.searchPlaceholder}
            className="wrap w-full bg-transparent py-5 text-[15px] text-white outline-none placeholder:text-white/40"
          />
        </form>
      )}
      {open && (
        <div className="border-t border-white/15 px-5 py-8 lg:hidden">
          <div className="flex flex-col gap-5 text-[15px] font-medium">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            <button type="button" className="text-start" onClick={() => setLocale(locale === "ar" ? "en" : "ar")}>
              🇸🇦 / {copy.sar}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Bars() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function Search() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16 21 21" />
    </svg>
  );
}
function Pin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="1.8" />
    </svg>
  );
}
function User() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="8" r="2.6" />
      <path d="M6 19c1.2-2.5 3.4-3.8 6-3.8s4.8 1.3 6 3.8" />
    </svg>
  );
}
function Bag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M7 8h10l-.6 11H7.6L7 8z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  );
}
