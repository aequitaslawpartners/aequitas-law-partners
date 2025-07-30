import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import About from '@/components/About'

export default function AboutPage() {
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
              About Us
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Discover our journey, values, and commitment to delivering exceptional legal services
            </p>
          </div>
        </section>

        {/* About Content Section */}
        <About />

        {/* Vision & Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Vision */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-4">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-center">
                  To be the most trusted and innovative legal partner for businesses in India, 
                  setting new standards of excellence in corporate legal services and contributing 
                  to the growth of a robust legal ecosystem that fosters business success and 
                  economic development.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-4">Our Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-center">
                  To deliver exceptional legal services with integrity, innovation, and expertise, 
                  empowering our clients to achieve their business objectives while maintaining the 
                  highest standards of professional excellence and ethical conduct in all our endeavors.
                </p>
              </div>

            </div>

            {/* Core Values */}
            <div className="mt-16 text-center">
              <h3 className="text-3xl font-bold text-primary-900 mb-8">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-primary-900 mb-2">Integrity</h4>
                  <p className="text-gray-600">Upholding the highest ethical standards in all our professional dealings</p>
                </div>

                <div className="p-6">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-secondary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-primary-900 mb-2">Excellence</h4>
                  <p className="text-gray-600">Delivering superior legal solutions through continuous innovation and expertise</p>
                </div>

                <div className="p-6">
                  <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-primary-900 mb-2">Client Focus</h4>
                  <p className="text-gray-600">Putting our clients' interests first and building lasting partnerships</p>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
