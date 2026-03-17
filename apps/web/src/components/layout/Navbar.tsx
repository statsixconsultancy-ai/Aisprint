'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/components/providers/AuthProvider'

const navLinks = [
  { label: 'Courses', href: '/courses' },
  { label: 'Contact', href: '/contact' },
]

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
          ? 'bg-white/100 backdrop-blur-md shadow-sm border-b border-gray-200'
          : 'bg-white/100 border-b border-gray-100'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-12 md:h-10 px-4 md:px-0">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="AIsprint Logo"
              width={120}
              height={30}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 ml-auto mr-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-brand-600 rounded-lg hover:bg-neutral-50 transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            {!isLoading && !isAuthenticated ? (
              <>
                <Link
                  href="/auth/signin"
                  className="btn-primary px-4 py-1 text-sm font-medium text-neutral-600 border border-neutral-200 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white hover:border-neutral-300 hover:text-brand-600 transition-all duration-150"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="btn-primary text-sm px-4 py-1 bg-gradient-to-r from-purple-600 to-brand-600 hover:from-purple-700 hover:to-brand-700"
                >
                  Sign Up
                </Link>
              </>
            ) : !isLoading ? (
              <>
                {/* show avatar + username when available */}
                {user && (
                  <div className="flex items-center gap-3 mr-4">
                    <img
                      src={user.profile_image_url || '/avatar-placeholder.png'}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-base font-medium text-neutral-700">
                      {user.username}
                    </span>
                  </div>
                )}
                <Link
                  href="/dashboard"
                  className="px-6 py-3 text-base font-medium text-neutral-600 hover:text-brand-600 rounded-lg hover:bg-neutral-50 transition-all duration-150"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignout}
                  className="text-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-brand-600 hover:from-purple-700 hover:to-brand-700 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : null}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200 pb-6">
            <div className="flex flex-col gap-2 pt-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-4 text-base font-medium text-neutral-700 hover:text-brand-600 hover:bg-neutral-50 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 px-4 border-t border-neutral-200 pt-4">
                {!isLoading && !isAuthenticated ? (
                  <>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:text-brand-600 hover:bg-neutral-50 rounded-lg transition-all text-center mb-2"
                >
                  Sign In
                </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary w-full justify-center text-base py-4"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : !isLoading ? (
                  <>
                    {user && (
                      <div className="flex items-center gap-3 mb-6 px-6">
                        <img
                          src={user.profile_image_url || '/avatar-placeholder.png'}
                          alt="avatar"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <span className="text-base font-medium text-neutral-700">
                          {user.username}
                        </span>
                      </div>
                    )}
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block px-6 py-4 text-base font-medium text-neutral-700 hover:text-brand-600 hover:bg-neutral-50 rounded-lg transition-all text-center mb-3"
                    >
                      Dashboard
                    </Link>
                <button
                  onClick={handleSignout}
                  className="btn-primary w-full text-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-brand-600 hover:from-purple-700 hover:to-brand-700"
                >
                  Sign Out
                </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}