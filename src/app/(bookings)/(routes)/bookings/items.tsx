"use client"

import { useState } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import UpdatedFooter from '@/app/components/landing/UpdatedFooter'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const services = [
  { id: 1,
    name: "Detailing", 
    image: "/assets/detailing.jpg",
    description: "Professional cleaning and polishing of your vehicle's interior and exterior."
  },
  { id: 2,
    name: "Engine Service", 
    image: "/assets/engine.jpg",
    description: "Comprehensive engine check-up and maintenance to ensure optimal performance."
  },
  { id: 3,
    name: "Change Oil", 
    image: "/assets/changeoil.jpg",
    description: "Quick and efficient oil change service using high-quality motor oil."
  },
  { id: 4,
    name: "Car Wrap", 
    image: "/assets/carwrap.jpg",
    description: "Custom vinyl wrapping to transform the look of your vehicle."
  },
  { id: 5,
    name: "Transmission Repair", 
    image: "/assets/transi.jpg",
    description: "Expert diagnosis and repair of transmission issues for smooth gear shifting."
  },
  { id: 6,
    name: "Car Wash", 
    image: "/assets/carwash.jpg",
    description: "Thorough exterior wash and interior vacuum for a spotless vehicle."
  },
]

export default function Component() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const { data: session } = useSession()
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const handleBookNow = (serviceName: string) => {
    if (!session) {
      router.push('/auth/login')
      return
    }
    
    const urlServiceName = serviceName.toLowerCase().replace(/\s+/g, '-')
    router.push(`/bookings/category/${urlServiceName}`)
  }

  return (
    <motion.div 
      className="min-h-screen bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="p-4 flex justify-between items-center px-12">
        <motion.div 
          className="text-2xl font-bold mt-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ONE <span className='text-red-600'>ELITE</span>
        </motion.div>
        <nav className="hidden md:flex space-x-4 font-extrabold">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-6"
          >
            <Link href="/" className="hover:text-gray-300">HOME</Link>
            <Link href="#" className="hover:text-gray-300 text-red-600">SERVICES</Link>
            <Link href="#" className="hover:text-gray-300">ABOUT US</Link>
            <Link href="/contact" className="hover:text-gray-300">CONTACT US</Link>
            <Link href="/terms&conditions" className="hover:text-gray-300">TERMS AND CONDITIONS</Link>
          </motion.div>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href={"/authorized/dashboard"}>
          <button className="hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-5xl font-bold mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          BOOK YOUR SERVICES
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-800 rounded-lg overflow-hidden relative"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="relative">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={1080}
                  height={1080}
                  className="w-full h-48 object-cover"
                />
                {hoveredService === index && (
                  <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-center">{service.description}</p>
                  </motion.div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
                <p className="text-2xl font-bold mb-4"></p>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => handleBookNow(service.name)}
                    className="w-full bg-white text-black hover:bg-black hover:text-white"
                  >
                    Book Now
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <UpdatedFooter />
    </motion.div>
  )
}