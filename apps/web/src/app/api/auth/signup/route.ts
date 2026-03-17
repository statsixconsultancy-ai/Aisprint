import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import {
  hashPassword,
  isValidEmail,
  isValidPassword,
} from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate inputs
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

    // Check if user already exists by email only
    const existingUser = await query(
      'SELECT id FROM public.users WHERE email = $1',
      [email]
    )

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email or username already registered',
        },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // derive username from email prefix, ensure unique by adding random digits if needed
    let baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '')
    if (baseUsername.length < 3) baseUsername = baseUsername + Math.floor(Math.random()*900+100)
    let finalUsername = baseUsername
    // check uniqueness
    const existing = await query(
      'SELECT id FROM public.users WHERE username = $1',
      [finalUsername]
    )
    if (existing.length > 0) {
      finalUsername = `${baseUsername}${Math.floor(Math.random()*900+100)}`
    }

    // Create user record
    const userResult = await query(
      `INSERT INTO users (name, username, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, username, name`,
      [
        email, // use email as name placeholder
        finalUsername,
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
