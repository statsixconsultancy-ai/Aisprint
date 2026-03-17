import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { cookies } from 'next/headers'

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

    await query(
      'UPDATE users SET is_active = false WHERE id = $1',
      [userId]
    )

    // Clear auth cookies
    cookieStore.delete('auth_token')
    cookieStore.delete('user_id')

    return NextResponse.json(
      {
        success: true,
        message: 'Account deactivated successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Deactivate account error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    )
  }
}
