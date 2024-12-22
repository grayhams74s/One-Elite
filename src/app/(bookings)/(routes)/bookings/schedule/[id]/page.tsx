"use client"

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from 'react'

const services = [
  {
    name: "car-wash",
    displayName: "CAR WASH",
    image: "/assets/carwash.jpg",
    prices: {
      "SMALL": "PHP 150",
      "MEDIUM": "PHP 180",
      "LARGE": "PHP 210",
      "X-LARGE": "PHP 240",
      "XX-LARGE": "PHP 270"
    }
  },
  {
    name: "detailing",
    displayName: "DETAILING",
    image: "/assets/detailing.jpg",
    prices: {
      "SMALL": "PHP 2000",
      "MEDIUM": "PHP 2500",
      "LARGE": "PHP 3000",
      "X-LARGE": "PHP 3500",
      "XX-LARGE": "PHP 4000"
    }
  },
  {
    name: "engine-service",
    displayName: "ENGINE SERVICE",
    image: "/assets/engine.jpg",
    prices: {
      "SMALL": "PHP 3000",
      "MEDIUM": "PHP 3500",
      "LARGE": "PHP 4000",
      "X-LARGE": "PHP 4500",
      "XX-LARGE": "PHP 5000"
    }
  },
  {
    name: "change-oil",
    displayName: "CHANGE OIL",
    image: "/assets/changeoil.jpg",
    prices: {
      "SMALL": "PHP 800",
      "MEDIUM": "PHP 1000",
      "LARGE": "PHP 1200",
      "X-LARGE": "PHP 1400",
      "XX-LARGE": "PHP 1600"
    }
  },
  {
    name: "car-wrap",
    displayName: "CAR WRAP",
    image: "/assets/carwrap.jpg",
    prices: {
      "SMALL": "PHP 5000",
      "MEDIUM": "PHP 6000",
      "LARGE": "PHP 7000",
      "X-LARGE": "PHP 8000",
      "XX-LARGE": "PHP 9000"
    }
  },
  {
    name: "transmission-repair",
    displayName: "TRANSMISSION REPAIR",
    image: "/assets/transi.jpg",
    prices: {
      "SMALL": "PHP 7000",
      "MEDIUM": "PHP 8000",
      "LARGE": "PHP 9000",
      "X-LARGE": "PHP 10000",
      "XX-LARGE": "PHP 11000"
    }
  },
  {
    name: "paint-job",
    displayName: "PAINT JOB",
    image: "/assets/paintjob.jpg",
    prices: {
      "SMALL": "PHP 15000",
      "MEDIUM": "PHP 18000",
      "LARGE": "PHP 21000",
      "X-LARGE": "PHP 24000",
      "XX-LARGE": "PHP 27000"
    }
  },
  {
    name: "ceramic-coating",
    displayName: "CERAMIC COATING",
    image: "/assets/ceramic.jpg",
    prices: {
      "SMALL": "PHP 25000",
      "MEDIUM": "PHP 30000",
      "LARGE": "PHP 35000",
      "X-LARGE": "PHP 40000",
      "XX-LARGE": "PHP 45000"
    }
  },
  {
    name: "tint",
    displayName: "TINT",
    image: "/assets/tint.jpg",
    prices: {
      "SMALL": "PHP 3500",
      "MEDIUM": "PHP 4000",
      "LARGE": "PHP 4500",
      "X-LARGE": "PHP 5000",
      "XX-LARGE": "PHP 5500"
    }
  },
  {
    name: "wheel-alignment",
    displayName: "WHEEL ALIGNMENT",
    image: "/assets/wheel.jpg",
    prices: {
      "SMALL": "PHP 1000",
      "MEDIUM": "PHP 1200",
      "LARGE": "PHP 1400",
      "X-LARGE": "PHP 1600",
      "XX-LARGE": "PHP 1800"
    }
  }
]

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";

export default function SchedulePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const serviceName = params.id as string
  const carSize = searchParams.get('size')
  const notes = searchParams.get('notes')
  const make = searchParams.get('make')
  const model = searchParams.get('model')
  const year = searchParams.get('year')
  const plateNumber = searchParams.get('plateNumber')
  const color = searchParams.get('color')
  const service = services.find(s => s.name === serviceName)
  const price = service?.prices[carSize as keyof typeof service.prices]
  
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const availableTimes = [
    setHours(setMinutes(new Date(), 0), 9),  // 9:00 AM
    setHours(setMinutes(new Date(), 0), 10), // 10:00 AM
    setHours(setMinutes(new Date(), 0), 11), // 11:00 AM
    setHours(setMinutes(new Date(), 0), 13), // 1:00 PM
    setHours(setMinutes(new Date(), 0), 14), // 2:00 PM
    setHours(setMinutes(new Date(), 0), 15), // 3:00 PM
    setHours(setMinutes(new Date(), 0), 16), // 4:00 PM
  ];

  const carDetailsSection = (
    <div className="mt-4 space-y-2 text-gray-300">
      <p className="text-sm">Vehicle Size: <span className="font-semibold">{carSize}</span></p>
      <p className="text-sm">Vehicle: <span className="font-semibold">{`${year} ${make} ${model}`}</span></p>
      <p className="text-sm">Plate Number: <span className="font-semibold">{plateNumber}</span></p>
      <p className="text-sm">Color: <span className="font-semibold">{color}</span></p>
      {notes && (
        <div className="text-sm">
          <p className="font-medium">Notes:</p>
          <p className="italic">{notes}</p>
        </div>
      )}
    </div>
  )

  if (!service) return null

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
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
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-bold text-center mb-12">TIME & DATE</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative h-[300px] rounded-lg overflow-hidden"
          >
            <Image
              src={service.image}
              alt={service.displayName}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Right Column - Booking Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold">{service.displayName}</h2>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-500">★</span>
                  ))}
                </div>
              </div>
              <p className="text-2xl font-bold mt-2">{price}</p>
              
              {/* Car Size and Notes */}
              {carDetailsSection}
            </div>

            {/* Date and Time Selection */}
            <div>
              <label className="block text-sm mb-2">Select Date and Time</label>
              <DatePicker
                selected={selectedDateTime}
                onChange={(date) => setSelectedDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                injectTimes={availableTimes}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                filterTime={(time) => {
                  const hour = time.getHours();
                  // Allow only business hours (9 AM - 4 PM, excluding 12 PM)
                  return hour >= 9 && hour <= 16 && hour !== 12;
                }}
                className="w-full p-2 bg-gray-900 text-white rounded border border-gray-700"
                wrapperClassName="w-full"
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <button 
                  onClick={() => {/* Add terms modal or navigation */}}
                  className="text-blue-400 hover:underline"
                >
                  terms and conditions
                </button>
              </label>
            </div>

            {/* Book Now Button */}
            <Button 
              onClick={() => {
                if (selectedDateTime && agreedToTerms) {
                  const queryParams = new URLSearchParams({
                    service: service.displayName,
                    price: price!,
                    size: carSize!,
                    make: make!,
                    model: model!,
                    year: year!,
                    plateNumber: plateNumber!,
                    color: color!,
                    date: selectedDateTime.toISOString(),
                    ...(notes && { notes }),
                  }).toString();
                  
                  router.push(`/bookings/payment?${queryParams}`);
                }
              }}
              disabled={!selectedDateTime || !agreedToTerms}
              className="w-full bg-white text-black hover:bg-gray-200"
            >
              BOOK NOW
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
