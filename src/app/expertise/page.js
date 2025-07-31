'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import PracticeAreas from '@/components/PracticeAreas'

export default function ExpertisePage() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 to-secondary-500 py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Expertise
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Delivering comprehensive legal solutions across diverse practice areas, with unwavering precision at every stage
            </p>
          </div>
        </section>

        {/* Practice Areas Section */}
        <PracticeAreas />
      </main>
      <Footer />
    </div>
  )
}
