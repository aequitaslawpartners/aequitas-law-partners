'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useSimpleScroll } from '@/hooks/useSimpleScroll'
import PracticeAreas from './PracticeAreas'
import { practiceAreasData } from '@/data/practiceAreas'

export default function AboutALP() {
  const [sectionRef, sectionVisible] = useScrollAnimation()
  const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.2 })
  const scrollY = useSimpleScroll()

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Content - Always Visible */}
          <div ref={sectionRef}>
            {/* About ALP Section */}
            <div className="mb-16 text-center">
              <span className="text-3xl md:text-4xl text-primary-900 uppercase tracking-wide font-lora block mb-6">
                About ALP
              </span>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-lora mb-8"
                    style={{ 
                      transform: `translateX(${Math.max(0, 200 - scrollY * 0.5)}px)`,
                      opacity: Math.min(1, scrollY * 0.005)
                    }}>
                  Aequitas Law Partners (ALP), a firm inspired by the strength and timeless resilience of the Alps, is built for impact. We are designed to achieve unparalleled outcomes through sharp insight, precision and seamless execution. At ALP, we combine legal excellence with...
                </p>
                <a href='/about' className="inline-block cursor-pointer transition-all duration-300 text-primary-900 border-2 border-primary-900 px-8 py-3 rounded-lg font-lora font-semibold hover:bg-primary-900 hover:text-white transform hover:-translate-y-1 hover:shadow-lg">
                  Read More
                </a>
              </div>
            </div>

            {/* Expertise Section */}
            <div className="mb-16 text-center">
              <span className="text-3xl md:text-4xl text-primary-900 uppercase tracking-wide font-lora block mb-6">
                Expertise
              </span>
              <div className="max-w-6xl mx-auto">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-lora mb-12"
                    style={{ 
                      transform: `translateX(${Math.max(0, 200 - scrollY * 0.5)}px)`,
                      opacity: Math.min(1, scrollY * 0.005)
                    }}>
                  Delivering comprehensive legal solutions across diverse practice areas, with unwavering precision at every stage
                </p>
                
                {/* Practice Areas Grid */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  {practiceAreasData.map((area, index) => (
                    <div 
                      key={area.id}
                      className="group relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-24 flex flex-col justify-between overflow-hidden w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                      onClick={() => window.location.href = `/expertise/${area.id}`}
                    >
                      {/* Animated gradient overlay that expands from top-right */}
                      <div className="absolute inset-0 bg-gradient-to-bl from-primary-900 via-blue-700 to-blue-500 opacity-0 group-hover:opacity-95 transition-all duration-700 ease-out transform scale-0 group-hover:scale-110 origin-top-right rounded-lg z-10"></div>
                      
                      {/* Secondary shimmer overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 z-20"></div>
                      
                      <div className="relative z-20 text-center flex flex-col justify-center h-full">
                        <h3 className="text-lg text-primary-900 font-lora group-hover:text-white transition-all duration-700">
                          {area.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                <a href='/expertise' className="inline-block cursor-pointer transition-all duration-300 text-primary-900 border-2 border-primary-900 px-8 py-3 rounded-lg font-lora font-semibold hover:bg-primary-900 hover:text-white transform hover:-translate-y-1 hover:shadow-lg">
                  View All Practice Areas
                </a>
              </div>
            </div>

            
          </div>

          {/* Image */}
          {/* <div ref={imageRef} className="relative depth-layer-1">
            <div 
              className={`h-96 lg:h-[500px] bg-cover bg-center rounded-lg shadow-lg scroll-slide-right rich-card gpu-accelerated ${imageVisible ? 'visible' : ''}`}
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1491986981770-cb1eee867c54?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
              }}
              data-scale="1.05"
              data-parallax="0.1">
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg pointer-events-none"></div>
            
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-900 rounded-full opacity-20 floating-element"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-900 rounded-full opacity-15 floating-element-slow"></div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
