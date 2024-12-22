import ContactPage from '@/app/components/landing/ContactUs'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <header className="p-4 flex justify-between items-center bg-black text-white px-12">
        <div className="text-2xl font-bold mt-6">ONE <span className='text-red-600'>ELITE</span></div>
        <nav className="hidden md:flex space-x-4 font-extrabold">
          <Link href="/" className="hover:text-gray-300">HOME</Link>
          <a href="/bookings" className="hover:text-gray-300 text-white">SERVICES</a>
          <a href="#" className="hover:text-gray-300">ABOUT US</a>
          <a href="#" className="hover:text-gray-300 text-red-600">CONTACT US</a>
          <a href="/terms&conditions" className="hover:text-gray-300">TERMS AND CONDITIONS</a>
        </nav>
        <div className="flex items-center space-x-4">
          <div className='font-extrabold'>SIGN IN</div>

          <div className='font-extrabold'>SIGN UP</div>
        </div>
      </header>
        <ContactPage />
    </div>
  )
}

export default page