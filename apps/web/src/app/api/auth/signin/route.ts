import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyPassword, generateSessionToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const users = await query(
      'SELECT id, name, email, username, password_hash, profile_image_url, dob FROM public.users WHERE email = $1',
      [email]
    )

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const user = users[0]

    // Verify password
    if (!user.password_hash) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }
    const isPasswordValid = await verifyPassword(password, user.password_hash as string)

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate session token
    const sessionToken = generateSessionToken()

    // Store session in cookie
    const cookieStore = cookies()
    cookieStore.set('auth_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    })

    // Store user id cookie
    cookieStore.set('user_id', String(user.id), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Signed in successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          profile_image_url: user.profile_image_url,
          dob: user.dob,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Sign in error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred during sign in' },
      { status: 500 }
    )
  }
}