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

    const wishlist = await query(
      `SELECT id, user_id, course_type, added_at 
       FROM wishlist 
       WHERE user_id = $1 
       ORDER BY added_at DESC`,
      [userId]
    )

    return NextResponse.json(
      {
        success: true,
        wishlist,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get wishlist error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    )
  }
}

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

    const { course_type } = await request.json()

    // Check if already in wishlist
    const existing = await query(
      'SELECT id FROM wishlist WHERE user_id = $1 AND course_type = $2',
      [userId, course_type]
    )

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Already in wishlist' },
        { status: 400 }
      )
    }

    const result = await query(
      `INSERT INTO wishlist (user_id, course_type) 
       VALUES ($1, $2) 
       RETURNING id, user_id, course_type, added_at`,
      [userId, course_type]
    )

    return NextResponse.json(
      {
        success: true,
        wishlist_item: result[0],
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Add to wishlist error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const courseType = searchParams.get('course_type')

    if (!courseType) {
      return NextResponse.json(
        { success: false, message: 'course_type is required' },
        { status: 400 }
      )
    }

    await query(
      'DELETE FROM wishlist WHERE user_id = $1 AND course_type = $2',
      [userId, courseType]
    )

    return NextResponse.json(
      {
        success: true,
        message: 'Removed from wishlist',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Remove from wishlist error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    )
  }
}
