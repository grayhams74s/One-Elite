/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/api/send-email/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import BookingConfirmationEmail from '@/app/components/emails/BookingConfirmation';
import { BookingApprovedEmail } from '@/app/components/emails/BookingApprovedEmail';
import { BookingRejectedEmail } from '@/app/components/emails/BookingRejectedEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, bookingId, serviceType, serviceDate, amount, status, reason } = body;

    let emailContent;
    let subject;

    switch (status) {
      case 'approved':
        emailContent = BookingApprovedEmail({
          customerName,
          bookingId,
          serviceType,
          serviceDate,
          amount,
        });
        subject = 'Your Booking Has Been Approved!';
        break;
      case 'rejected':
        emailContent = BookingRejectedEmail({
          customerName,
          bookingId,
          serviceType,
          reason,
        });
        subject = 'Update Regarding Your Booking Request';
        break;
      case 'refunded':
        emailContent = BookingRejectedEmail({
          customerName,
          bookingId,
          serviceType,
          reason,
        });
        subject = 'Your Booking Has Been Refunded';
        break;
      default:
        emailContent = BookingConfirmationEmail({
          customerName,
          bookingId,
          serviceType,
          serviceDate,
          amount,
        });
        subject = 'Booking Confirmation';
    }

    const data = await resend.emails.send({
      from: 'One Elite Automotive <bookings@quillolab.com>',
      to: "felixangcot74@gmail.com",
      subject: subject,
      react: emailContent,
    });

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}