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
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 depth-layer-2">
          <span className={`text-sm font-medium text-primary-900 uppercase tracking-wide scroll-text stagger-item ${headerVisible ? 'visible' : ''}`}
                data-parallax="0.1">
            Expertise
          </span>
          <h2 className={`text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-6 scroll-reveal text-reveal stagger-item ${headerVisible ? 'visible' : ''}`}
              style={{ transitionDelay: headerVisible ? '0.05s' : '0s' }}
              data-parallax="0.05">
            Facilitating Commercial Legal Solutions
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto scroll-text ${headerVisible ? 'visible' : ''}`}
             style={{ transitionDelay: headerVisible ? '0.1s' : '0s' }}>
            Our comprehensive expertise spans across multiple practice areas, delivering strategic 
            legal counsel and innovative solutions for complex commercial challenges.
          </p>
        </div>

        {/* Practice Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {practiceAreas.map((area, index) => (
            <div 
              key={index}
              ref={setRef(index)}
              className={`bg-white rounded-lg shadow-lg overflow-hidden rich-card magnetic-element scroll-card gpu-accelerated ${isVisible(index) ? 'visible' : ''}`}
              data-scale="1.02"
              data-parallax="0.02"
            >
              {/* Image */}
              <div 
                className="h-48 bg-cover bg-center relative overflow-hidden" 
                style={{ backgroundImage: `url(${area.image})` }}
                data-scale="1.1"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="p-6 depth-layer-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300">
                  {area.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {area.description}
                </p>
                
                {/* Services */}
                <ul className="professional-list text-sm text-gray-600 mb-4">
                  {area.services.map((service, serviceIndex) => (
                    <li key={serviceIndex}>{service}</li>
                  ))}
                </ul>
                
                <Link href={`/expertise/${area.id}`}>
                  <button className="text-primary-900 font-medium text-sm hover:text-primary-800 transition-colors">
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
