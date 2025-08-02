import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import { peopleData } from '@/data/people'
import { practiceAreasData } from '@/data/practiceAreas'

export default function PersonPage({ params }) {
  const person = peopleData.find(p => p.id === params.id)
  
  if (!person) {
    notFound()
  }

  // Function to convert expertise name to URL slug
  const getExpertiseSlug = (expertiseName) => {
    const practiceArea = practiceAreasData.find(area => area.title === expertiseName)
    return practiceArea ? practiceArea.id : null
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
            <div className="grid lg:grid-cols-3 gap-x-12 gap-y-4">
              <div className="lg:col-span-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  {person.name}
                </h1>
                <p className="text-2xl text-secondary-200 mb-6 font-medium">
                  {person.designation}
                </p>
              </div>
              <div className="lg:col-span-2">
                <div 
                  className="text-lg text-gray-200 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: person.bio }}
                />
                <div className="flex flex-wrap gap-4 mt-8">
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex items-center px-6 py-3 bg-white text-primary-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    Send Email
                  </a>
                  {person.linkedin && (
                    <a
                      href={`https://${person.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-primary-900 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {person.vcard && (
                    <a
                      href={person.vcard}
                      download
                      className="inline-flex items-center px-6 py-3 bg-neutral-200 text-primary-900 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download vCard
                    </a>
                  )}
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-secondary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <h3 className="text-lg font-semibold text-primary-900">Email</h3>
                </div>
                <p className="text-gray-600">{person.email}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-primary-900 mb-6">Areas of Expertise</h2>
                <div className="space-y-3">
                  {person.expertise.map((area, index) => {
                    const expertiseSlug = getExpertiseSlug(area)
                    return (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-secondary-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {expertiseSlug ? (
                          <Link 
                            href={`/expertise/${expertiseSlug}`}
                            className="text-gray-700 font-medium hover:text-secondary-600 hover:underline transition-colors cursor-pointer"
                          >
                            {area}
                          </Link>
                        ) : (
                          <span className="text-gray-700 font-medium">{area}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-primary-900 mb-6">Education</h2>
                <div className="space-y-4">
                  {person.education.map((edu, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 font-medium">{edu}</p>
                    </div>
                  ))}
                </div>
                <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {person.languages.map((language, index) => (
                    <span key={index} className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                      {language}
                    </span>
                  ))}
                </div>
                
                {person.memberships && person.memberships.length > 0 && (
                  <>
                    <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">Memberships</h2>
                    <div className="space-y-4">
                      {person.memberships.map((membership, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 font-medium">{membership}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      
        {/* Personal Note Section */}
        {person.personalNote && (
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-primary-900 mb-6">When Not Lawyering?</h2>
                <div className="bg-gradient-to-r from-primary-900 to-secondary-500 rounded-lg p-8 text-white">
                  <p className="text-lg leading-relaxed italic">
                    "{person.personalNote}"
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        
      </main>
      <Footer />
    </div>
  )
}
