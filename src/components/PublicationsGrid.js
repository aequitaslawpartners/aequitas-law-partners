'use client'

import Link from 'next/link'
import { publicationsData } from '@/data/publications'

export default function PublicationsGrid() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Featured Publications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">Featured Publications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {publicationsData.filter(pub => pub.featured).map((publication, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${publication.image})` }}>
                  <div className="h-full bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-8">
                  <span className="text-sm font-semibold text-primary-900 uppercase tracking-wide">
                    {publication.category}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">
                    {publication.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {publication.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>{publication.date}</span>
                      <span className="mx-2">•</span>
                      <span>{publication.readTime}</span>
                    </div>
                    <Link href={`/publications/${publication.id}`}>
                      <button className="bg-primary-900 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition-colors">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Publications Grid */}
        <div>
          <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">All Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicationsData.map((publication, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-primary-900 uppercase tracking-wide bg-neutral-100 px-2 py-1 rounded">
                    {publication.category}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">{publication.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{publication.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <span>{publication.date}</span>
                    <span className="mx-1">•</span>
                    <span>{publication.readTime}</span>
                  </div>
                  <Link href={`/publications/${publication.id}`}>
                    <button className="text-secondary-500 hover:text-primary-900 font-medium text-sm">
                      Read More →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
