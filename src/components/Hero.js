export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      {/* Background Mountain Silhouette */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 600" className="w-full h-full">
          <path 
            d="M0,400 L200,200 L400,300 L600,100 L800,250 L1000,150 L1200,300 L1200,600 L0,600 Z" 
            fill="currentColor"
          />
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Elevating Justice in 
                <span className="text-yellow-400"> Business</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mt-4 lg:mt-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <strong>Aequitas</strong> - Latin for equity, justice, fairness, and symmetry. 
                We provide strategic legal counsel that reaches new heights in corporate and startup law.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-blue-200 max-w-xl mx-auto lg:mx-0">
                From regulatory grey zones to cross-border plays, we bring precision to your next big move. 
                Our expertise spans corporate law, startup ventures, and innovative legal solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-yellow-500 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-yellow-400 transition-colors w-full sm:w-auto">
                Schedule Free Consultation
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-white hover:text-blue-900 transition-colors w-full sm:w-auto">
                Our Practice Areas
              </button>
            </div>
          </div>

          {/* Visual Element - Mountain Peak Design */}
          <div className="relative order-first lg:order-last">
            <div className="relative w-full h-64 sm:h-80 lg:h-[500px] flex items-center justify-center">
              {/* Stylized Mountain/Peak representation */}
              <div className="relative">
                {/* Main Mountain */}
                <div className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 bg-gradient-to-t from-blue-600 to-blue-400 transform rotate-45 rounded-2xl shadow-2xl">
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-4 lg:left-4 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-yellow-400 transform -rotate-45 rounded-lg opacity-80"></div>
                </div>
                
                {/* Smaller peaks */}
                <div className="absolute -left-8 top-8 sm:-left-12 sm:top-12 lg:-left-16 lg:top-16 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-t from-blue-700 to-blue-500 transform rotate-45 rounded-xl opacity-70"></div>
                <div className="absolute -right-6 top-10 sm:-right-8 sm:top-14 lg:-right-12 lg:top-20 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-t from-blue-700 to-blue-500 transform rotate-45 rounded-lg opacity-60"></div>
              </div>
              
              {/* Floating elements representing excellence */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-10 lg:right-10 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute top-8 left-4 sm:top-12 sm:left-6 lg:top-20 lg:left-10 w-2 h-2 sm:w-3 sm:h-3 bg-blue-300 rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-16 right-8 sm:bottom-20 sm:right-12 lg:bottom-32 lg:right-20 w-2 h-2 bg-white rounded-full animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}
