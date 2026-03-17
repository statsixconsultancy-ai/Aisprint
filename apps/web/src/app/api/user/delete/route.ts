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

    const body = await request.json()
    const { confirmation } = body

    if (confirmation !== 'DELETE') {
      return NextResponse.json(
        {
          success: false,
          message: 'Please type DELETE to confirm account deletion',
        },
        { status: 400 }
      )
    }

    // Delete user and all related data (cascading deletes)
    await query('DELETE FROM public.users WHERE id = $1', [userId])

    // Clear auth cookies
    cookieStore.delete('auth_token')
    cookieStore.delete('user_id')

    return NextResponse.json(
      {
        success: true,
        message: 'Account deleted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete account error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    )
  }
}
