import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { cookies } from 'next/headers'
import { hashPassword, verifyPassword } from '@/lib/auth'

export async function PUT(request: NextRequest) {
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
    const { name, email, country, bio, phone, dob, profile_image_url } = body

    const result = await query(
      `UPDATE public.users 
       SET name = COALESCE($1, name),
           email = COALESCE($2, email),
           country = COALESCE($3, country),
           bio = COALESCE($4, bio),
           phone = COALESCE($5, phone),
           dob = COALESCE($6, dob),
           profile_image_url = COALESCE($7, profile_image_url)
       WHERE id = $8
       RETURNING id, name, email, username, country, bio, phone, dob, profile_image_url`,
      [
        name || null,
        email || null,
        country || null,
        bio || null,
        phone || null,
        dob || null,
        profile_image_url || null,
        userId,
      ]
    )

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        user: result[0],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred' },
      { status: 500 }
    )
  }
}
