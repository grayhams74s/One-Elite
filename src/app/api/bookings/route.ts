import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Booking } from "@prisma/client";     

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { payment, booking } = body;

    // Debug logs
    console.log('Received payment:', payment);
    console.log('Received booking:', booking);
    console.log('Session user:', session.user);

    if (!payment || !booking) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Clean up price string and convert to number
    const cleanPrice = booking.price.replace('PHP', '').trim();
    const amount = Number(cleanPrice);

    if (isNaN(amount)) {
      console.log('Price conversion failed');
      return new NextResponse("Invalid price value", { status: 400 });
    }

    // Create the booking with associated payment and user connection
    const newBooking = await prismadb.booking.create({
      data: {
        serviceDate: new Date(booking.date!),
        serviceType: booking.service!,
        notes: booking.notes,
        referenceNo: payment.referenceNo,
        gcashNumber: payment.gcashNumber,
        screenshot: payment.screenshot,
        amount: amount,
        status: "pending",
        vehicleSize: booking.size,
        vehicleMake: booking.make,
        vehicleModel: booking.model,
        vehicleYear: booking.year,
        plateNumber: booking.plateNumber,
        vehicleColor: booking.color,
        user: {
          connect: {
            id: session.user.id
          }
        }
      }
    });

    const sendBookingConfirmationEmail = async (booking: Booking) => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerName: session.user.name,
            customerEmail: session.user.email,
            bookingId: booking.id,
            serviceType: booking.serviceType,
            serviceDate: booking.serviceDate,
            amount: booking.amount,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send confirmation email');
        }
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        // Handle error (optionally show a toast notification)
      }
    };

    await sendBookingConfirmationEmail(newBooking);

    return NextResponse.json(newBooking);

  } catch (error) {
    console.error("[BOOKINGS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prismadb.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    let bookings

    // If user role is admin, owner, or staff, fetch all bookings
    if (["admin", "owner", "staff"].includes(user.role)) {
      bookings = await prismadb.booking.findMany({
        where: {
          adminRequest: false,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    } else {
      // If regular user, fetch only their bookings
      bookings = await prismadb.booking.findMany({
        where: {
          userId: user.id,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }

    return NextResponse.json(bookings)
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}