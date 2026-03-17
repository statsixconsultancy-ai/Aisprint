import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    
    // Clear auth cookies
    cookieStore.delete('auth_token')
    cookieStore.delete('user_id')

    return NextResponse.json(
      { success: true, message: 'Signed out successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Sign out error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred during sign out' },
      { status: 500 }
    )
  }
}
