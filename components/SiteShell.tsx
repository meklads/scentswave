"use client";

import { usePathname } from "next/navigation";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StoreProvider } from "@/components/store";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const gated = usePathname() === "/gate";

  return (
    <StoreProvider>
      {gated ? (
        <main className="flex-1">{children}</main>
      ) : (
        <>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </>
      )}
    </StoreProvider>
  );
}
