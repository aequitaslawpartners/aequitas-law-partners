export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/Logo.jpg" 
                alt="Aequitas Law Partners" 
                className="h-12 w-auto object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">Aequitas Law Partners</h3>
                <p className="text-blue-300 text-sm">ALP</p>
              </div>
            </div>
            <p className="text-blue-200 mb-6 leading-relaxed">
              Elevating justice in business through equity, fairness, and strategic legal counsel. 
              Reaching new heights in corporate and startup law.
            </p>
            <div className="space-y-2 text-sm text-blue-300">
              <p><strong>www.alplaw.in</strong></p>
              <p>info@alplaw.in</p>
              <p>+91 22 6789 1000</p>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-lg font-bold mb-6">Practice Areas</h4>
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
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
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
            <h4 className="text-lg font-bold mb-6">Contact Information</h4>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-blue-300 text-sm mb-2">Mumbai Office</p>
                <p className="text-white text-sm">Business Address Line 1</p>
                <p className="text-white text-sm">Mumbai, Maharashtra</p>
              </div>
              <div>
                <p className="text-blue-300 text-sm mb-2">Email</p>
                <p className="text-white text-sm">info@alplaw.in</p>
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
                <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.017 12.017a4.5 4.5 0 11-6.367-6.367 4.5 4.5 0 016.367 6.367zm-.759-.759a3 3 0 10-4.242-4.242 3 3 0 004.242 4.242zm1.238-6.851a1.13 1.13 0 11-2.26 0 1.13 1.13 0 012.26 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M7.5 3h5A4.5 4.5 0 0117 7.5v5a4.5 4.5 0 01-4.5 4.5h-5A4.5 4.5 0 013 12.5v-5A4.5 4.5 0 017.5 3zm0 1.5A3 3 0 004.5 7.5v5a3 3 0 003 3h5a3 3 0 003-3v-5a3 3 0 00-3-3h-5z" clipRule="evenodd" />
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
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>

          {/* Bar Council Disclaimer */}
          <div className="mt-6 pt-6 border-t border-blue-800">
            <div className="bg-blue-800 p-4 rounded-lg">
              <p className="text-xs text-blue-200 leading-relaxed">
                <strong>Disclaimer:</strong> This website is in compliance with the Bar Council of India rules. 
                This website is meant only for providing information and does not amount to solicitation of clients. 
                The content of this website is for informational purposes only and should not be construed as legal advice. 
                The firm shall not be liable for consequences of any action taken based on the information provided on this website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
