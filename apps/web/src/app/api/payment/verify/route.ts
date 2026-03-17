import crypto from 'crypto'
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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, course_type } = body

    // Verify signature
    const secret = process.env.RAZORPAY_SECRET_KEY
    const data = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto
      .createHmac('sha256', secret || '')
      .update(data)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Payment verification failed' },
        { status: 400 }
      )
    }

    // Check if user already enrolled
    const existing = await query(
      'SELECT id FROM user_courses WHERE user_id = $1 AND course_type = $2',
      [userId, course_type]
    )

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Already enrolled in this course' },
        { status: 400 }
      )
    }

    // Update payment status
    const paymentResult = await query(
      `UPDATE payments 
       SET status = 'completed', razorpay_payment_id = $1, razorpay_order_id = $2
       WHERE user_id = $3 AND course_type = $4
       RETURNING id`,
      [razorpay_payment_id, razorpay_order_id, userId, course_type]
    )

    // Add user to course
    const courseResult = await query(
      `INSERT INTO user_courses (user_id, course_type, status)
       VALUES ($1, $2, 'active')
       RETURNING id, course_type`,
      [userId, course_type]
    )

    // Remove from wishlist if exists
    await query(
      'DELETE FROM wishlist WHERE user_id = $1 AND course_type = $2',
      [userId, course_type]
    )

    return NextResponse.json(
      {
        success: true,
        message: 'Payment verified and enrolled successfully',
        course: courseResult[0],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Verify payment error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred during verification' },
      { status: 500 }
    )
  }
}
