import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import {
  hashPassword,
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password } = body

    // Validate inputs
    if (!isValidUsername(username)) {
      return NextResponse.json(
        { success: false, message: 'Invalid username. Use 3-30 letters, numbers, underscores only' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Password must be at least 8 characters with uppercase, lowercase, and numbers',
        },
        { status: 400 }
      )
    }

    // Check username uniqueness
    const existingUsername = await query(
      'SELECT id FROM public.users WHERE username = $1',
      [username]
    )
    if (existingUsername.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Username already taken' },
        { status: 400 }
      )
    }

    // Check email uniqueness
    const existingEmail = await query(
      'SELECT id FROM public.users WHERE email = $1',
      [email]
    )

    if (existingEmail.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user record - use email as name placeholder for now
    const userResult = await query(
      `INSERT INTO users (name, username, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, username, name`,
      [
        email.split('@')[0], // name from email prefix
        username,
        email,
        passwordHash,
      ]
    )

    const user = userResult[0]

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Failed to create account' },
        { status: 500 }
      )
    }


    // send confirmation email to user
    try {
      const { sendSignupConfirmation } = await import('@/lib/email.service')
      await sendSignupConfirmation({ name: user.name as string, email: user.email as string })
    } catch (err) {
      console.error('Failed to send sign-up email', err)
    }

    // Return success with user info (don't return password)
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Sign up error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred during sign up' },
      { status: 500 }
    )
  }
}
