'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import { publicationsData } from '@/data/publications'
import Link from 'next/link'

export default function PublicationDetailPage() {
  const params = useParams()
  const publication = publicationsData.find(pub => pub.id === params.id)

  if (!publication) {
    return (
      <div className="min-h-screen bg-white">
        <Banner />
        <Header />
        <main className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-primary-900 mb-4">Publication Not Found</h1>
            <p className="text-gray-600 mb-8">The requested publication could not be found.</p>
            <Link href="/publications" className="bg-primary-900 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors">
              Back to Publications
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
              <Link href="/publications" className="text-white hover:text-gray-200 transition-colors">
                ← Back to Publications
              </Link>
            </div>
            <div className="max-w-4xl">
              <div className="mb-4">
                <span className="text-sm font-semibold text-secondary-300 uppercase tracking-wide">
                  {publication.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                {publication.title}
              </h1>
              <div className="flex items-center text-gray-200 text-lg mb-6">
                <span>{publication.author}</span>
                <span className="mx-3">•</span>
                <span>{publication.date}</span>
                <span className="mx-3">•</span>
                <span>{publication.readTime}</span>
              </div>
              <p className="text-xl text-gray-200 leading-relaxed">
                {publication.excerpt}
              </p>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Featured Image */}
            {publication.image && (
              <div className="mb-12">
                <img 
                  src={publication.image} 
                  alt={publication.title}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: publication.content }}
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75'
                }}
              />
            </div>

            {/* Author Info */}
            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">About the Author</h3>
              <p className="text-gray-600">
                <strong>{publication.author}</strong> - This publication represents the collective expertise 
                and insights of our legal professionals specializing in {publication.category.toLowerCase()}.
              </p>
            </div>

            {/* Share and Navigation */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex gap-4">
                <button className="bg-primary-100 text-primary-900 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors">
                  Share Article
                </button>
                <button className="bg-neutral-100 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">
                  Download PDF
                </button>
              </div>
              <Link href="/publications" className="text-primary-900 hover:text-primary-800 font-medium">
                View All Publications →
              </Link>
            </div>

          </div>
        </section>

        {/* Related Publications */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">Related Publications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {publicationsData
                .filter(pub => pub.id !== publication.id && pub.category === publication.category)
                .slice(0, 3)
                .map((relatedPub, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-primary-900 uppercase tracking-wide bg-neutral-100 px-2 py-1 rounded">
                        {relatedPub.category}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-lg">{relatedPub.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{relatedPub.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <span>{relatedPub.date}</span>
                        <span className="mx-1">•</span>
                        <span>{relatedPub.readTime}</span>
                      </div>
                      <Link href={`/publications/${relatedPub.id}`}>
                        <button className="text-secondary-500 hover:text-primary-900 font-medium text-sm">
                          Read More →
                        </button>
                      </Link>
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
              Need Legal Advice on {publication.category}?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Our expert team is ready to provide strategic legal counsel tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Our Experts
              </Link>
              <Link href="/publications" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-900 transition-colors">
                More Publications
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
