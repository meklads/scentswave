"use client";

import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StoreProvider } from "@/components/store";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </StoreProvider>
  );
}
