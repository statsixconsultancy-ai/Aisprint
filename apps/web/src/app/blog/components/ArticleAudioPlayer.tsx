'use client'

import { useState, useEffect, useRef } from 'react'

interface ArticleAudioPlayerProps {
  content: string
  title: string
}

export default function ArticleAudioPlayer({ content, title }: ArticleAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    // Check if browser supports Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true)
    }

    return () => {
      // Cleanup on unmount
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const stripHtml = (html: string): string => {
    // Remove HTML tags and extra whitespace
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const handlePlayPause = () => {
    if (!isSupported) return

    if (isPlaying) {
      // Stop audio
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      // Start audio
      const textToRead = `${title}. ${stripHtml(content)}`
      const utterance = new SpeechSynthesisUtterance(textToRead)

      // Configure speech settings
      utterance.rate = 1.0 // Speed (0.1 to 10)
      utterance.pitch = 1.0 // Pitch (0 to 2)
      utterance.volume = 1.0 // Volume (0 to 1)

      // Event handlers
      utterance.onend = () => {
        setIsPlaying(false)
      }

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event)
        setIsPlaying(false)
      }

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)
    }
  }

  if (!isSupported) {
    return null // Don't render if browser doesn't support it
  }

  return (
    <div className="border-b border-gray-200 pb-6 mb-8">
      <button
        onClick={handlePlayPause}
        className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-body text-sm font-medium text-gray-700 hover:text-gray-900"
        aria-label={isPlaying ? 'Stop reading article' : 'Listen to article'}
      >
        {isPlaying ? (
          <>
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            <span>Stop audio</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Listen to article</span>
          </>
        )}
      </button>
    </div>
  )
}