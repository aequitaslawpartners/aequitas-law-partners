'use client'

import { useState, useEffect } from 'react'

export default function DisclaimerPopup() {
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  useEffect(() => {
    // Check if user has already agreed to disclaimer
    const hasAgreed = localStorage.getItem('disclaimerAgreed')
    if (!hasAgreed) {
      // Show popup after a short delay to allow page to load
      const timer = setTimeout(() => {
        setShowDisclaimer(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAgree = () => {
    localStorage.setItem('disclaimerAgreed', 'true')
    setShowDisclaimer(false)
  }

  if (!showDisclaimer) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-20"
        style={{ 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      ></div>
      
      {/* Popup Content */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-5 rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Legal Disclaimer</h2>
              <p className="text-blue-100 text-sm">Please read before proceeding</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4">
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              <strong>Aequitas Law Partners</strong> provides this website for informational purposes only. 
              The content does not constitute legal advice and should not be relied upon as such.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Important Notice:</h4>
                  <ul className="space-y-1 list-disc list-inside text-gray-600">
                    <li>Information for general purposes only</li>
                    <li>No attorney-client relationship created</li>
                    <li>Communication not confidential</li>
                    <li>Content may not reflect current law</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Bar Council Compliance:</h4>
                  <ul className="space-y-1 list-disc list-inside text-gray-600">
                    <li>Complies with professional standards</li>
                    <li>No solicitation through this website</li>
                    <li>Information for existing/potential clients</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                By clicking "I Agree", you acknowledge reading and agreeing to these terms. 
                Disputes subject to exclusive jurisdiction of Mumbai courts, India.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-center rounded-b-xl">
          <button
            onClick={handleAgree}
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 shadow-lg"
          >
            I Understand & Agree
          </button>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent opacity-30 rounded-full transform translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-50 to-transparent opacity-20 rounded-full transform -translate-x-10 translate-y-10"></div>
      </div>
    </div>
  )
}
