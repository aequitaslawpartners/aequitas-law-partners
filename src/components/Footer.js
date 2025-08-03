export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom Bar */}
        <div className="border-t border-blue-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-blue-300 text-sm">
              <p>&copy; 2025 Aequitas Law Partners. All rights reserved.</p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm text-blue-300">
              <a href="/sitemap.xml" className="hover:text-white transition-colors" target="_blank" rel="noopener">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
