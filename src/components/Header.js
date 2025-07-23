'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              {/* Mountain-inspired logo */}
              <div className="w-10 h-10 bg-gradient-to-t from-blue-900 to-blue-600 transform rotate-45 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-t from-gold-400 to-gold-300 transform -rotate-45 rounded-sm"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">
                  Aequitas Law Partners
                </h1>
                <p className="text-sm text-gray-600 font-medium">ALP</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="#about" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
              About
            </Link>
            <Link href="#practice-areas" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
              Practice Areas
            </Link>
            <Link href="#team" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
              Team
            </Link>
            <Link href="#insights" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
              Insights
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
              Contact
            </Link>
            <Link 
              href="#consultation" 
              className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              Schedule Consultation
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="#about" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
                About
              </Link>
              <Link href="#practice-areas" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
                Practice Areas
              </Link>
              <Link href="#team" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
                Team
              </Link>
              <Link href="#insights" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
                Insights
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">
                Contact
              </Link>
              <Link 
                href="#consultation" 
                className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium text-center"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
