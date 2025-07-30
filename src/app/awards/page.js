import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'

export default function AwardsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Awards and Recognitions
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Celebrating excellence and acknowledging our achievements in the legal industry
            </p>
          </div>
        </section>

        {/* Awards Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Awards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              
              {/* Award 1 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Best Corporate Law Firm</h3>
                  <p className="text-gray-700 mb-2">Legal Excellence Awards 2024</p>
                  <p className="text-sm text-gray-600">Recognized for outstanding corporate legal services and client satisfaction</p>
                </div>
              </div>

              {/* Award 2 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Startup Legal Advisor of the Year</h3>
                  <p className="text-gray-700 mb-2">Indian Legal Awards 2024</p>
                  <p className="text-sm text-gray-600">Excellence in providing legal counsel to emerging businesses and startups</p>
                </div>
              </div>

              {/* Award 3 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Client Choice Award</h3>
                  <p className="text-gray-700 mb-2">Legal Services Review 2023</p>
                  <p className="text-sm text-gray-600">Highest client satisfaction ratings in corporate legal services</p>
                </div>
              </div>

              {/* Award 4 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Rising Law Firm</h3>
                  <p className="text-gray-700 mb-2">Business Law Today 2023</p>
                  <p className="text-sm text-gray-600">Recognized for rapid growth and innovative legal solutions</p>
                </div>
              </div>

              {/* Award 5 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Innovation in Legal Services</h3>
                  <p className="text-gray-700 mb-2">Legal Tech Awards 2023</p>
                  <p className="text-sm text-gray-600">Leading innovation in legal service delivery and client engagement</p>
                </div>
              </div>

              {/* Award 6 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Excellence in M&A</h3>
                  <p className="text-gray-700 mb-2">Corporate Legal Awards 2022</p>
                  <p className="text-sm text-gray-600">Outstanding performance in merger and acquisition transactions</p>
                </div>
              </div>

            </div>

            {/* Recognition Statement */}
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment to Excellence</h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                These recognitions reflect our unwavering commitment to delivering exceptional legal services, 
                maintaining the highest professional standards, and continuously innovating to meet our clients' evolving needs. 
                We are honored to be recognized by our peers and clients for our dedication to excellence in the legal profession.
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
