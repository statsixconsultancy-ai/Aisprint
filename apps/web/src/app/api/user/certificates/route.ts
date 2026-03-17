import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const certificates = await query(
      `SELECT id, user_id, course_type, certificate_url, issued_date 
       FROM certificates 
       WHERE user_id = $1 
       ORDER BY issued_date DESC`,
      [userId]
    )

    return NextResponse.json(
      {
        success: true,
        certificates,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get certificates error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    )
  }
}
