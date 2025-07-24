export default function Team() {
  const teamMembers = [
    {
      name: "Person 1",
      position: "Founding Partner & Managing Director",
      specialization: "Corporate Law, M&A",
      experience: "25+ years",
      education: "LLM, BA(Hons)",
      description: "Leading expert in corporate law and cross-border transactions with extensive experience in complex M&A deals.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Person 2",
      position: "Senior Partner",
      specialization: "Startup & Venture Capital",
      experience: "18+ years",
      education: "JD, BCom",
      description: "Specializes in startup law and venture capital transactions, helping emerging companies navigate regulatory landscapes.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Person 3",
      position: "Partner",
      specialization: "Banking & Finance",
      experience: "15+ years",
      education: "LLM, LLB",
      description: "Expert in banking law and financial regulations with deep understanding of compliance requirements.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]

  return (
    <section id="team" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-blue-900 uppercase tracking-wide">Our Team</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-6">
            Legal Excellence, Personified
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our distinguished team of legal professionals brings decades of experience 
            and deep expertise across multiple practice areas.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="professional-card text-center group">
              {/* Image */}
              <div className="p-6 pb-0">
                <div 
                  className="w-32 h-32 mx-auto rounded-full bg-cover bg-center mb-6 border-4 border-gray-100"
                  style={{ backgroundImage: `url(${member.image})` }}
                ></div>
              </div>
              
              {/* Content */}
              <div className="p-6 pt-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-900 font-medium mb-1">{member.position}</div>
                <div className="text-sm text-gray-600 mb-3">{member.specialization}</div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-center items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Experience:</span>
                    <span>{member.experience}</span>
                  </div>
                  <div className="flex justify-center items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Education:</span>
                    <span>{member.education}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Experience Matters
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team's collective experience and specialized knowledge ensure 
            comprehensive legal solutions for your business needs.
          </p>
          <a href="#contact" className="btn-primary">
            Meet Our Team
          </a>
        </div>
      </div>
    </section>
  )
}
