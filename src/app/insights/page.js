export default function AllInsights() {
  const allInsights = [
    {
      title: "Navigating India's New Data Protection Laws",
      category: "Technology Law",
      date: "July 20, 2025",
      excerpt: "A comprehensive guide to compliance with the Digital Personal Data Protection Act and its implications for businesses.",
      readTime: "5 min read",
      featured: true,
      author: "Legal Team",
      tags: ["Data Protection", "Privacy Law", "Compliance"]
    },
    {
      title: "M&A Trends in Indian Startup Ecosystem",
      category: "Corporate Law",
      date: "July 15, 2025",
      excerpt: "Analysis of recent merger and acquisition activities in India's startup landscape and regulatory considerations.",
      readTime: "4 min read",
      featured: true,
      author: "Legal Team",
      tags: ["M&A", "Startups", "Corporate Law"]
    },
    {
      title: "ESG Compliance for Indian Corporations",
      category: "Corporate Governance",
      date: "July 10, 2025",
      excerpt: "Understanding Environmental, Social, and Governance requirements and their impact on corporate strategies.",
      readTime: "6 min read",
      featured: false,
      author: "Legal Team",
      tags: ["ESG", "Compliance", "Corporate Governance"]
    },
    {
      title: "Foreign Investment Regulations Update",
      category: "Banking & Finance",
      date: "July 5, 2025",
      excerpt: "Recent changes in FDI policies and their implications for foreign investors in India.",
      readTime: "3 min read",
      featured: false,
      author: "Legal Team",
      tags: ["FDI", "Banking", "Investment"]
    },
    {
      title: "IP Protection Strategies for Tech Startups",
      category: "Intellectual Property",
      date: "June 30, 2025",
      excerpt: "Essential intellectual property protection strategies for technology companies and emerging businesses.",
      readTime: "7 min read",
      featured: false,
      author: "Legal Team",
      tags: ["IP", "Technology", "Startups"]
    },
    {
      title: "Real Estate Investment Trusts (REITs) in India",
      category: "Real Estate",
      date: "June 25, 2025",
      excerpt: "Comprehensive overview of REIT regulations and investment opportunities in Indian real estate market.",
      readTime: "5 min read",
      featured: false,
      author: "Legal Team",
      tags: ["REITs", "Real Estate", "Investment"]
    },
    {
      title: "Labor Law Reforms and Employment Compliance",
      category: "Employment Law",
      date: "June 20, 2025",
      excerpt: "Impact of recent labor law reforms on business operations and employment practices in India.",
      readTime: "6 min read",
      featured: false,
      author: "Legal Team",
      tags: ["Labor Law", "Employment", "Compliance"]
    },
    {
      title: "Capital Markets and Public Offerings Guide",
      category: "Capital Markets",
      date: "June 15, 2025",
      excerpt: "Complete guide to IPO processes, regulatory requirements, and capital market regulations in India.",
      readTime: "8 min read",
      featured: false,
      author: "Legal Team",
      tags: ["IPO", "Capital Markets", "Securities"]
    },
    {
      title: "Tax Implications of Digital Business Models",
      category: "Tax Law",
      date: "June 10, 2025",
      excerpt: "Understanding tax obligations and planning strategies for digital economy businesses.",
      readTime: "5 min read",
      featured: false,
      author: "Legal Team",
      tags: ["Tax", "Digital Economy", "Business"]
    },
    {
      title: "Corporate Restructuring and Insolvency Laws",
      category: "Corporate Law",
      date: "June 5, 2025",
      excerpt: "Comprehensive analysis of corporate restructuring options under India's insolvency framework.",
      readTime: "7 min read",
      featured: false,
      author: "Legal Team",
      tags: ["Restructuring", "Insolvency", "Corporate Law"]
    },
    {
      title: "Banking Regulations and Fintech Compliance",
      category: "Banking & Finance",
      date: "May 30, 2025",
      excerpt: "Regulatory landscape for fintech companies and compliance requirements in the banking sector.",
      readTime: "6 min read",
      featured: false,
      author: "Legal Team",
      tags: ["Banking", "Fintech", "Compliance"]
    },
    {
      title: "Environmental Law and Sustainable Business",
      category: "Environmental Law",
      date: "May 25, 2025",
      excerpt: "Environmental compliance requirements and sustainable business practices for Indian companies.",
      readTime: "5 min read",
      featured: false,
      author: "Legal Team",
      tags: ["Environment", "Sustainability", "Compliance"]
    }
  ]

  const categories = ["All", "Corporate Law", "Technology Law", "Banking & Finance", "Intellectual Property", "Real Estate", "Employment Law", "Capital Markets", "Tax Law", "Environmental Law"]

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Legal Insights & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive collection of legal analysis, industry insights, and thought leadership from our expert team
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                index === 0 
                  ? 'bg-blue-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allInsights.map((insight, index) => (
            <article 
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
                    {insight.category}
                  </span>
                </div>
                {insight.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{insight.date}</span>
                  <span>{insight.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors line-clamp-2">
                  {insight.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {insight.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {insight.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {insight.author}</span>
                  <button className="text-blue-900 font-medium text-sm hover:text-blue-700 transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium">
            Load More Articles
          </button>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-20 bg-blue-900 rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Legal Insights
          </h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest legal updates, insights, and analysis delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
            <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
