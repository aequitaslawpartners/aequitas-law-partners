'use client'

import { useState, useEffect } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function PeopleSlider() {
  const [sliderRef, sliderVisible] = useScrollAnimation({ threshold: 0.1 })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Sample team members data with professional images
  const teamMembers = [
    {
      id: 1,
      name: "Advocate Rajesh Kumar",
      position: "Senior Partner",
      specialization: "Corporate Law & M&A",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Leading corporate transactions with over 15 years of experience in mergers, acquisitions, and regulatory compliance."
    },
    {
      id: 2,
      name: "Advocate Priya Sharma",
      position: "Partner",
      specialization: "Intellectual Property & Technology",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Expert in IP law, technology transfers, and digital governance with extensive experience in tech sector legal frameworks."
    },
    {
      id: 3,
      name: "Advocate Arjun Patel",
      position: "Senior Associate",
      specialization: "Commercial Litigation & Arbitration",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Specializes in complex commercial disputes, international arbitration, and regulatory enforcement matters."
    },
    {
      id: 4,
      name: "Advocate Meera Singh",
      position: "Partner",
      specialization: "Banking & Finance Law",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Advises on banking regulations, financial services compliance, and structured finance transactions."
    },
    {
      id: 5,
      name: "Advocate Vikram Gupta",
      position: "Senior Associate",
      specialization: "Securities & Capital Markets",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Expert in securities law, IPOs, private placements, and capital market regulatory compliance."
    },
    {
      id: 6,
      name: "Advocate Kavya Reddy",
      position: "Associate",
      specialization: "Employment & Labor Law",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Handles employment disputes, labor compliance, and workplace policy development for corporate clients."
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % teamMembers.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, teamMembers.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section ref={sliderRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${sliderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Distinguished Legal Professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team combines deep legal expertise with practical business acumen to deliver exceptional results for our clients.
          </p>
        </div>

        {/* Image Slider */}
        <div className={`relative transition-all duration-1000 delay-300 ${sliderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Slider Container */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {teamMembers.map((member, index) => (
                <div key={member.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-0 min-h-[600px]">
                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                          {member.position}
                        </span>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-lg font-medium text-blue-600 mb-6">
                          {member.specialization}
                        </p>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed text-lg mb-8">
                        {member.description}
                      </p>
                      
                      {/* Professional Stats */}
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">15+</div>
                          <div className="text-sm text-gray-500">Years Experience</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">200+</div>
                          <div className="text-sm text-gray-500">Cases Handled</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full text-sm font-medium transition-colors"
            >
              {isAutoPlaying ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6"></path>
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1"></path>
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
