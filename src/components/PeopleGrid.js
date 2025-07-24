'use client'

import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation'

export default function PeopleGrid() {
  const [headerRef, headerVisible] = useScrollAnimation()
  const { setRef, isVisible } = useStaggeredAnimation(6, { delay: 150 })

  const teamMembers = [
    {
      name: "Person 1",
      position: "Founding Partner & Managing Director",
      specialization: "Corporate Law, M&A",
      education: "LLM, BA(Hons)",
      description: "Leading expert in corporate law and cross-border transactions with extensive expertise in complex M&A deals.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Person 2",
      position: "Senior Partner",
      specialization: "Startup & Venture Capital",
      education: "JD, BCom",
      description: "Specializes in startup law and venture capital transactions, helping emerging companies navigate regulatory landscapes.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Person 3",
      position: "Partner",
      specialization: "Banking & Finance",
      education: "LLM, LLB",
      description: "Expert in banking law and financial regulations with deep understanding of compliance requirements.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Person 4",
      position: "Senior Associate",
      specialization: "Intellectual Property",
      education: "LLM, BTech",
      description: "Focuses on intellectual property law, patent prosecution, and technology transfer agreements.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Person 5",
      position: "Associate",
      specialization: "Employment Law",
      education: "LLB, BA",
      description: "Specializes in employment law, labor disputes, and workplace compliance matters.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Person 6",
      position: "Associate",
      specialization: "Commercial Litigation",
      education: "LLM, BCom",
      description: "Handles commercial disputes, arbitration proceedings, and regulatory enforcement matters.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className={`text-sm font-medium text-blue-900 uppercase tracking-wide scroll-text ${headerVisible ? 'visible' : ''}`}>
            People
          </span>
          <h2 className={`text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-6 scroll-reveal ${headerVisible ? 'visible' : ''}`}
              style={{ transitionDelay: headerVisible ? '0.1s' : '0s' }}>
            Home to Inspired Performances
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto scroll-text ${headerVisible ? 'visible' : ''}`}
             style={{ transitionDelay: headerVisible ? '0.2s' : '0s' }}>
            Our distinguished team of legal professionals brings decades of experience 
            and deep expertise across multiple practice areas.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              ref={setRef(index)}
              className={`bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 scroll-card ${isVisible(index) ? 'visible' : ''}`}
            >
              {/* Image */}
              <div className="mb-6">
                <div 
                  className="w-32 h-32 mx-auto rounded-full bg-cover bg-center border-4 border-gray-100"
                  style={{ backgroundImage: `url(${member.image})` }}
                ></div>
              </div>
              
              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-900 font-medium mb-1">{member.position}</div>
                <div className="text-sm text-gray-600 mb-3">{member.specialization}</div>
                
                <div className="space-y-2 mb-4">
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
      </div>
    </section>
  )
}
