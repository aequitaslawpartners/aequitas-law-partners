import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Aequitas Law Partners | Corporate & Startup Legal Services | Mumbai, Delhi, Bangalore",
  description: "Aequitas Law Partners (ALP) - Elevating justice in business through expert corporate law, startup legal services, M&A, banking & finance, and intellectual property counsel. Serving clients across Mumbai, Delhi, and Bangalore.",
  keywords: "corporate law, startup legal services, M&A lawyers, banking finance law, intellectual property, venture capital, legal counsel India, Mumbai lawyers, Delhi law firm, Bangalore legal services",
  authors: [{ name: "Aequitas Law Partners" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Aequitas Law Partners - Expert Legal Counsel for Corporate & Startup Clients",
    description: "Leading law firm providing strategic legal counsel in corporate law, startup services, M&A, banking & finance. Equity, justice, fairness in every engagement.",
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
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Theme color */}
        <meta name="theme-color" content="#0c3065" />
        <meta name="msapplication-TileColor" content="#0c3065" />
        
        {/* Additional SEO tags */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Mumbai" />
        <meta name="industry" content="Legal Services" />
        <meta name="coverage" content="India" />
        <meta name="target" content="Corporate Clients, Startups, Entrepreneurs" />
      </head>
      <body className={`${inter.variable} antialiased smooth-scroll gpu-accelerated`}>
        {children}
      </body>
    </html>
  );
}
