"use client"


import { User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function HerosComponent() {
  const { data: session } = useSession()


  return (
    <div className="relative h-screen bg-gray-900 text-white overflow-hidden">
      <Image
        src="/assets/ONES.png"
        layout="fill"
        objectFit="cover"
        quality={100}
        alt="Car detailing background"
        priority
        className="opacity-50"
      />
      
      <nav className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-6 px-20">
        <div className="text-2xl font-extrabold">ONE <span className='text-red-600'>EL1TE</span></div>
        <div className="hidden md:flex space-x-6">
          <Link className="text-red-500 font-semibold" href="/">HOME</Link>
          <Link className="font-semibold hover:text-red-300 transition-all" href="/bookings">SERVICES</Link>
          <Link className="font-semibold hover:text-red-300 transition-all" href="/">ABOUT US</Link>
          <Link className="font-semibold hover:text-red-300 transition-all" href="/contact">CONTACT US</Link>
          <Link  className="font-semibold hover:text-red-300 transition-all" href="/terms&conditions">TERMS AND CONDITIONS</Link>
        </div>
        <div className="flex items-center space-x-4">
          {!session ? (
            <>
              <Link href="/auth/login" className="px-4 py-2 bg-transparent font-semibold hover:text-red-300 transition-all">SIGN IN</Link>
              <Link href="/auth/sign-up" className="px-4 py-2 bg-transparent font-semibold hover:text-red-300 transition-all">SIGN UP</Link>
            </>
          ) : null}
          {session && (
            <Link href="/authorized/dashboard">
              <User className="w-6 h-6 cursor-pointer hover:text-red-300 transition-all" />
            </Link>
          )}
        </div>
      </nav>
      
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          The shine<br />that lasts<br />FOREVER.
        </h1>
        <p className="mb-8 max-w-md text-lg font-extralight">
          One Elite Automotive specializes in premium automotive solutions, offering top-tier vehicles, expert servicing, and unparalleled customer care.
        </p>
        <Link href="/bookings">
          <button className="bg-white text-black py-3 px-8 rounded-lg w-40 font-bold text-sm hover:bg-white/95">
            BOOK NOW
          </button>
        </Link>
      </div>
    </div>
  )
}