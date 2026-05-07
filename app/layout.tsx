import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import site from "@/data/site.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

// Helpers
const SITE_URL = site.domain.startsWith("http") ? site.domain : `https://${site.domain}`;
const SITE_NAME = site.brand;
const DEFAULT_TITLE =
  (site as any)?.seo?.homeTitle ||
  `${SITE_NAME} | Presupuesto GRATIS (${(site as any)?.year || "2026"})`;
const DEFAULT_DESCRIPTION =
  (site as any)?.seo?.homeDescription ||
  "Guías por provincia y servicio. Compara opciones y solicita presupuesto sin compromiso.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`
  },

  description: DEFAULT_DESCRIPTION,

  alternates: {
    canonical: SITE_URL
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: "es_ES"
    // Si luego añades imagen OG:
    // images: [{ url: "/og.jpg", width: 1200, height: 630, alt: SITE_NAME }]
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION
    // images: ["/og.jpg"]
  },

  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/logo.webp`,
              description: DEFAULT_DESCRIPTION,
              address: {
                "@type": "PostalAddress",
                addressCountry: "ES"
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                areaServed: "ES",
                availableLanguage: "es"
              }
            })
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
