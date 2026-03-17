'use client'

import { useState, useEffect } from 'react'

interface Certificate {
  id: string
  course_type: string
  certificate_url?: string
  issued_date: string
}

const courseDetails: Record<string, { label: string }> = {
  'ml-ai': {
    label: 'Machine Learning & AI',
  },
  'prompt-engineering': {
    label: 'Prompt Engineering',
  },
}

export default function CertificatesSubTab() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const res = await fetch('/api/user/certificates')
      const data = await res.json()

      if (data.success) {
        setCertificates(data.certificates || [])
      }
    } catch (error) {
      console.error('Error fetching certificates:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading your certificates...</p>
      </div>
    )
  }

  if (certificates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <p className="text-gray-500">
          No certificates earned yet. Keep learning to earn your first certificate!
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {certificates.map((cert) => {
        const details = courseDetails[cert.course_type]
        return (
          <div
            key={cert.id}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-6 h-6 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-900">
                    {details.label}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">Certificate of Completion</p>
              </div>
            </div>

            <div className="py-4 border-t border-yellow-200 mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Issued Date
              </p>
              <p className="font-semibold text-gray-900">
                {new Date(cert.issued_date).toLocaleDateString()}
              </p>
            </div>

            {cert.certificate_url ? (
              <a
                href={cert.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors text-center"
              >
                View Certificate
              </a>
            ) : (
              <button
                disabled
                className="w-full py-2 px-4 bg-gray-200 text-gray-600 font-medium rounded-lg cursor-not-allowed"
              >
                Certificate Processing
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
