'use client'

import { useState, useEffect } from 'react'

export default function DisclaimerModal() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already agreed to disclaimer and if it's still valid
    const disclaimerData = localStorage.getItem('disclaimerAgreed')
    
    if (disclaimerData) {
      try {
        const { timestamp } = JSON.parse(disclaimerData)
        const oneHourInMs = 60 * 60 * 1000 // 1 hour in milliseconds
        const currentTime = new Date().getTime()
        
        // Check if more than 1 hour has passed
        if (currentTime - timestamp > oneHourInMs) {
          // Remove expired disclaimer agreement
          localStorage.removeItem('disclaimerAgreed')
          setIsVisible(true)
        }
      } catch (error) {
        // If parsing fails, remove the item and show disclaimer
        localStorage.removeItem('disclaimerAgreed')
        setIsVisible(true)
      }
    } else {
      // No disclaimer agreement found, show the modal
      setIsVisible(true)
    }
  }, [])

  const handleAgree = () => {
    // Store agreement with timestamp
    const agreementData = {
      agreed: true,
      timestamp: new Date().getTime()
    }
    localStorage.setItem('disclaimerAgreed', JSON.stringify(agreementData))
    setIsVisible(false)
  }

  const handleDisagree = () => {
    // Redirect to a different page or close the tab
    window.location.href = 'about:blank'
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-900 to-secondary-500 text-white p-4 rounded-t-lg">
          <h2 className="text-xl md:text-2xl text-white font-bold text-center">DISCLAIMER</h2>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">

          <div className="text-gray-700 leading-relaxed space-y-3 text-sm md:text-base">
            <p>
              I acknowledge that there has been no solicitation, invitation or inducement of any sort
              whatsoever from Aequitas Law Partners or any of its members to create an Attorney-Client
              relationship through this website. By proceeding further and clicking on the "AGREE" button,
              herein below, I, being the user of the website (www.alplaw.in), acknowledge and confirm the
              following:
            </p>

            <ul className="space-y-3 ml-2 md:ml-4">
              <li className="flex items-start">
                <span className="text-secondary-500 font-bold mr-2 mt-1">•</span>
                <span>
                  This website (www.alplaw.in) is owned and operated by Aequitas Law Partners LLP
                  ("ALP") and is a resource for your informational and educational purposes only.
                </span>
              </li>

              <li className="flex items-start">
                <span className="text-secondary-500 font-bold mr-2 mt-1">•</span>
                <span>
                  ALP assumes no liability for the interpretation and/or use of the content and/or
                  information contained on this website, nor does it offer any warranty of any kind, either
                  expressed or implied in relation to such content or information on this website.
                </span>
              </li>

              <li className="flex items-start">
                <span className="text-secondary-500 font-bold mr-2 mt-1">•</span>
                <span>
                  By clicking 'I agree' and proceeding further, you acknowledge, represent and undertake
                  that you on your own accord wish to know more about ALP, its capabilities and
                  information contained on this website, for your own knowledge and information
                  purposes only. The content and information contained on this website should not be
                  construed as nor relied upon as legal advice. You as a reader or recipient of content or
                  information contained in this website should refrain from acting, based upon any or all
                  of such content or information, and should always seek the advice of competent legal
                  counsel licensed to practice the relevant law in the appropriate jurisdiction.
                </span>
              </li>

              <li className="flex items-start">
                <span className="text-secondary-500 font-bold mr-2 mt-1">•</span>
                <span>
                  This website is not intended to be, and you should not consider the content or
                  information contained herein to be an advertisement, solicitation, inducement or
                  invitation for an Attorney-Client relationship. Transmission, receipt or use of this
                  website, including content and information contained herein, does not constitute nor
                  create an Attorney-Client relationship between ALP and you.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-gray-200 p-4 md:p-6 bg-gray-50 rounded-b-lg">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleAgree}
              className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-primary-900 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-800 hover:to-secondary-400 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
            >
              AGREE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
