'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CoursePage() {
  const params = useParams()
  const id = params.id

  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourse()
  }, [])

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/user/courses/${id}`)
      const data = await res.json()

      setCourse(data.course)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // 🔄 Loading
  if (loading) {
    return <p>Loading course...</p>
  }

  // ❌ No data
  if (!course) {
    return <p>Course not found</p>
  }

  return (
    <div className="space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold">
          {course.title}
        </h1>
        <p className="text-sm text-gray-500">
          Track your progress
        </p>
      </div>

      {/* Progress */}
      <div>
        <p className="text-sm mb-2">
          Progress: {course.progress}%
        </p>

        <div className="w-full bg-gray-200 h-3 rounded">
          <div
            className="bg-black h-3 rounded"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="text-sm text-gray-600">
        {course.completed
          ? '✅ Completed'
          : '📚 In Progress'}
      </div>

      {/* Certificate */}
      {course.certificate && (
        <div className="text-green-600 text-sm">
          🎓 Certificate Earned
        </div>
      )}

    </div>
  )
}