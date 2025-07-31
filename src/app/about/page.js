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
      content: 'At ALP, we lead with ethics, taking full accountability for every decision. With precision at our core, we deliver solutions rooted in integrity, transparency and excellence.',
      highlight: 'Precision',
      color: 'primary-900',
      bgColor: 'primary-50'
    },
    {
      letter: 'L',
      title: 'Legal Insight with Innovation in thought',
      content: 'At ALP, we don’t just interpret the law, we anticipate its impact. Our legal insight and innovative thinking turn complexity into clarity, delivering solutions that are both strategic and effective.',
      highlight: 'Innovation',
      color: 'primary-900',
      bgColor: 'primary-50'
    },
    {
      letter: 'P',
      title: 'Partnership built on Equity at core',
      content: 'At ALP, we build enduring partnerships grounded in equity. Every relationship is shaped by fairness, respect and shared goals, strengthened through genuine collaboration.',
      highlight: 'Equity',
      color: 'primary-900',
      bgColor: 'primary-50'
    }
  ]

  const renderHighlightedText = (text, sectionLetter) => {
    // Define words to highlight for each section
    const wordsToHighlight = {
      'A': ['Accountability', 'Precision'],
      'L': ['Insight', 'Innovation'], 
      'P': ['Partnership', 'Equity']
    }
    
    const keyWords = wordsToHighlight[sectionLetter] || []
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
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">Who We Are</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed ">
                  We are a firm built for impact, designed to achieve unparalleled outcomes through sharp insight, precision and seamless execution. At ALP, we combine legal excellence with innovation and strategic foresight, delivering solutions that not only solve problems but shape the course of our clients’ futures. We don’t just advise, we partner, guide and empower with clarity, agility and purpose.
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
                Each letter in ALP embodies the pillars of the Firm's identity and approach
              </h2>
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
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                      {alpSections[activeSection].letter} - {renderHighlightedText(alpSections[activeSection].title, alpSections[activeSection].letter)}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {renderHighlightedText(alpSections[activeSection].content, alpSections[activeSection].letter)}
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
                      <div className={`w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-xl mr-4 ${
                        section.letter === 'A' ? 'bg-primary-900' :
                        section.letter === 'L' ? 'bg-secondary-500' :
                        'bg-blue-600'
                      }`}>
                        {section.letter}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-primary-900 mb-3">
                      {renderHighlightedText(section.title, section.letter)}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {renderHighlightedText(section.content.substring(0, 100) + '...', section.letter)}
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
