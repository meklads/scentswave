"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, Locale } from "@/lib/types";

type StoreState = {
  locale: Locale;
  cart: CartItem[];
  wishlist: string[];
  setLocale: (locale: Locale) => void;
  addToCart: (slug: string, quantity?: number) => void;
  setQty: (slug: string, quantity: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  cartCount: number;
};

const StoreContext = createContext<StoreState | null>(null);
const KEY = "scentswave-store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<StoreState>;
      if (parsed.locale === "en" || parsed.locale === "ar") {
        setLocaleState(parsed.locale);
      }
      if (Array.isArray(parsed.cart)) setCart(parsed.cart);
      if (Array.isArray(parsed.wishlist)) setWishlist(parsed.wishlist);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ locale, cart, wishlist }));
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale, cart, wishlist]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const addToCart = useCallback((slug: string, quantity = 1) => {
    setCart((prev) => {
      const found = prev.find((item) => item.slug === slug);
      if (found) {
        return prev.map((item) =>
          item.slug === slug
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { slug, quantity }];
    });
  }, []);

  const setQty = useCallback((slug: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.slug !== slug)
        : prev.map((item) =>
            item.slug === slug ? { ...item, quantity } : item,
          ),
    );
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug],
    );
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      locale,
      cart,
      wishlist,
      setLocale,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      cartCount,
    }),
    [
      locale,
      cart,
      wishlist,
      setLocale,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      cartCount,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
