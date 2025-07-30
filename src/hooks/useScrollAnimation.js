'use client'

import { useState, useEffect, useRef } from 'react'

export function useScrollAnimation(options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Always update visibility based on intersection
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -20px 0px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [])

  return [elementRef, isVisible]
}

export function useStaggeredAnimation(count, options = {}) {
  const [visibleItems, setVisibleItems] = useState(new Set())
  const elementRefs = useRef([])
  const timeoutRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = elementRefs.current.indexOf(entry.target)
          if (index !== -1) {
            if (entry.isIntersecting) {
              // Clear any existing timeout for this index
              if (timeoutRefs.current[index]) {
                clearTimeout(timeoutRefs.current[index])
              }
              
              // Set timeout for staggered animation
              timeoutRefs.current[index] = setTimeout(() => {
                setVisibleItems(prev => new Set(prev).add(index))
              }, index * (options.delay || 100))
            } else {
              // Clear timeout and remove from visible items when not intersecting
              if (timeoutRefs.current[index]) {
                clearTimeout(timeoutRefs.current[index])
                timeoutRefs.current[index] = null
              }
              setVisibleItems(prev => {
                const newSet = new Set(prev)
                newSet.delete(index)
                return newSet
              })
            }
          }
        })
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -20px 0px'
      }
    )

    elementRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => {
      // Clear all timeouts on cleanup
      timeoutRefs.current.forEach(timeout => {
        if (timeout) clearTimeout(timeout)
      })
      elementRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [count])

  const setRef = (index) => (el) => {
    elementRefs.current[index] = el
  }

  const isVisible = (index) => visibleItems.has(index)

  return { setRef, isVisible }
}
