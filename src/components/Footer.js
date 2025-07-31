export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 p-4 rounded-lg shadow-sm">
              <img 
                src="/Logo-White.png" 
                alt="Aequitas Law Partners" 
                className="h-32 w-auto object-contain"
              />
              {/* <div>
                <h3 className="text-xl font-bold">Aequitas Law Partners</h3>
                <p className="text-blue-300 text-sm">ALP</p>
              </div> */}
            </div>
            <p className="text-blue-200 mb-6 leading-relaxed">
              Elevating justice in business through equity, fairness, and strategic legal counsel. 
              Reaching new heights in corporate and startup law.
            </p>
            <div className="space-y-2 text-sm text-blue-300">
              <p><strong>www.alplaw.in</strong></p>
              <p>info@alplaw.in</p>
              <p>+91 9920175277</p>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-blue-200">Practice Areas</h4>
            <ul className="space-y-3 text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors">Corporate Law & M&A</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Startup & Venture Capital</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Banking & Finance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Capital Markets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technology & IP Law</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dispute Resolution</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Real Estate Law</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Employment & Labor</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-blue-200">Quick Links</h4>
            <ul className="space-y-3 text-blue-200">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#insights" className="hover:text-white transition-colors">Insights & Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Opportunities</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Awards & Recognition</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Client Portal</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Office Locations</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-blue-200">Contact Information</h4>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-blue-300 text-sm mb-2">Mumbai Office</p>
                <p className="text-white text-sm">407, 4th Floor, Above Axis Bank, Laxmi Industrial Estate,</p>
                <p className="text-white text-sm">New Link Road, Andheri (W), Mumbai – 400053, India</p>
              </div>
              <div>
                <p className="text-blue-300 text-sm mb-2">Email</p>
                <p className="text-white text-sm">info@alplaw.in</p>
              </div>
              <div>
                <p className="text-blue-300 text-sm mb-2">Phone</p>
                <p className="text-white text-sm">+91 9920175277</p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="font-medium text-white mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-blue-300 text-sm">
              <p>&copy; 2025 Aequitas Law Partners. All rights reserved.</p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm text-blue-300">
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>

          {/* Bar Council Disclaimer */}
          {/* <div className="mt-6 pt-6 border-t border-blue-800">
            <div className="bg-blue-800 p-4 rounded-lg">
              <p className="text-xs text-blue-200 leading-relaxed">
                <strong>Disclaimer:</strong> This website is in compliance with the Bar Council of India rules. 
                This website is meant only for providing information and does not amount to solicitation of clients. 
                The content of this website is for informational purposes only and should not be construed as legal advice. 
                The firm shall not be liable for consequences of any action taken based on the information provided on this website.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
