import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Hanken_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Preloader from "@/components/layout/Preloader";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import ScrollBeam from "@/components/ui/ScrollBeam";
import SiteFrame from "@/components/providers/SiteFrame";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.meta.title,
    template: `%s — ${site.name}`,
  },
  description: site.meta.description,
  keywords: ["web studio", "web design", "web development", "creative developer", "WebGL", "Next.js", "UltraSite"],
  authors: [{ name: site.name }],
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf3e9",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // enables safe-area insets on notched phones
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  description: site.meta.description,
  email: `mailto:${site.email}`,
  url: site.url,
  foundingDate: String(site.established),
  founder: site.founders.map((name) => ({ "@type": "Person", name })),
  address: { "@type": "PostalAddress", addressLocality: "Beirut", addressCountry: "LB" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="paper"
      suppressHydrationWarning
      className={`${jakarta.variable} ${hanken.variable}`}
    >
      <body>
        {/* repeat visitors skip the preloader before hydration — no flash */}
        <Script id="preloader-gate" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem('ultrasite:seen')==='1')document.documentElement.setAttribute('data-ready','true')}catch(e){}`}
        </Script>
        <Script
          id="org-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <a
          href="#main"
          className="voice-mono fixed left-4 top-4 z-[400] -translate-y-24 bg-bone px-4 py-2 !text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Preloader />
        <Nav />
        <ScrollBeam />
        <Cursor />
        <SiteFrame />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
