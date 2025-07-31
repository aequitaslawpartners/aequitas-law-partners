'use client'
import Link from 'next/link'
import { peopleData } from '@/data/people'
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'

export default function PeopleGrid() {
  const [headerRef, headerVisible] = useScrollAnimation()
  const { setRef, isVisible } = useStaggeredAnimation(6, { delay: 50 })

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className={`text-3xl lg:text-4xl font-bold text-primary-900 mt-2 mb-6 scroll-reveal ${headerVisible ? 'visible' : ''}`}
              style={{ transitionDelay: headerVisible ? '0.05s' : '0s' }}>
            Home to Inspired Performances
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {peopleData.map((person, index) => (
            <Link 
              key={person.id}
              href={`/people/${person.id}`}
              className="group"
            >
              <div 
                ref={setRef(index)}
                className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105 scroll-card ${isVisible(index) ? 'visible' : ''}`}
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-80 object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-900 mb-2 group-hover:text-secondary-500 transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-secondary-500 font-medium mb-3">
                    {person.designation}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {person.mobile}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      {person.email}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {person.bio}
                  </p>
                  <div className="mt-4">
                    <span className="inline-flex items-center text-secondary-500 text-sm font-medium group-hover:text-primary-900 transition-colors">
                      View Profile
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
