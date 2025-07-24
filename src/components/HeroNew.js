export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center image-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80')`
        }}
      ></div>

      {/* Content */}
      <div className="container-max relative z-10">
        <div className="max-w-4xl">
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded text-white text-sm font-medium mb-6">
              ESTABLISHED 2004 • CORPORATE & STARTUP LEGAL SERVICES
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
            Aequitas Law Partners
            <span className="block text-2xl md:text-3xl lg:text-4xl font-light mt-2 text-gray-200">
              Elevating Justice in Business
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl leading-relaxed">
            Strategic legal counsel for corporate and startup clients. 
            We provide comprehensive legal solutions with precision, integrity, and excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#contact" className="btn-primary bg-white text-blue-900 hover:bg-gray-100">
              Schedule Consultation
            </a>
            <a href="#practice-areas" className="btn-secondary border-white text-white hover:bg-white hover:text-blue-900">
              Our Expertise
            </a>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white border-opacity-30">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">20+</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">Clients Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">₹50B+</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">Deals Facilitated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-sm text-gray-300 uppercase tracking-wide">Office Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}
