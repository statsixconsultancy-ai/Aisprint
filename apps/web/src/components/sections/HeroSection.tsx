'use client'

import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'

export default function HeroSection() {
  const { user, isAuthenticated } = useAuth()

  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-24 md:pt-24 md:pb-28 lg:pt-32 lg:pb-32">
      {/* if user logged in, show tiny avatar+username at top-right of section */}
      {isAuthenticated && user && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <img
            src={user.profile_image_url || '/avatar-placeholder.png'}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">
            {user.username}
          </span>
        </div>
      )}


      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Pill badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="badge bg-neutral-100 text-neutral-700 px-4 py-2">
              <span className="flex items-center gap-2">
                <span className="text-brand-600">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 16.5L10.5 11L14.5 15L19 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 7V10H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Startup India Partner</span>
              </span>
            </span>
            <span className="badge bg-neutral-100 text-neutral-700 px-4 py-2">
              ✅ 94% Placement Rate
            </span>
          </div>

          {/* Headline */}
<h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-text-primary leading-tight mb-6">
Learn AI With a Dedicated Mentor
</h1>
<p className="text-lg text-text-body leading-relaxed mb-10">
  No boring pre-recorded lectures. Just real 1:1 live sessions with experts from Google, Amazon, and top Indian tech teams.
</p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/ml-ai" className="btn-primary px-6 py-2">
              ML & AI course
            </Link>
            <Link href="/prompt-engineering" className="btn-primary px-6 py-2">
              Prompt Engg. course
            </Link>
          </div>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-base text-text-secondary">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['G', 'A', 'R', 'N'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-neutral-200 flex items-center justify-center text-sm font-bold text-neutral-700"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span className="font-medium text-text-primary">2,400+ enrolled</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="font-medium text-text-primary ml-2">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
