'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { formatISTDateShort } from '../../lib/dateUtils'

export default function AdminDashboard() {
  const [data, setData] = useState({ contacts: [], applications: [] })
  const [activeTab, setActiveTab] = useState('contacts')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = () => {
    const token = Cookies.get('admin_token')
    const userData = Cookies.get('admin_user')
    
    if (!token || !userData) {
      router.push('/admin/login')
      return
    }

    try {
      setUser(JSON.parse(userData))
      fetchData(token)
    } catch (error) {
      console.error('Auth error:', error)
      router.push('/admin/login')
    }
  }

  const fetchData = async (token) => {
    try {
      const response = await fetch('/api/admin/submissions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        logout()
        return
      }

      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.message || 'Failed to fetch data')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove('admin_token')
    Cookies.remove('admin_user')
    router.push('/admin/login')
  }

  const deleteSubmission = async (id, type) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return
    }

    const token = Cookies.get('admin_token')
    
    try {
      const response = await fetch(`/api/admin/submissions?id=${id}&type=${type}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await response.json()
      
      if (result.success) {
        // Refresh data
        fetchData(token)
      } else {
        alert(result.message || 'Failed to delete submission')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete submission')
    }
  }

  const updateStatus = async (id, type, status) => {
    const token = Cookies.get('admin_token')
    
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, type, status })
      })

      const result = await response.json()
      
      if (result.success) {
        // Refresh data
        fetchData(token)
      } else {
        alert(result.message || 'Failed to update status')
      }
    } catch (error) {
      console.error('Update error:', error)
      alert('Failed to update status')
    }
  }

  const downloadResume = async (id, name) => {
    const token = Cookies.get('admin_token')
    
    if (!token) {
      alert('Session expired. Please login again.')
      logout()
      return
    }

    try {
      const response = await fetch(`/api/admin/resume/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await response.json()
      
      if (result.success && result.data && result.data.resume) {
        // Create download link
        const fileName = result.data.fileName || `${name}_resume.pdf`
        const dataUrl = `data:application/pdf;base64,${result.data.resume}`
        
        // Create temporary link element and trigger download
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
      } else if (response.status === 401) {
        alert('Session expired. Please login again.')
        logout()
      } else {
        alert(result.message || 'Resume not found')
      }
    } catch (error) {
      console.error('Resume download error:', error)
      alert('Failed to download resume')
    }
  }

  const updatePassword = async (e) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess(false)
    setPasswordLoading(true)

    const token = Cookies.get('admin_token')
    
    if (!token) {
      alert('Session expired. Please login again.')
      logout()
      return
    }

    try {
      const response = await fetch('/api/admin/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(passwordForm)
      })

      const result = await response.json()
      
      if (result.success) {
        setPasswordSuccess(true)
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        setTimeout(() => setPasswordSuccess(false), 5000) // Hide success message after 5 seconds
      } else if (response.status === 401) {
        alert('Session expired. Please login again.')
        logout()
      } else {
        setPasswordError(result.message || 'Failed to update password')
      }
    } catch (error) {
      console.error('Password update error:', error)
      setPasswordError('Failed to update password')
    } finally {
      setPasswordLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contacts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact Submissions ({data.contacts.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Career Applications ({data.applications.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile & Settings
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {activeTab === 'contacts' ? (
            <ul className="divide-y divide-gray-200">
              {data.contacts.map((contact) => (
                <li key={contact._id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {contact.firstName} {contact.lastName}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status || 'pending')}`}>
                            {contact.status || 'pending'}
                          </span>
                          <select
                            value={contact.status || 'pending'}
                            onChange={(e) => updateStatus(contact._id, 'contact', e.target.value)}
                            className="text-xs border rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <button
                            onClick={() => deleteSubmission(contact._id, 'contact')}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                      <p className="text-sm text-gray-600">Subject: {contact.subject}</p>
                      <p className="text-sm text-gray-500 mt-2">{contact.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Submitted: {formatISTDateShort(contact.createdAt)} IST
                      </p>
                    </div>
                  </div>
                </li>
              ))}
              {data.contacts.length === 0 && (
                <li className="px-6 py-4 text-center text-gray-500">
                  No contact submissions found
                </li>
              )}
            </ul>
          ) : activeTab === 'applications' ? (
            <ul className="divide-y divide-gray-200">
              {data.applications.map((app) => (
                <li key={app._id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {app.firstName} {app.lastName}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status || 'pending')}`}>
                            {app.status || 'pending'}
                          </span>
                          <select
                            value={app.status || 'pending'}
                            onChange={(e) => updateStatus(app._id, 'recruitment', e.target.value)}
                            className="text-xs border rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <button
                            onClick={() => downloadResume(app._id, `${app.firstName} ${app.lastName}`)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Download Resume
                          </button>
                          <button
                            onClick={() => deleteSubmission(app._id, 'recruitment')}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{app.email}</p>
                      <p className="text-sm text-gray-600">{app.phone}</p>
                      <p className="text-sm text-gray-600">Experience: {app.experience} years</p>
                      <p className="text-sm text-gray-600">Position: {app.position}</p>
                      <p className="text-sm text-gray-600">
                        Specializations: {Array.isArray(app.specializations) ? app.specializations.join(', ') : app.specializations}
                      </p>
                      {app.coverLetter && (
                        <p className="text-sm text-gray-500 mt-2">{app.coverLetter}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Submitted: {formatISTDateShort(app.createdAt)} IST
                      </p>
                    </div>
                  </div>
                </li>
              ))}
              {data.applications.length === 0 && (
                <li className="px-6 py-4 text-center text-gray-500">
                  No career applications found
                </li>
              )}
            </ul>
          ) : (
            /* Profile Section */
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* User Information */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <div className="mt-1 text-sm text-gray-900 bg-white px-3 py-2 border rounded-md">
                          {user?.email}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <div className="mt-1 text-sm text-gray-900 bg-white px-3 py-2 border rounded-md">
                          Administrator
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Login</label>
                        <div className="mt-1 text-sm text-gray-900 bg-white px-3 py-2 border rounded-md">
                          {formatISTDateShort(new Date())} IST
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h2>
                    
                    {passwordSuccess && (
                      <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
                        Password updated successfully!
                      </div>
                    )}
                    
                    {passwordError && (
                      <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                        {passwordError}
                      </div>
                    )}
                    
                    <form onSubmit={updatePassword} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({
                            ...passwordForm,
                            currentPassword: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({
                            ...passwordForm,
                            newPassword: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({
                            ...passwordForm,
                            confirmPassword: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={passwordLoading}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {passwordLoading ? 'Updating Password...' : 'Update Password'}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Admin Statistics */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Dashboard Statistics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-blue-600">{data.contacts.length}</div>
                      <div className="text-sm text-gray-600">Total Contact Submissions</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-green-600">{data.applications.length}</div>
                      <div className="text-sm text-gray-600">Total Job Applications</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-purple-600">
                        {data.contacts.filter(c => c.status === 'pending').length + 
                         data.applications.filter(a => a.status === 'pending').length}
                      </div>
                      <div className="text-sm text-gray-600">Pending Reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
