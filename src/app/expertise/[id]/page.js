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
            <div className="grid gap-12 items-center">
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

        {/* Why ALP Section - Only show if content exists */}
        {practiceArea.whyALP && (
          <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-500 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6">
                    <svg className="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why ALP?</h2>
                  <div className="w-24 h-1 bg-white mx-auto opacity-60"></div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 md:p-12 rounded-2xl shadow-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                    </div>
                    <div className="flex-1">
                      <p className="text-lg md:text-xl text-white leading-relaxed font-medium">
                        {practiceArea.whyALP}
                      </p>
                    </div>
                  </div>
                  
                  {/* Call to Action */}
                  <div className="mt-8 pt-8 border-t border-white/20 text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Get Expert Counsel
                      </Link>
                      <Link href="/people" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-900 transition-all duration-300 transform hover:scale-105">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        Meet Our Team
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {/* <section className="py-16 bg-primary-900">
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
        </section> */}
      </main>
      <Footer />
    </div>
  )
}
