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
  const [compact, setCompact] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    setOpen(false);
    setSearch(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    router.push(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop");
    setSearch(false);
  }

  const nav = [
    { href: "/shop", label: copy.fragrances },
    { href: "/category/men", label: copy.men },
    { href: "/category/women", label: copy.women },
    { href: "/category/samples", label: copy.samples },
    { href: "/sets", label: copy.discoverySets },
    { href: "/discover", label: copy.findScent },
  ];

  return (
    <div className={`sticky top-0 z-50 bg-black${compact ? " is-compact" : ""}`}>
      <p className="announce">{copy.announce}</p>
      <header className="site-header">
        <div className="wrap header-top">
          <div className="flex items-center gap-3">
            <button type="button" className="header-icon lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="menu">
              <Bars />
            </button>
            <button
              type="button"
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="header-meta hidden sm:flex"
            >
              🇸🇦 {locale === "ar" ? "AR" : "EN"}
            </button>
          </div>
          <Logo variant="original" crop className="justify-self-center" />
          <div className="flex items-center gap-2 justify-self-end sm:gap-3">
            <button type="button" className="header-icon" onClick={() => setSearch((v) => !v)} aria-label="search">
              <Search />
            </button>
            <Link href="/account" aria-label={copy.account} className="header-icon hidden sm:grid">
              <User />
            </Link>
            <button type="button" onClick={openCart} className="header-icon relative" aria-label={copy.cart}>
              <Bag />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -end-1 min-w-3 text-center text-[10px]">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
        <nav className="header-nav">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        {search && (
          <form onSubmit={onSearch} className="header-search">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="wrap w-full bg-transparent py-5 text-[15px] outline-none placeholder:text-[var(--on-black-soft)]"
            />
          </form>
        )}
        {open && (
          <div className="header-search px-5 py-8 lg:hidden">
            <div className="flex flex-col gap-5">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link w-fit">
                  {item.label}
                </Link>
              ))}
              <button type="button" className="header-meta text-start" onClick={() => setLocale(locale === "ar" ? "en" : "ar")}>
                🇸🇦 / {copy.sar}
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

function Bars() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function Search() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16 21 21" />
    </svg>
  );
}
function User() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
      <circle cx="12" cy="8" r="2.6" />
      <path d="M6 19c1.2-2.5 3.4-3.8 6-3.8s4.8 1.3 6 3.8" />
    </svg>
  );
}
function Bag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
      <path d="M7 8h10l-.6 11H7.6L7 8z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  );
}
