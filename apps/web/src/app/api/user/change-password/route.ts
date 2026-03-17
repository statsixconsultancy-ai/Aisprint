import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { cookies } from 'next/headers'
import { hashPassword, verifyPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { current_password, new_password } = body

    if (!current_password || !new_password) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Current password and new password are required',
        },
        { status: 400 }
      )
    }

    // Get user
    const users = await query(
      'SELECT password_hash FROM public.users WHERE id = $1',
      [userId]
    )

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    // Verify current password
    const isPasswordValid = await verifyPassword(
      current_password,
      users[0].password_hash as string
    )

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Current password is incorrect' },
        { status: 401 }
      )
    }

    // Hash and update new password
    const newPasswordHash = await hashPassword(new_password)

    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [
      newPasswordHash,
      userId,
    ])

    return NextResponse.json(
      {
        success: true,
        message: 'Password changed successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Change password error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    )
  }
}
