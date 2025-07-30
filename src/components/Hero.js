'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useSimpleScroll } from '@/hooks/useSimpleScroll'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 })
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const scrollY = useSimpleScroll()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Set initial load to false after component mounts
    const timer = setTimeout(() => setIsInitialLoad(false), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Calculate scroll progress safely on client side
    if (typeof window !== 'undefined') {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(100, (scrollY / maxScroll) * 100) : 0
      setScrollProgress(progress)
    }
  }, [scrollY])

  // Show animations on initial load or when visible
  const shouldShowAnimation = isInitialLoad || heroVisible

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-blue-900 overflow-hidden">
      {/* Video Background */}
      <video 
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: 0.8
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/peak3.mp4" type="video/mp4" />
        <source src="/peak2.gif" type="image/gif" />
        Your browser does not support the video tag.
      </video>

      {/* Dynamic Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-800"
        style={{ 
          opacity: 0.4 + (scrollY * 0.001),
          transform: `scale(${1 + scrollY * 0.0001})`
        }}
      ></div>

      {/* Floating Background Elements with Scroll Response */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-white opacity-5 rounded-full"
           style={{ 
             transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px) rotate(${scrollY * 0.1}deg)`,
             opacity: Math.max(0.02, 0.05 - scrollY * 0.00005)
           }}></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-white opacity-3 rounded-full"
           style={{ 
             transform: `translate(${-scrollY * 0.2}px, ${scrollY * 0.15}px) rotate(${-scrollY * 0.05}deg)`,
             opacity: Math.max(0.01, 0.03 - scrollY * 0.00003)
           }}></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white opacity-4 rounded-full"
           style={{ 
             transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.25}px) scale(${1 + scrollY * 0.0001})`,
             opacity: Math.max(0.02, 0.04 - scrollY * 0.00004)
           }}></div>

      {/* Visible Scroll Indicators */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <div className="w-2 h-32 bg-white opacity-20 rounded-full">
          <div 
            className="w-full bg-blue-300 rounded-full transition-all duration-100"
            style={{ height: `${Math.min(100, scrollProgress * 3)}%` }}
          ></div>
        </div>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <div className="flex flex-col space-y-2">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="w-3 h-3 rounded-full border-2 border-white transition-all duration-300"
              style={{ 
                backgroundColor: scrollY > i * 100 ? 'white' : 'transparent',
                transform: `scale(${1 + (scrollY * 0.001)})`,
                opacity: Math.max(0.3, 1 - scrollY * 0.001)
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content - Always Visible */}
      <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
              style={{ 
                transform: `translateY(${scrollY * 0.1}px)`,
                opacity: Math.max(0.3, 1 - scrollY * 0.001)
              }}>
            <span className="block">Aequitas Law Partners</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-light mt-2 text-gray-200">
              Elevating Justice in Business
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl leading-relaxed"
             style={{ 
               transform: `translateY(${scrollY * 0.05}px)`,
               opacity: Math.max(0.2, 1 - scrollY * 0.002)
             }}>
            Facilitating commercial legal solutions with precision, integrity, and excellence.
            Leveraging insight to script legal discourse across corporate India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12"
               style={{ 
                 transform: `translateY(${scrollY * 0.02}px)`,
                 opacity: Math.max(0.1, 1 - scrollY * 0.003)
               }}>
            <a href="#practice-areas" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Explore Expertise
            </a>
            <a href="#insights" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Thought Leadership
            </a>
          </div>
        </div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
           style={{ 
             transform: `translateX(-50%) translateY(${Math.sin(scrollY * 0.01) * 10}px)`,
             opacity: Math.max(0.3, 1 - scrollY * 0.002)
           }}>
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white transition-transform duration-300" 
               style={{ transform: `rotate(${scrollY * 0.1}deg)` }}
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Moving Elements that clearly show scroll */}
      <div className="fixed bottom-4 right-4 z-40">
        <div 
          className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
          style={{ 
            transform: `rotate(${scrollY * 0.5}deg) scale(${1 + Math.sin(scrollY * 0.01) * 0.1})`,
          }}
        >
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  )
}
