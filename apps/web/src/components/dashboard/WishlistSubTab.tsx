'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface WishlistItem {
  id: string
  course_type: string
  added_at: string
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

export default function WishlistSubTab() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const res = await fetch('/api/user/wishlist')
      const data = await res.json()

      if (data.success) {
        setWishlist(data.wishlist || [])
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromWishlist = async (courseType: string) => {
    try {
      const res = await fetch(
        `/api/user/wishlist?course_type=${courseType}`,
        { method: 'DELETE' }
      )

      if (res.ok) {
        setWishlist(wishlist.filter((item) => item.course_type !== courseType))
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading your wishlist...</p>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Your wishlist is empty</p>
        <Link href="/courses" className="btn-primary px-6 py-3">
          Explore Courses
        </Link>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {wishlist.map((item) => {
        const details = courseDetails[item.course_type]
        return (
          <div
            key={item.id}
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
            </div>

            <div className="space-y-2 mb-6 py-4 border-t border-gray-100">
              <p className="text-2xl font-bold text-brand-600">
                {details.price}
              </p>
              <p className="text-xs text-gray-500">
                Added to wishlist:{' '}
                {new Date(item.added_at).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/dashboard/course/${item.course_type}/payment`}
                className="flex-1 btn-primary justify-center"
              >
                Enroll Now
              </Link>
              <button
                onClick={() => removeFromWishlist(item.course_type)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
