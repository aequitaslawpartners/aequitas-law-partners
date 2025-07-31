import { Inter } from "next/font/google";
import "../globals.css";
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "All Insights | Aequitas Law Partners",
  description: "Comprehensive collection of legal insights, articles and thought leadership from Aequitas Law Partners covering corporate law, startup services and regulatory updates.",
};

export default function InsightsLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
