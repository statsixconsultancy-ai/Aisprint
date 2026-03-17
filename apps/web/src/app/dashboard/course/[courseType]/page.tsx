'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface UserCourse {
  id: string
  course_type: string
  status: string
  enrollment_date: string
  career_goal?: string
  experience?: string
}

const courseDetails: Record<
  string,
  {
    label: string
    description: string
    price: string
    image: string
    modules: string[]
    learnings: string[]
  }
> = {
  'ml-ai': {
    label: 'Machine Learning & AI',
    description:
      'Master Machine Learning algorithms, deep learning, and AI applications with hands-on projects',
    price: '₹79,999',
    image: '/ml-ai-course.jpg',
    modules: [
      'Python Fundamentals & Data Structures',
      'Data Preprocessing & Visualization',
      'Supervised Learning Algorithms',
      'Unsupervised Learning & Clustering',
      'Deep Learning & Neural Networks',
      'Natural Language Processing',
      'Computer Vision Basics',
      'Real-world ML Projects',
    ],
    learnings: [
      'Build end-to-end ML pipelines',
      'Work with TensorFlow and PyTorch',
      'Deploy ML models to production',
      'Solve real-world business problems',
      'Collaborate with mentors 1-on-1',
    ],
  },
  'prompt-engineering': {
    label: 'Prompt Engineering',
    description:
      'Learn to craft effective prompts for AI models and build AI-powered applications',
    price: '₹199',
    image: '/prompt-engineering-course.jpg',
    modules: [
      'AI & Language Model Basics',
      'Prompt Design Principles',
      'Advanced Prompt Techniques',
      'Few-Shot Learning',
      'Chain-of-Thought Prompting',
      'Building with APIs (OpenAI, Claude)',
      'Evaluating LLM Outputs',
      'Building AI Products',
    ],
    learnings: [
      'Master prompt engineering techniques',
      'Build AI-powered applications',
      'Integrate LLMs into products',
      'Optimize model responses',
      'Real-time mentorship support',
    ],
  },
}

export default function CourseDetailPage({
  params,
}: {
  params: { courseType: string }
}) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [course, setCourse] = useState<UserCourse | null>(null)
  const [courseLoading, setCourseLoading] = useState(true)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin')
      return
    }

    if (!isLoading && isAuthenticated) {
      fetchCourse()
    }
  }, [isLoading, isAuthenticated])

  const fetchCourse = async () => {
    try {
      const res = await fetch('/api/user/courses')
      const data = await res.json()

      if (data.success) {
        const userCourse = data.courses.find(
          (c: UserCourse) => c.course_type === params.courseType
        )
        setCourse(userCourse || null)
      }
    } catch (error) {
      console.error('Error fetching course:', error)
    } finally {
      setCourseLoading(false)
    }
  }

  const addToWishlist = async () => {
    setIsAddingToWishlist(true)
    try {
      const res = await fetch('/api/user/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_type: params.courseType }),
      })

      if (res.ok) {
        alert('Added to wishlist!')
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error)
    } finally {
      setIsAddingToWishlist(false)
    }
  }

  if (isLoading || courseLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-gray-600">Loading course details...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const details = courseDetails[params.courseType]

  if (!details) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container-custom text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Course Not Found
          </h1>
          <Link href="/dashboard" className="btn-primary px-6 py-3">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white pt-20 pb-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/dashboard" className="hover:text-brand-600">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{details.label}</span>
        </div>

        {/* Header */}
        <div className="mb-12 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {details.label}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{details.description}</p>

            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl font-bold text-brand-600">
                {details.price}
              </div>
              <span className="text-sm text-gray-500">One-time payment</span>
            </div>

            <div className="flex gap-3">
              {!course ? (
                <>
                  <Link
                    href={`/dashboard/course/${params.courseType}/payment`}
                    className="btn-primary px-8 py-4 text-lg"
                  >
                    Enroll Now
                  </Link>
                  <button
                    onClick={addToWishlist}
                    disabled={isAddingToWishlist}
                    className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  >
                    {isAddingToWishlist ? 'Adding...' : 'Add to Wishlist'}
                  </button>
                </>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full">
                  <p className="text-green-700 font-medium">
                    ✓ You're enrolled in this course
                  </p>
                  <p className="text-sm text-green-600">
                    Enrolled since{' '}
                    {new Date(course.enrollment_date).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Course Preview Card */}
          <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-8 h-96 flex items-center justify-center border border-brand-200">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25c0 5.105 3.07 9.408 7.5 11.398m0-20.5c5.5 0 10 4.745 10 10.997 0 5.105-3.07 9.408-7.5 11.398m0-20.5C21.93 6.253 26 10.998 26 17.25"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-2">
                Live Project-Based Learning
              </h3>
              <p className="text-brand-700">
                Build real projects with 1-on-1 mentorship
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* What You'll Learn */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What You'll Learn
            </h2>
            <ul className="space-y-3">
              {details.learnings.map((learning, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{learning}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Modules */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Course Modules
            </h2>
            <div className="space-y-2">
              {details.modules.map((module, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-brand-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-900 font-medium">{module}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Choose This Course?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-brand-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                1-on-1 Mentorship
              </h3>
              <p className="text-gray-600">
                Get personalized guidance from industry experts
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-brand-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Certified Learning
              </h3>
              <p className="text-gray-600">
                Earn a recognized certificate upon completion
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-brand-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Lifetime Access
              </h3>
              <p className="text-gray-600">
                Access course materials forever with updates
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        {!course && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join hundreds of students already learning with AIsprint
            </p>
            <Link
              href={`/dashboard/course/${params.courseType}/payment`}
              className="btn-primary px-8 py-4 text-lg inline-flex"
            >
              Enroll Now for {details.price}
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
