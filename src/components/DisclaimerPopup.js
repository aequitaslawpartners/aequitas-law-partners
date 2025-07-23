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
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-900 text-white p-3 rounded-lg">
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 bg-white" style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                  }}></div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Legal Disclaimer</h2>
            <p className="text-gray-600">Please read and accept our terms before proceeding</p>
          </div>

          {/* Disclaimer Content */}
          <div className="space-y-4 text-sm text-gray-700 mb-8">
            <p>
              <strong>IMPORTANT NOTICE:</strong> This website is owned and operated by Aequitas Law Partners (ALP), 
              a law firm registered under the Advocates Act, 1961.
            </p>
            
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Terms of Use:</h4>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>Information on this website is for general informational purposes only and does not constitute legal advice.</li>
                <li>Visiting this website or contacting us does not create an attorney-client relationship.</li>
                <li>Any communication through this website is not confidential or privileged.</li>
                <li>Content may not reflect the most current legal developments.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Bar Council Compliance:</h4>
              <ul className="space-y-2 list-disc list-inside ml-4">
                <li>This website complies with the Bar Council of India Rules on Professional Standards.</li>
                <li>We do not solicit work or advertise through this website.</li>
                <li>Information is provided for the benefit of existing and potential clients.</li>
              </ul>
            </div>

            <p>
              <strong>Jurisdiction:</strong> Any disputes arising from the use of this website shall be subject 
              to the exclusive jurisdiction of courts in Mumbai, India.
            </p>

            <p className="text-xs text-gray-500 italic">
              By clicking "I Agree", you acknowledge that you have read, understood, and agree to be bound by these terms.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleAgree}
              className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              I Agree - Proceed to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
