'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useSimpleScroll } from '@/hooks/useSimpleScroll'

export default function About() {
  const [sectionRef, sectionVisible] = useScrollAnimation()
  const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.2 })
  const scrollY = useSimpleScroll()

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content - Always Visible */}
          <div ref={sectionRef}>
            <div className="mb-6">
              <span className="text-sm font-medium text-blue-900 uppercase tracking-wide">
                Legacy
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-6"
                  style={{ 
                    transform: `translateX(${Math.max(0, 200 - scrollY * 0.5)}px)`,
                    opacity: Math.min(1, scrollY * 0.005)
                  }}>
                Shaping India's Legal Past, Present and Future
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg"
                 style={{ 
                   transform: `translateX(${Math.max(0, 150 - scrollY * 0.3)}px)`,
                   opacity: Math.min(1, scrollY * 0.003)
                 }}>
                <strong>Aequitas Law Partners</strong> represents a legacy of legal excellence, embodying equity, 
                justice, fairness, and symmetry in every engagement. Since our inception, we have been 
                instrumental in shaping India's commercial legal landscape.
              </p>
              
              <p className={`scroll-text ${sectionVisible ? 'visible' : ''}`}
                 style={{ transitionDelay: sectionVisible ? '0.3s' : '0s' }}>
                Our firm stands at the intersection of tradition and innovation, combining deep-rooted 
                legal principles with contemporary commercial understanding. We have consistently contributed 
                to legal discourse while facilitating transformative business solutions.
              </p>
              
              <p className={`scroll-text ${sectionVisible ? 'visible' : ''}`}
                 style={{ transitionDelay: sectionVisible ? '0.4s' : '0s' }}>
                Through our thought leadership and professional excellence, we continue to influence 
                legal practice standards and contribute to India's evolving business environment across 
                multiple jurisdictions and practice areas.
              </p>
            </div>

            {/* Key Principles */}
            <div className={`mt-8 grid md:grid-cols-2 gap-6 scroll-card ${sectionVisible ? 'visible' : ''}`}
                 style={{ transitionDelay: sectionVisible ? '0.5s' : '0s' }}
                 data-parallax="0.02">
              <div className="stagger-item rich-card magnetic-element p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Heritage</h4>
                <p className="text-sm text-gray-600">Building upon decades of legal tradition and institutional knowledge.</p>
              </div>
              <div className="stagger-item rich-card magnetic-element p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
                <p className="text-sm text-gray-600">Maintaining the highest standards of legal scholarship and professional service.</p>
              </div>
              <div className="stagger-item rich-card magnetic-element p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Influence</h4>
                <p className="text-sm text-gray-600">Shaping legal discourse and contributing to policy development.</p>
              </div>
              <div className="stagger-item rich-card magnetic-element p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Future Vision</h4>
                <p className="text-sm text-gray-600">Pioneering tomorrow's legal solutions and commercial frameworks.</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative depth-layer-1">
            <div 
              className={`h-96 lg:h-[500px] bg-cover bg-center rounded-lg shadow-lg scroll-slide-right rich-card gpu-accelerated ${imageVisible ? 'visible' : ''}`}
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1491986981770-cb1eee867c54?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
              }}
              data-scale="1.05"
              data-parallax="0.1">
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg pointer-events-none"></div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-900 rounded-full opacity-20 floating-element"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-900 rounded-full opacity-15 floating-element-slow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
