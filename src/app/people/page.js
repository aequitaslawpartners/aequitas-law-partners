import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import PeopleGrid from '@/components/PeopleGrid'

export default function PeoplePage() {
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
              Our People
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Meet the distinguished legal professionals who drive excellence at Aequitas Law Partners
            </p>
          </div>
        </section>

        {/* People Grid Section */}
        <PeopleGrid />
      </main>
      <Footer />
    </div>
  )
}
