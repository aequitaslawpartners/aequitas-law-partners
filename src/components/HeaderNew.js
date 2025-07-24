'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'practice-areas', 'team', 'insights', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="nav-professional sticky top-0 z-30">
      <div className="container-max">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded flex items-center justify-center">
              <div className="text-white font-bold text-lg">A</div>
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">Aequitas Law Partners</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Legal Excellence</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="#about" 
              className={`professional-link text-sm font-medium ${activeSection === 'about' ? 'nav-link-active' : ''}`}
            >
              About
            </Link>
            <Link 
              href="#practice-areas" 
              className={`professional-link text-sm font-medium ${activeSection === 'practice-areas' ? 'nav-link-active' : ''}`}
            >
              Practice Areas
            </Link>
            <Link 
              href="#team" 
              className={`professional-link text-sm font-medium ${activeSection === 'team' ? 'nav-link-active' : ''}`}
            >
              Team
            </Link>
            <Link 
              href="#insights" 
              className={`professional-link text-sm font-medium ${activeSection === 'insights' ? 'nav-link-active' : ''}`}
            >
              Insights
            </Link>
            <Link 
              href="#contact" 
              className={`professional-link text-sm font-medium ${activeSection === 'contact' ? 'nav-link-active' : ''}`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link 
              href="#contact" 
              className="btn-primary inline-block"
            >
              Get Legal Counsel
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-blue-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="#about" className="professional-link text-sm font-medium">About</Link>
              <Link href="#practice-areas" className="professional-link text-sm font-medium">Practice Areas</Link>
              <Link href="#team" className="professional-link text-sm font-medium">Team</Link>
              <Link href="#insights" className="professional-link text-sm font-medium">Insights</Link>
              <Link href="#contact" className="professional-link text-sm font-medium">Contact</Link>
              <Link href="#contact" className="btn-primary inline-block mt-4">Get Legal Counsel</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
