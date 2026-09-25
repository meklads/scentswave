import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Scents Wave — موجة عطر",
    template: "%s — Scents Wave",
  },
  description: "موجة عطر — عطور أصلية، عينات وأحجام سفر، شحن داخل المملكة العربية السعودية.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${arabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--paper)] text-[var(--ink)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Scents Wave",
              url: "https://scentswave.com",
              email: "info@scentswave.com",
              telephone: "+966502786513",
            }),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
