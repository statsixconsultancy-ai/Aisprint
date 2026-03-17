'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  username: string
  country?: string
  bio?: string
  profile_image_url?: string
  phone?: string
  dob?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signin: (email: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  signout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Refresh user on mount
  useEffect(() => {
    refreshUser()
  }, [])

  const refreshUser = async () => {
    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()

      if (data.success) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signin = async (email: string, password: string) => {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!data.success) {
      throw new Error(data.message || 'Sign in failed')
    }

    // include optional profile fields if returned
    setUser(data.user)
  }

  const signup = async (username: string, email: string, password: string) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
    const data = await res.json()

    if (!data.success) {
      throw new Error(data.message || 'Sign up failed')
    }

    setUser(data.user)
  }

  const signout = async () => {
    const res = await fetch('/api/auth/signout', {
      method: 'POST',
    })

    const data = await res.json()

    if (!data.success) {
      throw new Error(data.message || 'Sign out failed')
    }

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signin,
        signup,
        signout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
