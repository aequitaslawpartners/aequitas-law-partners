import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'

export default function ContactPage() {
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
              Contact Us
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Get in touch with our team for expert legal counsel and consultation
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="corporate">Corporate Law</option>
                      <option value="startup">Startup Legal Services</option>
                      <option value="ma">Mergers & Acquisitions</option>
                      <option value="banking">Banking & Finance</option>
                      <option value="ip">Intellectual Property</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please describe your legal needs or questions..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-secondary-500 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information & Offices */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Office</h2>
                
                {/* Mumbai Office */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">Mumbai Office</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-secondary-500 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-gray-700">123 Business District</p>
                        <p className="text-gray-700">Bandra Kurla Complex</p>
                        <p className="text-gray-700">Mumbai, Maharashtra 400051</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-secondary-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <p className="text-gray-700">+91 22 1234 5678</p>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-secondary-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <p className="text-gray-700">mumbai@aequitaslawpartners.com</p>
                    </div>
                  </div>
                </div>

                {/* General Contact */}
                <div className="mt-8 text-center p-6 bg-primary-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-primary-900 mb-2">General Inquiries</h3>
                  <p className="text-gray-700 mb-2">info@aequitaslawpartners.com</p>
                  <p className="text-gray-700">+91 1800 123 4567 (Toll Free)</p>
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
