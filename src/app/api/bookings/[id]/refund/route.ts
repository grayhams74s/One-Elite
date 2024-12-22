import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prismadb'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = parseInt(params.id)
    const { refundImage } = await request.json()

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        screenshot: refundImage,
        status: 'refunded'
      },
    })

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error('Error updating refund:', error)
    return NextResponse.json(
      { message: 'Error updating refund' },
      { status: 500 }
    )
  }
}