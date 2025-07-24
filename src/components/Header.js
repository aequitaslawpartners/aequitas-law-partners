'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / documentHeight) * 100
      setScrollProgress(progress)

      // Update active section
      const sections = ['hero', 'practice-areas', 'team', 'insights', 'about']
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
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      
      <header className="nav-professional sticky top-0 z-30">
      <div className="container-max">
        <div className="flex items-center justify-between lg:justify-between py-4">
          {/* Logo - image visible on all devices, text hidden on mobile */}
          <Link 
            href="/" 
            className="flex items-center space-x-3"
          >
            <img 
              src="/Logo.jpg" 
              alt="Aequitas Law Partners" 
              className="h-24 lg:w-auto object-contain"
            />
            <div className="hidden md:block">
              <div className="font-bold text-xl text-gray-900">Aequitas Law Partners</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Legal Excellence</div>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/#practice-areas" 
              className={`professional-link nav-link-animation text-sm font-medium ${activeSection === 'practice-areas' ? 'nav-link-active' : ''}`}
            >
              Expertise
            </Link>
            <Link 
              href="/people" 
              className="professional-link nav-link-animation text-sm font-medium"
            >
              People
            </Link>
            <Link 
              href="/#insights" 
              className={`professional-link nav-link-animation text-sm font-medium ${activeSection === 'insights' ? 'nav-link-active' : ''}`}
            >
              Thought Leadership
            </Link>
            <Link 
              href="/#about" 
              className={`professional-link nav-link-animation text-sm font-medium ${activeSection === 'about' ? 'nav-link-active' : ''}`}
            >
              Legacy
            </Link>
          </nav>

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
            <div className="flex flex-col space-y-4 items-end">
              <Link href="/#practice-areas" className="professional-link text-sm font-medium">Expertise</Link>
              <Link href="/people" className="professional-link text-sm font-medium">People</Link>
              <Link href="/#insights" className="professional-link text-sm font-medium">Thought Leadership</Link>
              <Link href="/#about" className="professional-link text-sm font-medium">Legacy</Link>
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  )
}
