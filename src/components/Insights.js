'use client'

import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'

export default function Insights() {
  const [headerRef, headerVisible] = useScrollAnimation()
  const { setRef: setFeaturedRef, isVisible: isFeaturedVisible } = useStaggeredAnimation(2, { delay: 150 })
  const { setRef: setArticleRef, isVisible: isArticleVisible } = useStaggeredAnimation(4, { delay: 100 })
  const [ctaRef, ctaVisible] = useScrollAnimation()

  const insights = [
    {
      title: "Navigating India's New Data Protection Laws",
      category: "Technology Law",
      date: "July 20, 2025",
      excerpt: "A comprehensive guide to compliance with the Digital Personal Data Protection Act and its implications for businesses.",
      readTime: "5 min read",
      featured: true
    },
    {
      title: "M&A Trends in Indian Startup Ecosystem",
      category: "Corporate Law",
      date: "July 15, 2025",
      excerpt: "Analysis of recent merger and acquisition activities in India's startup landscape and regulatory considerations.",
      readTime: "4 min read",
      featured: true
    },
    {
      title: "ESG Compliance for Indian Corporations",
      category: "Corporate Governance",
      date: "July 10, 2025",
      excerpt: "Understanding Environmental, Social, and Governance requirements and their impact on corporate strategies.",
      readTime: "6 min read",
      featured: false
    },
    {
      title: "Foreign Investment Regulations Update",
      category: "Banking & Finance",
      date: "July 5, 2025",
      excerpt: "Recent changes in FDI policies and their implications for foreign investors in India.",
      readTime: "3 min read",
      featured: false
    },
    {
      title: "IP Protection Strategies for Tech Startups",
      category: "Intellectual Property",
      date: "June 30, 2025",
      excerpt: "Essential intellectual property protection strategies for technology companies and emerging businesses.",
      readTime: "7 min read",
      featured: false
    },
    {
      title: "Real Estate Investment Trusts (REITs) in India",
      category: "Real Estate",
      date: "June 25, 2025",
      excerpt: "Comprehensive overview of REIT regulations and investment opportunities in Indian real estate market.",
      readTime: "5 min read",
      featured: false
    }
  ]

  return (
    <section id="insights" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold text-blue-900 mb-6 scroll-reveal ${headerVisible ? 'visible' : ''}`}>
            Thought Leadership
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto scroll-text ${headerVisible ? 'visible' : ''}`}
             style={{ transitionDelay: headerVisible ? '0.1s' : '0s' }}>
            Stay informed with our latest legal insights, industry analysis, and thought leadership on key developments
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Featured Articles */}
          <div>
            <h3 className={`text-2xl font-bold text-blue-900 mb-8 text-center scroll-text ${headerVisible ? 'visible' : ''}`}
                style={{ transitionDelay: headerVisible ? '0.2s' : '0s' }}>
              Latest Insights
            </h3>
            
            {/* Featured Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {insights.filter(insight => insight.featured).map((insight, index) => (
                <article 
                  key={index}
                  ref={setFeaturedRef(index)}
                  className={`bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group scroll-card ${isFeaturedVisible(index) ? 'visible' : ''}`}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        {insight.category}
                      </span>
                      <span className="text-xs text-gray-500">{insight.readTime}</span>
                    </div>
                    <h4 className="text-lg font-bold text-blue-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {insight.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {insight.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{insight.date}</span>
                      <button className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors">
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* More Articles List */}
            <div className="space-y-4">
              {insights.filter(insight => !insight.featured).map((insight, index) => (
                <article 
                  key={index}
                  ref={setArticleRef(index)}
                  className={`border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors group scroll-slide-left ${isArticleVisible(index) ? 'visible' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                          {insight.category}
                        </span>
                        <span className="text-xs text-gray-500">{insight.readTime}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {insight.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {insight.excerpt}
                      </p>
                      <span className="text-xs text-gray-500">{insight.date}</span>
                    </div>
                    <button className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors ml-4">
                      Read →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div ref={ctaRef} className={`text-center mt-8 scroll-fade ${ctaVisible ? 'visible' : ''}`}>
              <a 
                href="/insights"
                className="bg-blue-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors inline-block"
              >
                View All Insights
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
