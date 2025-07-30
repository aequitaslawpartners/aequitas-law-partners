'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(null)

  const alpSections = [
    {
      letter: 'A',
      title: 'Accountability and Precision at practice',
      content: 'At ALP, we lead with ethics and stand behind every action. Integrity is the bedrock of trust and the Firm holds itself accountable to the high standards, transparency and principles.',
      highlight: 'Precision',
      color: 'primary-900',
      bgColor: 'primary-50',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      letter: 'L',
      title: 'Legal Insight with Innovation in thought',
      content: 'At ALP, we go beyond interpreting the law. We understand the real-world impact. With strategic and astute legal counsel, we bring clarity and simplicity to complex issues and deliver solutions that are both practical and commercially effective.',
      highlight: 'Innovation',
      color: 'secondary-500',
      bgColor: 'secondary-50',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      letter: 'P',
      title: 'Partnership Built on Equity at core',
      content: 'At ALP, we see our clients as long-term partners. We value fairness, respect and inclusion in every interaction and focus on building relationships that are genuine, collaborative and aligned with our clients\' goals for the long term.',
      highlight: 'Equity',
      color: 'neutral-600',
      bgColor: 'neutral-50',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      )
    }
  ]

  const renderHighlightedText = (text, highlight) => {
    // Highlight all three key words: Precision, Innovation, and Equity
    const keyWords = ['Precision', 'Innovation', 'Equity']
    let highlightedText = text
    
    keyWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi')
      highlightedText = highlightedText.replace(regex, `<span class="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent font-bold">$1</span>`)
    })
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
  }

  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-900 to-secondary-500 py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              About ALP
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              More Than a Name, A Commitment
            </p>
          </div>
        </section>

        {/* Vision Statement Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">Vision Statement</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  A distinguished legal firm founded on the principles of justice, fairness and integrity, we offer strategic and legal counsel to global clients with precision and purpose. Dedicated to advancing our clients' interests with clarity, conviction and credibility, we combine deep insight with innovation to navigate the evolving legal landscape and deliver <span className="font-semibold text-primary-900">lasting impact</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive ALP Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                ALP – More Than a Name, A Commitment
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each letter in ALP embodies the pillars of the Firm's identity and approach
              </p>
            </div>

            {/* Large ALP Letters */}
            <div className="flex justify-center items-center mb-16 space-x-8 md:space-x-16">
              {alpSections.map((section, index) => (
                <button
                  key={section.letter}
                  onClick={() => setActiveSection(activeSection === index ? null : index)}
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-full font-bold text-4xl md:text-5xl transition-all duration-300 transform hover:scale-110 shadow-lg ${
                    activeSection === index 
                      ? `bg-${section.color} text-white shadow-2xl scale-110` 
                      : `bg-white text-${section.color} hover:bg-${section.bgColor}`
                  }`}
                >
                  {section.letter}
                </button>
              ))}
            </div>

            {/* Active Section Content */}
            {activeSection !== null && (
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto transform transition-all duration-500 ease-out animate-fadeIn">
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 rounded-full bg-${alpSections[activeSection].bgColor} flex items-center justify-center flex-shrink-0`}>
                    <div className={`text-${alpSections[activeSection].color}`}>
                      {alpSections[activeSection].icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                      {alpSections[activeSection].letter} – {renderHighlightedText(alpSections[activeSection].title, alpSections[activeSection].highlight)}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {renderHighlightedText(alpSections[activeSection].content, alpSections[activeSection].highlight)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Default State - All Three Sections */}
            {activeSection === null && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {alpSections.map((section, index) => (
                  <div 
                    key={section.letter}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => setActiveSection(index)}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full bg-${section.color} text-white flex items-center justify-center font-bold text-xl mr-4`}>
                        {section.letter}
                      </div>
                      <div className={`text-${section.color}`}>
                        {section.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-primary-900 mb-3">
                      {renderHighlightedText(section.title, section.highlight)}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {renderHighlightedText(section.content.substring(0, 100) + '...', section.highlight)}
                    </p>
                    <button className="mt-4 text-primary-600 hover:text-primary-800 font-medium text-sm">
                      Learn more →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-br from-primary-900 to-secondary-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experience the ALP Difference
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Partner with us for legal excellence built on accountability, innovation, and equity
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button className="bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg w-full sm:w-auto">
                Get in Touch
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-900 transition-colors duration-300 w-full sm:w-auto">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
