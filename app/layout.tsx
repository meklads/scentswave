import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const sans = Tajawal({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Scents Wave — موجة عطر",
    template: "%s — Scents Wave",
  },
  description: "Official online store. Original luxury fragrances shipped across Saudi Arabia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--ink)]">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
