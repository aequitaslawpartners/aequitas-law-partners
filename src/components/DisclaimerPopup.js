'use client'

import { useState, useEffect } from 'react'

export default function DisclaimerPopup() {
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  useEffect(() => {
    // Check if user has already agreed to disclaimer
    const hasAgreed = localStorage.getItem('disclaimerAgreed')
    if (!hasAgreed) {
      setShowDisclaimer(true)
    }
  }, [])

  const handleAgree = () => {
    localStorage.setItem('disclaimerAgreed', 'true')
    setShowDisclaimer(false)
  }

  if (!showDisclaimer) return null

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-blue-900 text-white p-2 sm:p-3 rounded-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                  <div className="absolute inset-0 bg-white" style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                  }}></div>
                </div>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">Legal Disclaimer</h2>
            <p className="text-sm sm:text-base text-gray-600">Please read and accept our terms before proceeding</p>
          </div>

          {/* Disclaimer Content */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-gray-700 mb-6 sm:mb-8">
            <div className="space-y-3 sm:space-y-4">
              <p>
                <strong>IMPORTANT NOTICE:</strong> This website is owned and operated by Aequitas Law Partners (ALP), 
                a law firm registered under the Advocates Act, 1961.
              </p>
              
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Terms of Use:</h4>
                <ul className="space-y-1 list-disc list-inside ml-2">
                  <li>Information for general purposes only, not legal advice.</li>
                  <li>No attorney-client relationship created by visiting.</li>
                  <li>Communication through website not confidential.</li>
                  <li>Content may not reflect current legal developments.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Bar Council Compliance:</h4>
                <ul className="space-y-1 list-disc list-inside ml-2">
                  <li>Complies with Bar Council of India Professional Standards.</li>
                  <li>No solicitation or advertising through this website.</li>
                  <li>Information provided for existing and potential clients.</li>
                </ul>
              </div>

              <p>
                <strong>Jurisdiction:</strong> Disputes subject to exclusive jurisdiction of Mumbai courts, India.
              </p>

              <p className="text-xs text-gray-500 italic">
                By clicking "I Agree", you acknowledge reading and agreeing to these terms.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <button
              onClick={handleAgree}
              className="bg-blue-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium text-sm sm:text-base"
            >
              I Agree - Proceed to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
