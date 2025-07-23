export default function Team() {
  const teamMembers = [
    {
      name: "Person 1",
      position: "Founding Partner & Managing Director",
      specialization: "Corporate Law, M&A",
      experience: "25+ years",
      education: "LLM, BA(Hons)",
      description: "Leading expert in corporate law and cross-border transactions with extensive experience in complex M&A deals.",
      image: "/api/placeholder/300/400" // Placeholder for professional photo
    },
    {
      name: "Person 2",
      position: "Senior Partner",
      specialization: "Startup & Venture Capital",
      experience: "18+ years",
      education: "JD, BCom",
      description: "Specializes in startup law and venture capital transactions, helping emerging companies navigate regulatory landscapes.",
      image: "/api/placeholder/300/400"
    },
    {
      name: "Person 3",
      position: "Partner",
      specialization: "Banking & Finance",
      experience: "15+ years",
      education: "LLM, LLB",
      description: "Expert in banking law and financial regulations with deep understanding of compliance requirements.",
      image: "/api/placeholder/300/400"
    }
  ]

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Our Legal Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our experienced professionals committed to delivering exceptional legal services and strategic counsel
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Photo Placeholder */}
              <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="w-32 h-32 bg-blue-300 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-1">{member.position}</p>
                <p className="text-gray-600 text-sm mb-4">{member.specialization}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {member.experience}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    {member.education}
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors">
                    View Full Profile →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Message */}
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-blue-900 mb-6">
              Leadership Message
            </h3>
            <blockquote className="text-xl text-gray-700 italic leading-relaxed mb-8">
              "At Aequitas Law Partners, we believe that exceptional legal counsel comes from combining deep expertise 
              with genuine partnership. Our team is committed to understanding not just the legal challenges you face, 
              but the business objectives you're striving to achieve."
            </blockquote>
            <div className="flex justify-center items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold text-blue-900">Rajesh Agarwal</div>
                <div className="text-gray-600">Founding Partner & Managing Director</div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Our Team */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-blue-900 mb-4">
            Join Our Team
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always looking for talented legal professionals who share our commitment to excellence and client service.
          </p>
          <button className="bg-blue-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors">
            View Career Opportunities
          </button>
        </div>
      </div>
    </section>
  )
}
