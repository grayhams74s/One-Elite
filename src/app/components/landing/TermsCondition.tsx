import Link from 'next/link';
import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <header className="p-4 flex justify-between items-center bg-black text-white px-12">
        <div className="text-2xl font-bold mt-6">ONE <span className='text-red-600'>ELITE</span></div>
        <nav className="hidden md:flex space-x-4 font-extrabold">
          <Link href="/" className="hover:text-gray-300">HOME</Link>
          <a href="/bookings" className="hover:text-gray-300 text-white">SERVICES</a>
          <a href="#" className="hover:text-gray-300">ABOUT US</a>
          <a href="/contact" className="hover:text-gray-300 text-white">CONTACT US</a>
          <a href="/terms&conditions" className="hover:text-gray-300 text-red-600">TERMS AND CONDITIONS</a>
        </nav>
        <div className="flex items-center space-x-4">
          <div className='font-extrabold'>SIGN IN</div>

          <div className='font-extrabold'>SIGN UP</div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0">
        </div>
        <h1 className="text-5xl font-extrabold text-white z-20 tracking-wider text-center">
          TERMS AND CONDITIONS
        </h1>
      </div>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto py-2 px-4">
        <h2 className="text-4xl font-bold text-red-600 mb-8">
          Terms and Conditions<br />
          1 Elite Automotive
        </h2>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold mb-4">1. Pricing Policy</h3>
            <p className="text-gray-300">
              Please note that prices may vary depending on the specific requirements of each service. All quotations are tailored based on the complexity, materials, and time required for each service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4">2. Online Booking and Payment Terms</h3>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>To secure your booking, a 50% down payment is required at the time of reservation.</li>
              <li>The remaining balance must be settled after the service is 100% completed.</li>
              <li>Failure to complete the payment will result in the service being considered incomplete and may lead to penalties.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4">3. Reservation Requirements</h3>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>Reservations must be made at least one day in advance to ensure availability.</li>
              <li>Walk-in services are subject to availability, and pre-booked appointments are prioritized.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4">4. Cancellation Policy</h3>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li>Cancellations made at least 24 hours before the scheduled service will be eligible for a refund of the down payment.</li>
              <li>Cancellations made less than 24 hours before the service will result in the forfeiture of the down payment.</li>
              <li>In the event of a no-show or non-compliance with booking terms, the down payment is non-refundable.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;