import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import { peopleData } from '@/data/people'

export default function PersonPage({ params }) {
  const person = peopleData.find(p => p.id === params.id)
  
  if (!person) {
    notFound()
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
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  {person.name}
                </h1>
                <p className="text-2xl text-secondary-200 mb-6 font-medium">
                  {person.designation}
                </p>
                <p className="text-lg text-gray-200 leading-relaxed">
                  {person.bio}
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <a
                    href={`tel:${person.mobile}`}
                    className="inline-flex items-center px-6 py-3 bg-secondary-500 text-white font-medium rounded-lg hover:bg-secondary-600 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </a>
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex items-center px-6 py-3 bg-white text-primary-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    Send Email
                  </a>
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
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-secondary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-primary-900">Phone</h3>
                </div>
                <p className="text-gray-600">{person.mobile}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-secondary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <h3 className="text-lg font-semibold text-primary-900">Email</h3>
                </div>
                <p className="text-gray-600">{person.email}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-secondary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-primary-900">Experience</h3>
                </div>
                <p className="text-gray-600">{person.experience}</p>
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
                  {person.expertise.map((area, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-secondary-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 font-medium">{area}</span>
                    </div>
                  ))}
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
              </div>
            </div>
          </div>
        </section>

        {/* Publications & Achievements */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-primary-900 mb-6">Publications</h2>
                <div className="space-y-4">
                  {person.publications.map((publication, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                      <h3 className="text-lg font-semibold text-primary-900 mb-2">{publication}</h3>
                      <p className="text-gray-600 text-sm">Published Article</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-primary-900 mb-6">Achievements & Recognition</h2>
                <div className="space-y-4">
                  {person.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <p className="text-gray-700">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to discuss your legal needs?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Contact {person.name.split(' ')[0]} directly for expert legal consultation and guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${person.mobile}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary-500 text-white font-semibold rounded-lg hover:bg-secondary-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {person.mobile}
              </a>
              <a
                href={`mailto:${person.email}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                Email {person.email}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
