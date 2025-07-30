'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import { practiceAreasData } from '@/data/practiceAreas'
import Link from 'next/link'



export default function PracticeAreaDetailPage() {
  const params = useParams()
  const practiceArea = practiceAreasData.find(area => area.id === params.id)

  if (!practiceArea) {
    return (
      <div className="min-h-screen bg-white">
        <Banner />
        <Header />
        <main className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-primary-900 mb-4">Practice Area Not Found</h1>
            <p className="text-gray-600 mb-8">The requested practice area could not be found.</p>
            <Link href="/expertise" className="bg-primary-900 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors">
              Back to Expertise
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 to-secondary-500 py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Link href="/expertise" className="text-white hover:text-gray-200 transition-colors">
                ← Back to Expertise
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {practiceArea.title}
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                {practiceArea.description}
              </p>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary-900 mb-6">Overview</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {practiceArea.overview}
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary-900">Areas of Expertise</h3>
                  <ul className="space-y-2">
                    {practiceArea.expertise?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-secondary-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <img 
                  src={practiceArea.image} 
                  alt={practiceArea.title}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-900 mb-4">Key Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our comprehensive service offerings in {practiceArea.title.toLowerCase()}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {practiceArea.keyServices?.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-primary-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Expert Legal Counsel in {practiceArea.title}?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Our experienced team is ready to provide strategic legal solutions tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Us
              </Link>
              <Link href="/expertise" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-900 transition-colors">
                View All Expertise
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
