export default function Insights() {
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

  const events = [
    {
      title: "Corporate Law Summit 2025",
      date: "August 15, 2025",
      location: "Mumbai",
      type: "Conference"
    },
    {
      title: "Startup Legal Workshop",
      date: "August 10, 2025",
      location: "Bangalore",
      type: "Workshop"
    },
    {
      title: "IP Law Roundtable",
      date: "August 5, 2025",
      location: "Delhi",
      type: "Roundtable"
    }
  ]

  return (
    <section id="insights" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Insights & Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with our latest legal insights, industry analysis, and thought leadership on key developments
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Featured Articles */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-blue-900 mb-8">Latest Insights</h3>
            
            {/* Featured Articles Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {insights.filter(insight => insight.featured).map((insight, index) => (
                <article 
                  key={index}
                  className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
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
                  className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors group"
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

            <div className="text-center mt-8">
              <a 
                href="/insights"
                className="bg-blue-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors inline-block"
              >
                View All Insights
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Newsletter Signup */}
            <div className="bg-blue-900 text-white p-8 rounded-2xl">
              <h4 className="text-xl font-bold mb-4">Stay Updated</h4>
              <p className="text-blue-200 mb-6 text-sm">
                Subscribe to our newsletter for the latest legal insights and industry updates.
              </p>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button className="w-full bg-yellow-500 text-blue-900 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h4 className="text-xl font-bold text-blue-900 mb-6">Upcoming Events</h4>
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4">
                    <h5 className="font-semibold text-blue-900">{event.title}</h5>
                    <p className="text-sm text-gray-600">{event.date}</p>
                    <p className="text-sm text-gray-600">{event.location} • {event.type}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 bg-blue-100 text-blue-900 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                View All Events
              </button>
            </div>

            {/* Download Resources */}
            <div className="bg-white border-2 border-gray-200 p-8 rounded-2xl">
              <h4 className="text-xl font-bold text-blue-900 mb-6">Legal Resources</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h6 className="font-medium text-gray-900">Startup Legal Guide</h6>
                    <p className="text-xs text-gray-600">PDF • 2.5 MB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h6 className="font-medium text-gray-900">M&A Checklist</h6>
                    <p className="text-xs text-gray-600">PDF • 1.8 MB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h6 className="font-medium text-gray-900">IP Protection Guide</h6>
                    <p className="text-xs text-gray-600">PDF • 3.2 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
