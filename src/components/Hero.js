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
      {/* <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-800"
        style={{ 
          opacity: 0.4 + (scrollY * 0.001),
          transform: `scale(${1 + scrollY * 0.0001})`
        }}
      ></div> */}

      {/* Floating Background Elements with Scroll Response */}
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


      {/* Content - Always Visible */}
      <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-96"
              style={{ 
                transform: `translateY(${scrollY * 0.1}px)`,
                opacity: Math.max(0.3, 1 - scrollY * 0.001)
              }}>
            <span className="block text-left">Aequitas Law Partners</span>
          </h1>
        </div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
           style={{ 
             transform: `translateX(-50%) translateY(${Math.sin(scrollY * 0.01) * 10}px)`,
             opacity: Math.max(0.3, 1 - scrollY * 0.002)
           }}>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </section>
  )
}
