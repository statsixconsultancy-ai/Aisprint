import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { cookies } from 'next/headers'

interface RazorpayOrderResponse {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  status: string
  attempts: number
  notes: Record<string, string>
  created_at: number
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

    const body = await request.json()
    const { course_type, amount } = body

    if (!course_type || !amount) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create order in Razorpay
    const razorpayResponse = await fetch(
      'https://api.razorpay.com/v1/orders',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}:${process.env.RAZORPAY_SECRET_KEY}`
          ).toString('base64')}`,
        },
        body: JSON.stringify({
          amount: amount * 100, // Razorpay expects amount in paise
          currency: 'INR',
          receipt: `order_${userId}_${Date.now()}`,
          notes: {
            user_id: userId,
            course_type: course_type,
          },
        }),
      }
    )

    if (!razorpayResponse.ok) {
      throw new Error('Failed to create Razorpay order')
    }

    const razorpayOrder: RazorpayOrderResponse = await razorpayResponse.json()

    // Store payment record in database
    const paymentResult = await query(
      `INSERT INTO payments (user_id, course_type, amount, razorpay_order_id, status)
       VALUES ($1, $2, $3, $4, 'pending')
       RETURNING id`,
      [userId, course_type, amount, razorpayOrder.id]
    )

    return NextResponse.json(
      {
        success: true,
        order_id: razorpayOrder.id,
        amount: razorpayOrder.amount / 100, // Convert back to rupees
        currency: razorpayOrder.currency,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500 }
    )
  }
}
