import { Inter, Lora } from "next/font/google";
import "./globals.css";
import DisclaimerModal from "@/components/DisclaimerModal";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Aequitas Law Partners | Full Service Law Firm | India",
  description: "Aequitas Law Partners - A full service law firm headquartered at Mumbai, India that delivers comprehensive legal solutions across diverse practice areas, with unwavering precision at every stage.",
  keywords: "corporate law, M&A lawyers, intellectual property, venture capital, legal counsel India, Mumbai lawyers",
  authors: [{ name: "Aequitas Law Partners" }],
  openGraph: {
    title: "Aequitas Law Partners - Expert Legal Counsel for Corporate clients",
    description: "Leading law firm providing strategic legal counsel in corporate law, M&A, private equity, alternative investment funds and venture capital.",
    url: "https://www.alplaw.in",
    siteName: "Aequitas Law Partners",
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Aequitas Law Partners - Expert Legal Counsel",
    description: "Strategic legal counsel for corporate and startup clients. Elevating justice in business.",
    site: "@AequitasLawALP"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.alplaw.in"
  },
  // TODO: Add Google Site Verification when setting up Search Console
  // other: {
  //   'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
  // }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Theme color */}
        <meta name="theme-color" content="#0c3065" />
        <meta name="msapplication-TileColor" content="#0c3065" />
        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Additional SEO tags */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Mumbai" />
        <meta name="industry" content="Legal Services" />
        <meta name="coverage" content="India" />
        <meta name="target" content="Corporate Clients, Startups, Entrepreneurs" />
      </head>
      <body className={`${inter.variable} ${lora.variable} antialiased smooth-scroll gpu-accelerated`}>
        <DisclaimerModal />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
