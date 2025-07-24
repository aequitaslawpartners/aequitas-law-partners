'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function TeamSlider() {
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.1 })

  // 3 corporate law meeting images
  const corporateImages = [
    {
      id: 1,
      image: "https://media.istockphoto.com/id/1402948131/photo/businesswoman-and-businessman-shaking-hands-across-the-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=Yozc42fmqkmIw5d845pcV4M9cENxxuzeBKaXb5qk2fU="
    },
    {
      id: 2,
      image: "https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29ycG9yYXRlJTIwbGF3JTIwZmlybSUyMG1lZXRpbmdzfGVufDB8fDB8fHww"
    },
    {
      id: 3,
      image: "https://media.istockphoto.com/id/1277950504/photo/lawyer-is-explaining-about-the-wrongdoing-laws-regarding-fraud-to-the-client-at-the-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=sCpLYhRV_93B9COSFBNT4jO_Xx36Ca4w1ueRSbG10Vw="
    }
  ]

  return (
    <section id="team" ref={gridRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sm font-medium text-blue-900 uppercase tracking-wide">People</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-6">
            Home to Inspired Performances
          </h2>
        </div>

        {/* Corporate Law Images Grid */}
        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {corporateImages.map((item, index) => (
            <div 
              key={item.id}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={`Corporate Law Meeting ${index + 1}`}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
