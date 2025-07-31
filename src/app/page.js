'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PracticeAreas from '@/components/PracticeAreas'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import AboutALP from '@/components/Home'
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'

export default function Home() {

  const [headerRef, headerVisible] = useScrollAnimation()
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Header />
      <main>
        <Hero />

        <AboutALP />

        {/* Header */}
        
      </main>
      <Footer />
    </div>
  );
}
