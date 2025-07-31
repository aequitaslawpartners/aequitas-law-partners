'use client'

import Link from 'next/link'
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'
import { useScrollEffects } from '@/hooks/useScrollEffects'
import { practiceAreasData } from '@/data/practiceAreas'

// Icon component mapping function
const getIcon = (iconName, className = "w-8 h-8") => {
  const icons = {
    'building-office': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    'chart-pie': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    'banknotes': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    'scale': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
      </svg>
    ),
    'arrows-pointing-in': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    ),
    'briefcase': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'chart-bar': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    'user-group': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    'light-bulb': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    'shield-check': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    'home': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    'document-minus': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    'exclamation-triangle': (
      <img 
        src="/expertise/white-collar-crime.png" 
        alt="White Collar Crime" 
        className={`${className} object-contain white-collar-icon`}
        style={{
          filter: 'brightness(0) saturate(100%) invert(8%) sepia(90%) saturate(4000%) hue-rotate(210deg) brightness(85%) contrast(120%)'
        }}
      />
    ),
    'gavel': (
      <img 
        src="/expertise/gavel.png" 
        alt="Gavel" 
        className={`${className} object-contain gavel-icon`}
        style={{
          filter: 'brightness(0) saturate(100%) invert(8%) sepia(90%) saturate(4000%) hue-rotate(210deg) brightness(85%) contrast(120%)'
        }}
      />
    )
  }
  
  return icons[iconName] || icons['building-office'] // Default fallback icon
}

export default function PracticeAreas() {
  const [headerRef, headerVisible] = useScrollAnimation()
  const { setRef, isVisible } = useStaggeredAnimation(15, { delay: 20 })
  const { scrollY } = useScrollEffects()

  // Use all practice areas for the expertise page, first 6 for homepage
  const practiceAreas = practiceAreasData

  return (
    <section id="practice-areas" className="py-20 bg-gray-50 scroll-snap-section overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating background elements */}
        <div className="absolute left-10 top-20 w-20 h-20 bg-primary-900 opacity-5 rounded-full floating-element"></div>
        
        

        {/* Practice Areas Grid */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 relative">
          {practiceAreas.map((area, index) => (
            <Link 
              key={index}
              href={`/expertise/${area.id}`}
              className="group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-sm"
            >
              <div 
                ref={setRef(index)}
                className={`bg-white rounded-lg shadow-lg overflow-hidden rich-card magnetic-element scroll-card gpu-accelerated relative cursor-pointer transition-all duration-700 hover:shadow-2xl sm:hover:scale-105 h-48 flex flex-col ${isVisible(index) ? 'visible' : ''}`}
                data-scale="1.02"
                data-parallax="0.02"
              >
              {/* Animated gradient overlay that expands from top-right */}
              <div className="absolute inset-0 bg-gradient-to-bl from-primary-900 via-blue-700 to-blue-500 opacity-0 group-hover:opacity-95 transition-all duration-700 ease-out transform scale-0 group-hover:scale-110 origin-top-right rounded-lg z-10"></div>
              
              {/* Additional shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 z-20"></div>
              {/* Image */}
              {/* <div 
                className="h-10 sm:h-20 lg:h-20 w-20 bg-contain bg-center relative overflow-hidden z-30" 
                style={{ backgroundImage: `url(${area.image})` }}
                data-scale="1.1"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 group-hover:to-black/10 transition-all duration-700"></div>
              </div> */}
              
              {/* Content */}
              <div className="p-4 sm:p-6 depth-layer-1 relative z-30 flex flex-col justify-between h-full">
                <div className="flex items-start mb-3">
                  <div className="text-primary-900 group-hover:text-white transition-all duration-700 mr-3 flex-shrink-0 mt-1 gavel-icon-container">
                    {getIcon(area.icon, "w-6 h-6 sm:w-8 sm:h-8")}
                  </div>
                  <h3 className="text-lg text-left sm:text-xl font-bold text-gray-900 group-hover:text-white transition-all duration-700 transform group-hover:translate-y-1 leading-tight line-clamp-2">
                    {area.title}
                  </h3>
                </div>
                
                <div className="mt-auto">
                  <button className="text-primary-900 group-hover:text-white font-medium text-sm transition-all duration-700 delay-200 transform group-hover:translate-x-2 group-hover:scale-110">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 3.5rem; /* Approximately 2 lines */
        }
        
        .gavel-icon-container .gavel-icon,
        .gavel-icon-container .white-collar-icon {
          transition: filter 0.7s ease;
        }
        
        .group:hover .gavel-icon-container .gavel-icon,
        .group:hover .gavel-icon-container .white-collar-icon {
          filter: brightness(0) saturate(100%) invert(100%) !important;
        }
      `}</style>
    </section>
  )
}
