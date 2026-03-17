'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/components/providers/AuthProvider'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user, signout, isLoading } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignout = async () => {
    try {
      await signout()
      setIsOpen(false)
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="AIsprint Logo"
              width={110}
              height={30}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Right Side Menu */}
          <div className="hidden md:flex items-center gap-4">

            {/* Courses */}
            <Link
              href="/courses"
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-brand-600 rounded-md hover:bg-neutral-50 transition"
            >
              Courses
            </Link>

            {/* Auth Buttons */}
            {!isLoading && !isAuthenticated ? (
              <>
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-brand-600 rounded-md hover:bg-neutral-50 transition"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/signup"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Sign Up
                </Link>
              </>
            ) : !isLoading ? (
              <>
                {user && (
                  <div className="flex items-center gap-2 mr-2">
                    <img
                      src={user.profile_image_url || '/avatar-placeholder.png'}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-neutral-700">
                      {user.username}
                    </span>
                  </div>
                )}

                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-brand-600 rounded-md hover:bg-neutral-50 transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleSignout}
                  className="btn-primary text-sm px-4 py-2"
                >
                  Sign Out
                </button>
              </>
            ) : null}

          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200 pb-4">
            <div className="flex flex-col gap-2 pt-3 px-4">

              <Link
                href="/courses"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-md"
              >
                Courses
              </Link>

              {!isLoading && !isAuthenticated ? (
                <>
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-md"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/auth/signup"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full text-sm py-3"
                  >
                    Sign Up
                  </Link>
                </>
              ) : null}

            </div>
          </div>
        )}
      </div>
    </header>
  )
}