'use client'

import Link from 'next/link'
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'
import { useScrollEffects } from '@/hooks/useScrollEffects'
import { practiceAreasData } from '@/data/practiceAreas'

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
        <div className="absolute right-16 bottom-32 w-16 h-16 bg-primary-900 opacity-3 rounded-full floating-element-slow"></div>
        
        

        {/* Practice Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {practiceAreas.map((area, index) => (
            <div 
              key={index}
              ref={setRef(index)}
              className={`bg-white rounded-lg shadow-lg overflow-hidden rich-card magnetic-element scroll-card gpu-accelerated relative group transition-all duration-700 hover:shadow-2xl hover:scale-105 ${isVisible(index) ? 'visible' : ''}`}
              data-scale="1.02"
              data-parallax="0.02"
            >
              {/* Animated gradient overlay that expands from top-right */}
              <div className="absolute inset-0 bg-gradient-to-bl from-primary-900 via-blue-700 to-blue-500 opacity-0 group-hover:opacity-95 transition-all duration-700 ease-out transform scale-0 group-hover:scale-110 origin-top-right rounded-lg z-10"></div>
              
              {/* Additional shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 z-20"></div>
              {/* Image */}
              <div 
                className="h-48 bg-cover bg-center relative overflow-hidden z-30" 
                style={{ backgroundImage: `url(${area.image})` }}
                data-scale="1.1"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 group-hover:to-black/10 transition-all duration-700"></div>
              </div>
              
              {/* Content */}
              <div className="p-6 depth-layer-1 relative z-30">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-all duration-700 transform group-hover:translate-y-1">
                  {area.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-100 mb-4 leading-relaxed transition-all duration-700 delay-100">
                  {area.description}
                </p>
                
                {/* Services */}
                <ul className="professional-list text-sm text-gray-600 group-hover:text-gray-200 mb-4 transition-all duration-700 delay-150">
                  {area.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="transform group-hover:translate-x-1 transition-transform duration-500" style={{transitionDelay: `${serviceIndex * 50}ms`}}>{service}</li>
                  ))}
                </ul>
                
                <Link href={`/expertise/${area.id}`}>
                  <button className="text-primary-900 group-hover:text-white font-medium text-sm transition-all duration-700 delay-200 transform group-hover:translate-x-2 group-hover:scale-110">
                    Learn More →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
