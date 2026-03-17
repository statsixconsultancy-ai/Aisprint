import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatBox from '@/components/ChatBox'
import { AuthProvider } from '@/components/providers/AuthProvider'

import GoogleAnalytics from "@/components/analytics/googleanalytics"
import GoogleTagManager from "@/components/analytics/googletagmanager"
import GTMNoScript from "@/components/analytics/GTMNoScript"

import { Inter, Pontano_Sans } from "next/font/google"

/* FONTS */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const pontano = Pontano_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pontano",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://goaisprint.com"),

  title: {
    default: 'AIsprint — Become the Top 1% AI Experts',
    template: '%s | AIsprint',
  },

  description:
    "Fast paced, career-focused AI education with 1:1 live mentorship and placement support. Master AI, ML, and prompt engineering with personalized guidance.",

  keywords: [
    'AI course India',
    'machine learning course',
    'AI mentorship',
    '1:1 AI training',
    'AI career',
    'prompt engineering',
    'AI placement support',
    'AIsprint',
  ],

  authors: [{ name: 'AIsprint' }],
  creator: 'AIsprint',
  publisher: 'AIsprint',
  applicationName: 'AIsprint',

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://goaisprint.com',
    siteName: 'AIsprint',
    title: 'AIsprint — Become the Top 1% AI Experts',
    description:
      "Fast paced, career-focused AI education with 1:1 live mentorship and placement support.",
    images: [
      {
        url: "https://goaisprint.com/logo3.png",
        width: 1200,
        height: 630,
        alt: 'AIsprint — AI Career Acceleration Platform',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AIsprint — Become the Top 1% AI Experts',
    description:
      "Personalized 1:1 live mentorship in AI/ML. Global placement support.",
    images: ["https://goaisprint.com/metatag.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/logo3.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager />

        {/* Font preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={`${inter.variable} ${pontano.variable} font-body antialiased bg-white text-neutral-950`}
      >
        <GTMNoScript />
        <GoogleAnalytics />

        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatBox />
        </AuthProvider>
      </body>
    </html>
  )
}