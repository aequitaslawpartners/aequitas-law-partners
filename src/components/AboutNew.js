export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="mb-6">
              <span className="text-sm font-medium text-blue-900 uppercase tracking-wide">About Aequitas</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-6">
                Equity, Justice, Fairness & Symmetry
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                <strong>Aequitas</strong>, derived from Latin, embodies our core philosophy of equity, justice, 
                fairness, and symmetry. Since 2004, we have been providing strategic legal counsel to 
                corporations and startups across India.
              </p>
              
              <p>
                Our firm combines deep legal expertise with commercial understanding to deliver 
                practical solutions for complex business challenges. We serve as trusted advisors 
                to leading corporations, emerging startups, and institutional clients.
              </p>
              
              <p>
                With offices in Mumbai, Delhi, and Bangalore, we offer comprehensive legal services 
                across multiple practice areas, ensuring our clients receive the highest standard 
                of professional service.
              </p>
            </div>

            {/* Key Principles */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
                <p className="text-sm text-gray-600">Delivering the highest standards of legal counsel and professional service.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Integrity</h4>
                <p className="text-sm text-gray-600">Upholding ethical principles and transparency in all our engagements.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
                <p className="text-sm text-gray-600">Adopting forward-thinking approaches to complex legal challenges.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Partnership</h4>
                <p className="text-sm text-gray-600">Building long-term relationships based on trust and mutual success.</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div 
              className="h-96 lg:h-[500px] bg-cover bg-center rounded-lg shadow-lg"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80')`
              }}
            ></div>
            
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">2004</div>
                <div className="text-sm text-gray-600">Established</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">9</div>
                <div className="text-sm text-gray-600">Practice Areas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
