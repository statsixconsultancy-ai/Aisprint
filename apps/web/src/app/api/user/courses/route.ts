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

    // Get user courses
    const courses = await query(
      `SELECT id, user_id, course_type, status, experience, enrollment_date 
       FROM user_courses 
       WHERE user_id = $1 
       ORDER BY enrollment_date DESC`,
      [userId]
    )

    return NextResponse.json(
      {
        success: true,
        courses,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get user courses error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    )
  }
}
