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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Elevating Justice in 
                <span className="text-yellow-400"> Business</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 mt-6 leading-relaxed">
                <strong>Aequitas</strong> - Latin for equity, justice, fairness, and symmetry. 
                We provide strategic legal counsel that reaches new heights in corporate and startup law.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-blue-200">
                From regulatory grey zones to cross-border plays, we bring precision to your next big move. 
                Our expertise spans corporate law, startup ventures, and innovative legal solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors">
                Schedule Free Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition-colors">
                Our Practice Areas
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-blue-700">
              <p className="text-sm text-blue-300 mb-4">Trusted by leading corporations and innovative startups</p>
              <div className="flex items-center space-x-6 text-blue-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">25+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm">Clients Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">₹10B+</div>
                  <div className="text-sm">Deals Closed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element - Mountain Peak Design */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Stylized Mountain/Peak representation */}
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="relative">
                  {/* Main Mountain */}
                  <div className="w-64 h-64 bg-gradient-to-t from-blue-600 to-blue-400 transform rotate-45 rounded-2xl shadow-2xl">
                    <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 transform -rotate-45 rounded-lg opacity-80"></div>
                  </div>
                  
                  {/* Smaller peaks */}
                  <div className="absolute -left-16 top-16 w-32 h-32 bg-gradient-to-t from-blue-700 to-blue-500 transform rotate-45 rounded-xl opacity-70"></div>
                  <div className="absolute -right-12 top-20 w-24 h-24 bg-gradient-to-t from-blue-700 to-blue-500 transform rotate-45 rounded-lg opacity-60"></div>
                </div>
              </div>
              
              {/* Floating elements representing excellence */}
              <div className="absolute top-10 right-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute top-20 left-10 w-3 h-3 bg-blue-300 rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-32 right-20 w-2 h-2 bg-white rounded-full animate-pulse delay-700"></div>
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
