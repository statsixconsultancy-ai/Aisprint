'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'

export default function GeneralTab() {
  const { user, refreshUser } = useAuth()
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    bio: '',
    phone: '',
    dob: '',
    profile_image_url: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        country: user.country || '',
        bio: user.bio || '',
        phone: user.phone || '',
        dob: user.dob || '',
        profile_image_url: user.profile_image_url || '',
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (data.success) {
        setMessage('Profile updated successfully')
        setEditMode(false)
        await refreshUser()
      } else {
        setMessage(data.message || 'Update failed')
      }
    } catch (error) {
      setMessage('An error occurred while updating profile')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const countries = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'Other',
  ]

  if (!user)
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading...</p>
      </div>
    )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">General Information</h2>
        <button
          onClick={() => setEditMode(!editMode)}
          className="px-4 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
        >
          {editMode ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl ${
            message.includes('successfully')
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <p
            className={
              message.includes('successfully')
                ? 'text-green-600'
                : 'text-red-600'
            }
          >
            {message}
          </p>
        </div>
      )}

      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-xl">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = () => {
                    setForm((prev) => ({
                      ...prev,
                      profile_image_url: reader.result as string,
                    }))
                  }
                  reader.readAsDataURL(file)
                }
              }}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full input-field"
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full input-field"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full input-field"
              placeholder="Tell us about yourself..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-600 text-white font-medium py-2 rounded-lg hover:bg-brand-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* show profile image */}
          {user.profile_image_url && (
            <div className="md:col-span-2 flex justify-center">
              <img
                src={user.profile_image_url}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}
          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
              Full Name
            </p>
            <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
              Username
            </p>
            <p className="text-lg font-semibold text-gray-900">
              @{user.username}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
              Email Address
            </p>
            <p className="text-lg font-semibold text-gray-900">{user.email}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
              Country
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {user.country || 'Not set'}
            </p>
          </div>

          {user.phone && (
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
                Phone
              </p>
              <p className="text-lg font-semibold text-gray-900">{user.phone}</p>
            </div>
          )}

          {user.dob && (
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
                Date of Birth
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(user.dob).toLocaleDateString()}
              </p>
            </div>
          )}

          {user.bio && (
            <div className="bg-gray-50 p-6 rounded-xl md:col-span-2">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
                Bio
              </p>
              <p className="text-gray-900">{user.bio}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
