export default function PracticeAreas() {
  const practiceAreas = [
    {
      title: "Corporate Law & M&A",
      description: "Strategic counsel for mergers, acquisitions, corporate restructuring, and governance matters.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["Due Diligence", "Contract Negotiation", "Regulatory Compliance", "Cross-border Transactions"]
    },
    {
      title: "Startup & Venture Capital",
      description: "Comprehensive legal support for emerging companies and investment transactions.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["Funding Rounds", "IP Protection", "Employment Law", "Regulatory Guidance"]
    },
    {
      title: "Banking & Finance",
      description: "Expert guidance on banking regulations, financial transactions, and compliance matters.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["Loan Documentation", "Regulatory Compliance", "Project Finance", "Debt Restructuring"]
    },
    {
      title: "Capital Markets",
      description: "End-to-end support for public offerings, listings, and securities law compliance.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["IPO Advisory", "Securities Compliance", "Investor Relations", "Market Regulations"]
    },
    {
      title: "Technology & IP Law",
      description: "Protecting innovation through comprehensive intellectual property and technology law services.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["Patent Filing", "Trademark Protection", "Tech Licensing", "Data Privacy"]
    },
    {
      title: "Dispute Resolution",
      description: "Strategic litigation and alternative dispute resolution across commercial matters.",
      image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      services: ["Commercial Litigation", "Arbitration", "Mediation", "Regulatory Disputes"]
    }
  ]

  return (
    <section id="practice-areas" className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-blue-900 uppercase tracking-wide">Our Expertise</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-6">
            Practice Areas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive legal solutions across key practice areas, 
            delivering strategic counsel for complex business challenges.
          </p>
        </div>

        {/* Practice Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {practiceAreas.map((area, index) => (
            <div key={index} className="professional-card group">
              {/* Image */}
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${area.image})` }}></div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">
                  {area.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {area.description}
                </p>
                
                {/* Services */}
                <ul className="professional-list text-sm text-gray-600 mb-4">
                  {area.services.map((service, serviceIndex) => (
                    <li key={serviceIndex}>{service}</li>
                  ))}
                </ul>
                
                <button className="text-blue-900 font-medium text-sm hover:text-blue-700 transition-colors">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Specialized Legal Counsel?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our experienced team provides tailored solutions for complex legal challenges. 
            Contact us to discuss your specific requirements.
          </p>
          <a href="#contact" className="btn-primary">
            Schedule Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
