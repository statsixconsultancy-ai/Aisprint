'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'

type SettingSection = 'password' | 'email' | 'deactivate' | 'delete'

export default function SettingsTab() {
  const router = useRouter()
  const { signout, user } = useAuth()
  const [activeSection, setActiveSection] = useState<SettingSection | null>(
    null
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  })

  // Email form
  const [emailForm, setEmailForm] = useState({
    new_email: '',
    password: '',
  })

  // Delete form
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setMessage('New passwords do not match')
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: passwordForm.current_password,
          new_password: passwordForm.new_password,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setMessage('Password changed successfully')
        setPasswordForm({
          current_password: '',
          new_password: '',
          confirm_password: '',
        })
        setActiveSection(null)
      } else {
        setMessage(data.message || 'Failed to change password')
      }
    } catch (error) {
      setMessage('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const res = await fetch('/api/user/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          new_email: emailForm.new_email,
          password: emailForm.password,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setMessage('Email changed successfully. Please verify your new email.')
        setEmailForm({
          new_email: '',
          password: '',
        })
        setActiveSection(null)
      } else {
        setMessage(data.message || 'Failed to change email')
      }
    } catch (error) {
      setMessage('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeactivateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const res = await fetch('/api/user/deactivate', {
        method: 'POST',
      })

      const data = await res.json()

      if (data.success) {
        await signout()
        router.push('/')
      } else {
        setMessage(data.message || 'Failed to deactivate account')
      }
    } catch (error) {
      setMessage('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    if (deleteConfirmation !== 'DELETE') {
      setMessage('Please type DELETE to confirm')
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/user/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: deleteConfirmation }),
      })

      const data = await res.json()

      if (data.success) {
        await signout()
        router.push('/')
      } else {
        setMessage(data.message || 'Failed to delete account')
      }
    } catch (error) {
      setMessage('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      {message && (
        <div
          className={`p-4 rounded-xl ${
            message.includes('successfully') || !message.includes('Failed')
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <p
            className={
              message.includes('successfully') || !message.includes('Failed')
                ? 'text-green-600'
                : 'text-red-600'
            }
          >
            {message}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Change Password */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() =>
              setActiveSection(activeSection === 'password' ? null : 'password')
            }
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Change Password</h3>
              <p className="text-sm text-gray-600">Update your password</p>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                activeSection === 'password' ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {activeSection === 'password' && (
            <form onSubmit={handleChangePassword} className="p-6 bg-gray-50 space-y-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.current_password}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      current_password: e.target.value,
                    }))
                  }
                  className="w-full input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.new_password}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      new_password: e.target.value,
                    }))
                  }
                  className="w-full input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirm_password}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      confirm_password: e.target.value,
                    }))
                  }
                  className="w-full input-field"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-600 text-white font-medium py-2 rounded-lg hover:bg-brand-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>

        {/* Change Email */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() =>
              setActiveSection(activeSection === 'email' ? null : 'email')
            }
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Change Email ID</h3>
              <p className="text-sm text-gray-600">Update your email address</p>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                activeSection === 'email' ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {activeSection === 'email' && (
            <form onSubmit={handleChangeEmail} className="p-6 bg-gray-50 space-y-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full input-field bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Email
                </label>
                <input
                  type="email"
                  value={emailForm.new_email}
                  onChange={(e) =>
                    setEmailForm((prev) => ({
                      ...prev,
                      new_email: e.target.value,
                    }))
                  }
                  className="w-full input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={emailForm.password}
                  onChange={(e) =>
                    setEmailForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="w-full input-field"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-600 text-white font-medium py-2 rounded-lg hover:bg-brand-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Updating...' : 'Update Email'}
              </button>
            </form>
          )}
        </div>

        {/* Deactivate Account */}
        <div className="border border-orange-200 rounded-xl overflow-hidden bg-orange-50">
          <button
            onClick={() =>
              setActiveSection(activeSection === 'deactivate' ? null : 'deactivate')
            }
            className="w-full flex items-center justify-between p-6 hover:bg-orange-100 transition-colors"
          >
            <div className="text-left">
              <h3 className="font-semibold text-orange-900">Deactivate Account</h3>
              <p className="text-sm text-orange-700">Temporarily disable your account</p>
            </div>
            <svg
              className={`w-5 h-5 text-orange-400 transition-transform ${
                activeSection === 'deactivate' ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {activeSection === 'deactivate' && (
            <form onSubmit={handleDeactivateAccount} className="p-6 border-t border-orange-200 space-y-4">
              <p className="text-sm text-orange-900">
                Deactivating your account will temporarily disable it. You can
                reactivate it anytime by signing in again.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white font-medium py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Deactivating...' : 'Deactivate Account'}
              </button>
            </form>
          )}
        </div>

        {/* Delete Account */}
        <div className="border border-red-200 rounded-xl overflow-hidden bg-red-50">
          <button
            onClick={() =>
              setActiveSection(activeSection === 'delete' ? null : 'delete')
            }
            className="w-full flex items-center justify-between p-6 hover:bg-red-100 transition-colors"
          >
            <div className="text-left">
              <h3 className="font-semibold text-red-900">Delete Account</h3>
              <p className="text-sm text-red-700">
                Permanently delete your account and all data
              </p>
            </div>
            <svg
              className={`w-5 h-5 text-red-400 transition-transform ${
                activeSection === 'delete' ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {activeSection === 'delete' && (
            <form onSubmit={handleDeleteAccount} className="p-6 border-t border-red-200 space-y-4">
              <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                <p className="text-sm text-red-900 font-medium">
                  ⚠️ Warning: This action cannot be undone. All your data will be
                  permanently deleted.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  Type "DELETE" to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="w-full input-field border-red-300"
                  placeholder="DELETE"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || deleteConfirmation !== 'DELETE'}
                className="w-full bg-red-600 text-white font-medium py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Deleting...' : 'Delete Account Forever'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
