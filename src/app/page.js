'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import PracticeAreas from '@/components/PracticeAreas'
import TeamSlider from '@/components/TeamSlider'
import Insights from '@/components/Insights'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'
import { useScrollEffects } from '@/hooks/useScrollEffects'

export default function Home() {

  const [headerRef, headerVisible] = useScrollAnimation()
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Header />
      <main>
        <Hero />

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 mt-4 depth-layer-2">
          <span className={`text-sm font-medium text-primary-900 uppercase tracking-wide scroll-text stagger-item ${headerVisible ? 'visible' : ''}`}
                data-parallax="0.1">
            Expertise
          </span>
          <h2 className={`text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-6 scroll-reveal text-reveal stagger-item ${headerVisible ? 'visible' : ''}`}
              style={{ transitionDelay: headerVisible ? '0.05s' : '0s' }}
              data-parallax="0.05">
            Facilitating Commercial Legal Solutions
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto scroll-text ${headerVisible ? 'visible' : ''}`}
             style={{ transitionDelay: headerVisible ? '0.1s' : '0s' }}>
            Our comprehensive expertise spans across multiple practice areas, delivering strategic 
            legal counsel and innovative solutions for complex commercial challenges.
          </p>
        </div>
        <PracticeAreas />
        {/* <TeamSlider /> */}
        <About />
      </main>
      <Footer />
    </div>
  );
}
