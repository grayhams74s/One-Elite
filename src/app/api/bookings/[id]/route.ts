// src/app/api/bookings/[id]/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prismadb'
import { authOptions } from '@/lib/auth'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    // Check if user is authenticated
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const bookingId = parseInt(params.id)
    if (isNaN(bookingId)) {
      return NextResponse.json(
        { error: 'Invalid booking ID' },
        { status: 400 }
      )
    }

    const { status } = await request.json()

    // Validate status
    const validStatuses = ['pending', 'approved', 'completed', 'rejected', 'cancelled', 'refunded']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Check if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Only allow admins/staff to update to certain statuses
    if (session.user.role === 'user' && status !== 'cancelled') {
      return NextResponse.json(
        { error: 'Unauthorized to update to this status' },
        { status: 403 }
      )
    }

    // Update the booking
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status }
    })

    return NextResponse.json(updatedBooking)

  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has proper role
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.role !== 'admin' && session.user.role !== 'owner') {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const bookingId = parseInt(params.id);

    // Check if booking exists
    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      return new NextResponse("Booking not found", { status: 404 });
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    return new NextResponse("Booking deleted successfully", { status: 200 });

  } catch (error) {
    console.error('Error deleting booking:', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}