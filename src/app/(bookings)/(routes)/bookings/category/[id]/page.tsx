"use client"

import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

const services = [
  {
    name: "car-wash",
    displayName: "CAR WASH",
    image: "/assets/carwash.jpg",
    description: "At 1 Elite Automotive, our car wash service involves professionally cleaning the exterior of your vehicle to remove dirt, dust, road grime, and other contaminants. A car wash is essential for maintaining your car's appearance and protecting its finish. Car washes can vary from simple, manual washing with soap and water to more advanced methods using specialized equipment and premium cleaning agents. At 1 Elite, we go beyond the basics, providing a thorough clean that enhances your car's look while ensuring it stays protected from the elements.",
    prices: [
      { size: "SMALL", price: "PHP 150" },
      { size: "MEDIUM", price: "PHP 180" },
      { size: "LARGE", price: "PHP 210" },
      { size: "X-LARGE", price: "PHP 240" },
      { size: "XX-LARGE", price: "PHP 270" },
    ]
  },
  {
    name: "detailing",
    displayName: "DETAILING",
    image: "/assets/detailing.jpg",
    description: "Professional cleaning and polishing of your vehicle's interior and exterior.",
    prices: [
      { size: "SMALL", price: "PHP 2000" },
      { size: "MEDIUM", price: "PHP 2500" },
      { size: "LARGE", price: "PHP 3000" },
      { size: "X-LARGE", price: "PHP 3500" },
      { size: "XX-LARGE", price: "PHP 4000" },
    ]
  },
  {
    name: "engine-service",
    displayName: "ENGINE SERVICE",
    image: "/assets/engine.jpg",
    description: "Comprehensive engine check-up and maintenance to ensure optimal performance.",
    prices: [
      { size: "SMALL", price: "PHP 3000" },
      { size: "MEDIUM", price: "PHP 3500" },
      { size: "LARGE", price: "PHP 4000" },
      { size: "X-LARGE", price: "PHP 4500" },
      { size: "XX-LARGE", price: "PHP 5000" },
    ]
  },
  {
    name: "change-oil",
    displayName: "CHANGE OIL",
    image: "/assets/changeoil.jpg",
    description: "Quick and efficient oil change service using high-quality motor oil.",
    prices: [
      { size: "SMALL", price: "PHP 800" },
      { size: "MEDIUM", price: "PHP 1000" },
      { size: "LARGE", price: "PHP 1200" },
      { size: "X-LARGE", price: "PHP 1400" },
      { size: "XX-LARGE", price: "PHP 1600" },
    ]
  },
  {
    name: "car-wrap",
    displayName: "CAR WRAP",
    image: "/assets/carwrap.jpg",
    description: "Custom vinyl wrapping to transform the look of your vehicle.",
    prices: [
      { size: "SMALL", price: "PHP 5000" },
      { size: "MEDIUM", price: "PHP 6000" },
      { size: "LARGE", price: "PHP 7000" },
      { size: "X-LARGE", price: "PHP 8000" },
      { size: "XX-LARGE", price: "PHP 9000" },
    ]
  },
  {
    name: "transmission-repair",
    displayName: "TRANSMISSION REPAIR",
    image: "/assets/transi.jpg",
    description: "Expert diagnosis and repair of transmission issues for smooth gear shifting.",
    prices: [
      { size: "SMALL", price: "PHP 7000" },
      { size: "MEDIUM", price: "PHP 8000" },
      { size: "LARGE", price: "PHP 9000" },
      { size: "X-LARGE", price: "PHP 10000" },
      { size: "XX-LARGE", price: "PHP 11000" },
    ]
  },
]

export default function BookingCategoryPage() {
  const params = useParams()
  const router = useRouter()
  const serviceName = params.id as string
  
  const service = services.find(s => s.name === serviceName)

  if (!service) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
        <p className="text-xl">Service not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-black text-white p-8">
      {/* Back Button */}
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => router.back()}
        className="absolute top-8 left-8 text-white hover:text-gray-300 transition-colors"
      >
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
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl font-bold mb-6"
        >
          {service.displayName}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden"
        >
          <Image
            src={service.image}
            alt={service.displayName}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center gap-4 mb-8"
        >
          {service.prices?.map((tier, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
              className="text-center"
            >
              <span className="text-sm">{tier.size}</span>
              <div className="text-xl font-bold">{tier.price}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-300 mb-8 text-lg leading-relaxed"
        >
          {service.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button 
            onClick={() => router.push(`/bookings/type-of-car/${serviceName}`)}
            className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-bold"
          >
            BOOK NOW
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
