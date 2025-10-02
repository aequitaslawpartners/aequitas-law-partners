'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import { practiceAreasData } from '@/data/practiceAreas'

export default function CareersPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedSpecializations, setSelectedSpecializations] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    position: '',
    coverLetter: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type and size
      if (file.type !== 'application/pdf') {
        setSubmitStatus({ type: 'error', message: 'Please upload a PDF file only.' })
        return
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setSubmitStatus({ type: 'error', message: 'File size should be less than 5MB. Maximum upload size is 5MB.' })
        return
      }
      setSelectedFile(file)
      setSubmitStatus(null)
    }
  }

  const handleSpecializationChange = (specializationId) => {
    setSelectedSpecializations(prev => {
      if (prev.includes(specializationId)) {
        return prev.filter(id => id !== specializationId)
      } else {
        return [...prev, specializationId]
      }
    })
  }

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Validate required fields
    if (selectedSpecializations.length === 0) {
      setSubmitStatus({ type: 'error', message: 'Please select at least one area of specialization.' })
      setIsSubmitting(false)
      return
    }

    if (!selectedFile) {
      setSubmitStatus({ type: 'error', message: 'Please upload your resume. Resume is required.' })
      setIsSubmitting(false)
      return
    }

    try {
      let resumeBase64 = null
      if (selectedFile) {
        resumeBase64 = await convertFileToBase64(selectedFile)
      } else {
        // This should not happen due to validation above, but just in case
        setSubmitStatus({ type: 'error', message: 'Resume is required. Please upload your resume.' })
        setIsSubmitting(false)
        return
      }

      const submissionData = {
        ...formData,
        specializations: selectedSpecializations,
        resume: resumeBase64
      }

      const response = await fetch('/api/recruitment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your application has been submitted successfully. We will review it and get back to you soon.' })
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          experience: '',
          position: '',
          coverLetter: ''
        })
        setSelectedSpecializations([])
        setSelectedFile(null)
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
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
              Careers
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Join our dynamic team and build an exceptional legal career with Aequitas Law Partners
            </p>
          </div>
        </section>

        {/* Career Application Form */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply for Position / Internship</h2>
              <p className="text-lg text-gray-600">At ALP, we are dedicated to delivering top notch legal counsel and achieving outstanding results. We seek talented and driven individuals who value excellence, collaboration and integrity. Our inclusive work environment fosters professional growth and mutual respect across all roles. As an equal opportunity employer, we are committed to a workplace free of discrimination and harassment, with all employment decisions based solely on merit.</p>
            </div>

            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years (Fresh Graduate)</option>
                  <option value="2-3">2-3 years</option>
                  <option value="4-6">4-6 years</option>
                  <option value="7-10">7-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                  Position of Interest *
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select a position</option>
                  <option value="associate">Associate</option>
                  <option value="senior-associate">Senior Associate</option>
                  <option value="principal-associate">Principal Associate</option>
                  <option value="partner">Partner</option>
                  <option value="internship">Internship</option>
                  <option value="paralegal">Paralegal</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Areas of Specialization * (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-4">
                  {practiceAreasData.map((practiceArea) => (
                    <div key={practiceArea.id} className="flex items-start">
                      <input
                        type="checkbox"
                        id={`specialization-${practiceArea.id}`}
                        checked={selectedSpecializations.includes(practiceArea.id)}
                        onChange={() => handleSpecializationChange(practiceArea.id)}
                        className="mt-1 h-4 w-4 text-secondary-500 focus:ring-secondary-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`specialization-${practiceArea.id}`}
                        className="ml-3 text-sm text-gray-700 cursor-pointer leading-5"
                      >
                        {practiceArea.title}
                      </label>
                    </div>
                  ))}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="specialization-other"
                      checked={selectedSpecializations.includes('other')}
                      onChange={() => handleSpecializationChange('other')}
                      className="mt-1 h-4 w-4 text-secondary-500 focus:ring-secondary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="specialization-other"
                      className="ml-3 text-sm text-gray-700 cursor-pointer leading-5"
                    >
                      Other
                    </label>
                  </div>
                </div>
                {selectedSpecializations.length === 0 && (
                  <p className="mt-2 text-sm text-red-600">Please select at least one area of specialization.</p>
                )}
              </div>

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume *
                </label>
                <div className="w-full">
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-secondary-500 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF only (MAX. 5MB)</p>
                      </div>
                      <input
                        id="resume"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>
                  {selectedFile && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-green-700 font-medium">{selectedFile.name}</span>
                      </div>
                    </div>
                  )}
                  {!selectedFile && (
                    <p className="mt-2 text-sm text-red-600">Please upload your resume. Resume is required.</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter / Additional Information
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                  placeholder="Tell us why you'd like to join ALP and what you can bring to our team..."
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-secondary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
