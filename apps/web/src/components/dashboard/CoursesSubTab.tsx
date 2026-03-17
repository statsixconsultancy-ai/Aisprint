'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface UserCourse {
  id: string
  course_type: string
  status: string
  enrollment_date: string
}

const courseDetails: Record<
  string,
  { label: string; description: string; price: string }
> = {
  'ml-ai': {
    label: 'Machine Learning & AI',
    description: 'Master ML algorithms, deep learning, and AI applications',
    price: '₹79,999',
  },
  'prompt-engineering': {
    label: 'Prompt Engineering',
    description: 'Learn to craft effective prompts for AI models',
    price: '₹199',
  },
}

export default function CoursesSubTab() {
  const [courses, setCourses] = useState<UserCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/user/courses')
      const data = await res.json()

      if (data.success) {
        setCourses(data.courses || [])
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading your courses...</p>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet</p>
        <Link href="/courses" className="btn-primary px-6 py-3">
          Browse Courses
        </Link>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {courses.map((course) => {
        const details = courseDetails[course.course_type]
        return (
          <div
            key={course.id}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {details.label}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {details.description}
                </p>
              </div>
              <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                {course.status}
              </span>
            </div>

            <div className="space-y-2 mb-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Enrolled:{' '}
                <span className="font-semibold text-gray-900">
                  {new Date(course.enrollment_date).toLocaleDateString()}
                </span>
              </p>
            </div>

            <Link
              href={`/dashboard/course/${course.course_type}`}
              className="w-full btn-primary justify-center"
            >
              View Details
            </Link>
          </div>
        )
      })}
    </div>
  )
}
