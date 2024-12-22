"use client"

import { Mail, MapPin, Phone } from 'lucide-react'
import Link from "next/link"

export default function ReservationSuccess() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          1E
        </Link>
        <nav className="hidden md:flex space-x-6 text-sm">
          <Link href="/about" className="hover:text-gray-300">ABOUT US</Link>
          <Link href="/services" className="text-red-500 hover:text-red-400">SERVICES</Link>
          <Link href="/contact" className="hover:text-gray-300">CONTACT US</Link>
          <Link href="/careers" className="hover:text-gray-300">CAREERS</Link>
          <Link href="/terms" className="hover:text-gray-300">TERMS AND CONDITIONS</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-20">
          {/* Success Message */}
          <div className="text-center space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Your
              <br />
              reservation
              <br />
              is now
              <br />
              complete.
            </h1>
            <div className="bg-zinc-900 p-6 max-w-xl mx-auto">
              <p className="text-lg">
                Please check your email; we&apos;ve sent you the details along with your Reservation No#.
              </p>
            </div>
          </div>

          {/* Contact and Map Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-red-500 font-bold mb-2">ABOUT US</h2>
                <p className="text-sm text-gray-300">
                  Located at 1234 NE 11 Ave Mechanics Avenue,
                  Commonwealth Extension, Fairview, Square City.
                  Our passion and expertise in providing premium auto
                  care services has made us the preferred choice for
                  car enthusiasts. With state-of-the-art diagnostic,
                  maintenance and repair services, we deliver above
                  and beyond expectations. Visit us today to experience
                  Elite Automotive&apos;s world-class service!
                </p>
              </div>

              <div>
                <h2 className="text-red-500 font-bold mb-2">CALL US</h2>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
              </div>

              <div>
                <h2 className="text-red-500 font-bold mb-2">VISIT US</h2>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Hours: Open daily from 8:00am to 9:00pm</span>
                </div>
                <div className="flex items-center space-x-2 text-sm mt-1">
                  <Mail className="h-4 w-4" />
                  <span>info@1eautomotive.com</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-zinc-900 h-[300px] rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Interactive Map Would Go Here</p>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-sm text-gray-400 pt-8 border-t border-zinc-800">
            <p>SCHEDULE AN APPOINTMENT | SERVICES | PRIVACY POLICY</p>
          </footer>
        </div>
      </main>
    </div>
  )
}

