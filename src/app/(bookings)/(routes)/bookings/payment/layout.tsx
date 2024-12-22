

'use client'

import { useSearchParams } from 'next/navigation'
import PaymentForm from '@/app/components/Payment'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  
  const bookingDetails = {
    date: searchParams.get('date'),
    time: searchParams.get('time'),
    service: searchParams.get('service'),
    price: searchParams.get('price'),
    size: searchParams.get('size'),
    // Add car details
    make: searchParams.get('make'),
    model: searchParams.get('model'),
    year: searchParams.get('year'),
    plateNumber: searchParams.get('plateNumber'),
    color: searchParams.get('color'),
    notes: searchParams.get('notes'),
  }

  return (
    <div className='min-h-screen w-full bg-black text-white'>
        <PaymentForm bookingDetails={bookingDetails} />
    </div>
  )
}
