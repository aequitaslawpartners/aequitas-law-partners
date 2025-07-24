'use client'

import { useEffect, useState } from 'react'

export function useScrollEffects() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (currentScrollY / maxScroll) * 100

      setScrollY(currentScrollY)
      setScrollProgress(progress)

      // Apply parallax effects to elements with data-parallax attribute
      const parallaxElements = document.querySelectorAll('[data-parallax]')
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5
        const rect = element.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const windowCenter = window.innerHeight / 2
        const scrollDistance = (elementCenter - windowCenter) * speed
        
        element.style.transform = `translateY(${scrollDistance}px)`
      })

      // Apply scale effects to elements with data-scale attribute
      const scaleElements = document.querySelectorAll('[data-scale]')
      scaleElements.forEach(element => {
        const maxScale = parseFloat(element.dataset.scale) || 1.1
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top
        const elementHeight = rect.height
        const windowHeight = window.innerHeight
        
        // Calculate scale based on element position in viewport
        if (elementTop < windowHeight && elementTop + elementHeight > 0) {
          const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))
          const scale = 1 + (maxScale - 1) * progress
          element.style.transform = `scale(${scale})`
        }
      })

      // Apply rotation effects to elements with data-rotate attribute
      const rotateElements = document.querySelectorAll('[data-rotate]')
      rotateElements.forEach(element => {
        const maxRotation = parseFloat(element.dataset.rotate) || 5
        const rect = element.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const windowCenter = window.innerHeight / 2
        const rotation = ((elementCenter - windowCenter) / windowCenter) * maxRotation
        
        element.style.transform = `rotate(${rotation}deg)`
      })

      // Apply floating effects to elements with data-float attribute
      const floatElements = document.querySelectorAll('[data-float]')
      floatElements.forEach(element => {
        const amplitude = parseFloat(element.dataset.float) || 10
        const frequency = 0.002
        const offset = currentScrollY * frequency
        const floatY = Math.sin(offset) * amplitude
        
        element.style.transform = `translateY(${floatY}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, scrollProgress }
}

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return offset
}
