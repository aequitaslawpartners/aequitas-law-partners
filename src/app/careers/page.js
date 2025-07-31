import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'

export default function CareersPage() {
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
              Careers
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Join our team of exceptional legal professionals and build a rewarding career in law
            </p>
          </div>
        </section>

        {/* Current Openings */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Openings</h2>
              <p className="text-lg text-gray-600">Explore exciting opportunities to join our growing team</p>
            </div>

            <div className="space-y-6">
              {/* Job Opening 1 */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Senior Associate - Corporate Law</h3>
                    <p className="text-gray-600 mb-4">
                      We are seeking an experienced corporate lawyer to join our team. The ideal candidate will have 3-5 years of experience 
                      in corporate law, M&A transactions and regulatory compliance.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">Corporate Law</span>
                      <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full">M&A</span>
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">3-5 Years</span>
                      <span className="px-3 py-1 bg-neutral-200 text-neutral-600 text-sm rounded-full">Mumbai</span>
                    </div>
                  </div>
                  <div className="lg:ml-8">
                    <button className="bg-primary-900 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors w-full lg:w-auto">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Job Opening 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Junior Associate - Startup & Technology Law</h3>
                    <p className="text-gray-600 mb-4">
                      Join our dynamic startup practice group. Looking for a motivated lawyer with 1-3 years of experience 
                      in startup legal matters, venture capital and technology law.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full">Startup Law</span>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">Technology</span>
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">1-3 Years</span>
                      <span className="px-3 py-1 bg-neutral-200 text-neutral-600 text-sm rounded-full">Mumbai</span>
                    </div>
                  </div>
                  <div className="lg:ml-8">
                    <button className="bg-primary-900 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors w-full lg:w-auto">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Job Opening 3 */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Legal Intern</h3>
                    <p className="text-gray-600 mb-4">
                      Excellent opportunity for law students or recent graduates to gain hands-on experience in a premier law firm. 
                      Exposure to various practice areas and mentorship from senior lawyers.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">Internship</span>
                      <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full">All Practice Areas</span>
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">Entry Level</span>
                      <span className="px-3 py-1 bg-neutral-200 text-neutral-600 text-sm rounded-full">Mumbai</span>
                    </div>
                  </div>
                  <div className="lg:ml-8">
                    <button className="bg-primary-900 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors w-full lg:w-auto">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Apply</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary-900">1</span>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Submit Application</h3>
                <p className="text-gray-600">Send your resume and cover letter to careers@aequitaslawpartners.com</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-secondary-700">2</span>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Initial Review</h3>
                <p className="text-gray-600">Our team will review your application and contact qualified candidates</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-neutral-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Interview Process</h3>
                <p className="text-gray-600">Multiple rounds of interviews with our team members and partners</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
