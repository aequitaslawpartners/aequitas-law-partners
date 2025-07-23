export default function PracticeAreas() {
  const practiceAreas = [
    {
      title: "Corporate Law & M&A",
      description: "Strategic counsel for mergers, acquisitions, corporate restructuring, and governance matters.",
      icon: "🏢",
      features: ["Due Diligence", "Contract Negotiation", "Regulatory Compliance", "Cross-border Transactions"]
    },
    {
      title: "Startup & Venture Capital",
      description: "Comprehensive legal support for emerging companies and investment transactions.",
      icon: "🚀",
      features: ["Funding Rounds", "IP Protection", "Employment Law", "Regulatory Guidance"]
    },
    {
      title: "Banking & Finance",
      description: "Expert guidance on banking regulations, financial transactions, and compliance matters.",
      icon: "🏦",
      features: ["Loan Documentation", "Regulatory Compliance", "Project Finance", "Debt Restructuring"]
    },
    {
      title: "Capital Markets",
      description: "End-to-end support for public offerings, listings, and securities law compliance.",
      icon: "📈",
      features: ["IPO Advisory", "Securities Compliance", "Investor Relations", "Market Regulations"]
    },
    {
      title: "Technology & IP Law",
      description: "Protecting innovation through comprehensive intellectual property and technology law services.",
      icon: "💡",
      features: ["Patent Filing", "Trademark Protection", "Tech Licensing", "Data Privacy"]
    },
    {
      title: "Dispute Resolution",
      description: "Strategic litigation and alternative dispute resolution across commercial matters.",
      icon: "⚖️",
      features: ["Commercial Litigation", "Arbitration", "Mediation", "Regulatory Disputes"]
    },
    {
      title: "Real Estate Law",
      description: "Comprehensive legal services for real estate transactions and property development.",
      icon: "🏗️",
      features: ["Property Transactions", "Development Projects", "Leasing", "Land Acquisition"]
    },
    {
      title: "Employment & Labor",
      description: "Strategic counsel on employment law, labor relations, and workplace compliance.",
      icon: "👥",
      features: ["Employment Contracts", "Labor Compliance", "HR Policies", "Workplace Disputes"]
    },
    {
      title: "Tax & Regulatory",
      description: "Expert guidance on tax planning, regulatory compliance, and government relations.",
      icon: "📋",
      features: ["Tax Planning", "Regulatory Compliance", "Government Affairs", "Policy Advisory"]
    }
  ]

  return (
    <section id="practice-areas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Our Practice Areas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep sectoral expertise across services and industries, delivering strategic solutions for complex legal challenges
          </p>
        </div>

        {/* Practice Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {practiceAreas.map((area, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="text-4xl mb-4">{area.icon}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors">
                {area.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {area.description}
              </p>
              <ul className="space-y-2">
                {area.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Need Expert Legal Counsel?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our experienced team is ready to provide strategic guidance tailored to your specific needs. 
            Contact us for a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors">
              Schedule Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition-colors">
              View All Services
            </button>
          </div>
        </div>

        {/* Industry Focus */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Industry Focus
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: "Technology", icon: "💻" },
              { name: "Healthcare", icon: "🏥" },
              { name: "Financial Services", icon: "💰" },
              { name: "Manufacturing", icon: "🏭" },
              { name: "Energy", icon: "⚡" },
              { name: "Retail", icon: "🛍️" }
            ].map((industry, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {industry.icon}
                </div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-blue-900 transition-colors">
                  {industry.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
