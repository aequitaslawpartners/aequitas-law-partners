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
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20c0-4 3-7 8-7s8 3 8 7" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14l1-1h6l1 1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 15v1M14 15v1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16h2" />
      </svg>
    ),
    'gavel': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M0 0 C1.46875 2.203125 1.46875 2.203125 3 5 C4.45030963 6.62897097 5.95262107 8.21293693 7.5 9.75 C8.2734375 10.52859375 9.046875 11.3071875 9.84375 12.109375 C11.94285879 14.19632617 11.94285879 14.19632617 15 15 C14.49517742 19.29475923 13.23082796 21.33731829 10.1875 24.375 C9.50042969 25.08398438 8.81335938 25.79296875 8.10546875 26.5234375 C6 28 6 28 3.98828125 27.9765625 C1.46452667 26.73699738 -0.12648555 25.07424814 -2 23 C-2.75925781 23.83144531 -3.51851562 24.66289062 -4.30078125 25.51953125 C-5.30465114 26.61722075 -6.3085594 27.71487516 -7.3125 28.8125 C-7.81201172 29.35970703 -8.31152344 29.90691406 -8.82617188 30.47070312 C-10.21222531 31.98526483 -11.60586122 33.49287747 -13 35 C-13.55945312 35.61617187 -14.11890625 36.23234375 -14.6953125 36.8671875 C-16 38 -16 38 -18.5625 38.3125 C-21 38 -21 38 -23 36 C-23.41796875 33.16015625 -23.41796875 33.16015625 -23 30 C-20.98828125 27.62109375 -20.98828125 27.62109375 -18.3125 25.4375 C-17.40371094 24.674375 -16.49492187 23.91125 -15.55859375 23.125 C-14.71425781 22.42375 -13.86992187 21.7225 -13 21 C-11.28509926 19.37178655 -9.6445957 17.69941555 -8 16 C-9.65 14.68 -11.3 13.36 -13 12 C-12.43121059 8.23070895 -10.84778826 6.41522386 -8.1875 3.75 C-7.50042969 3.04359375 -6.81335938 2.3371875 -6.10546875 1.609375 C-4 0 -4 0 0 0 Z M-1.625 11.5 C-2.07875 11.995 -2.5325 12.49 -3 13 C-2.34 14.32 -1.68 15.64 -1 17 C0.32 17 1.64 17 3 17 C3.66 15.68 4.32 14.36 5 13 C3.62514468 11.45833358 3.62514468 11.45833358 2 10 C-0.12364481 9.77390663 -0.12364481 9.77390663 -1.625 11.5 Z " fill="#000000" transform="translate(29,6)"/>
        <path d="M0 0 C6.6 0 13.2 0 20 0 C20 1.32 20 2.64 20 4 C13.4 4 6.8 4 0 4 C-0.33 3.34 -0.66 2.68 -1 2 C-0.67 1.34 -0.34 0.68 0 0 Z "/>
      </svg>
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
                  <div className="text-primary-900 group-hover:text-white transition-all duration-700 mr-3 flex-shrink-0 mt-1">
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
      `}</style>
    </section>
  )
}
