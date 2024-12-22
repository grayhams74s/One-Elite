"use client"

import { useParams, useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'

const carSizes = [
  {
    size: "SMALL",
    title: "HATCHBACK OR SMALLER",
    description: "Ex: Picanto, Hyundai i10, Toyota Wigo, or similar",
    image: "https://img.icons8.com/?size=100&id=6htb0HQhhN2B&format=png&color=FFFFFF"
  },
  {
    size: "MEDIUM",
    title: "SEDAN OR SMALL SUV",
    description: "Toyota Corolla, Honda Civic, Honda Mobilio, CX-5, CR-V, Seltos, or similar",
    image: "https://img.icons8.com/?size=100&id=50295&format=png&color=FFFFFF"
  },
  {
    size: "LARGE",
    title: "MID-SIZE SUV (5 SEATER)",
    description: "Ex: Montero, Hilux REVO, Subaru Forester, or similar",
    image: "https://img.icons8.com/?size=100&id=ojlIkMGeBJLm&format=png&color=FFFFFF"
  },
  {
    size: "X-LARGE",
    title: "FULL-SIZE SUV",
    description: "Ex: Larger Toyota Hilux, Rush, GL Grandia, or similar",
    image: "https://img.icons8.com/?size=100&id=49793&format=png&color=FFFFFF"
  },
  {
    size: "XX-LARGE",
    title: "SPECIAL SUV (7 SEATER)",
    description: "Specialized SUVs and larger vehicles",
    image: "https://img.icons8.com/?size=100&id=50298&format=png&color=FFFFFF"
  }
]

export default function TypeOfCarPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [carDetails, setCarDetails] = useState({
    make: "",
    model: "",
    year: "",
    plateNumber: "",
    color: ""
  })
  const serviceName = params.id as string

  const validateForm = () => {
    if (!selectedSize) {
      toast.error("Please select a car size", {
        style: {
          background: '#333',
          color: '#fff',
        }
      })
      return false
    }

    // Check if any required car details are empty
    const requiredFields = {
      make: "Make",
      model: "Model",
      year: "Year",
      plateNumber: "Plate Number",
      color: "Color"
    }

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!carDetails[field as keyof typeof carDetails]) {
        toast.error(`Please enter your car's ${label}`, {
          style: {
            background: '#333',
            color: '#fff',
          }
        })
        return false
      }
    }

    return true
  }

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
        <h1 className="text-5xl font-bold text-center mb-12">TYPE OF CAR</h1>

        {/* Car Selection Form */}
        <div className="space-y-6">
          {/* Vehicle Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {carSizes.map((car, index) => (
              <motion.div
                key={car.size}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedSize === car.size 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-700 hover:border-gray-500'
                }`}
                onClick={() => setSelectedSize(car.size)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={car.image}
                      alt={car.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    {car.size}
                    <h3 className="font-bold">{car.title}</h3>
                    <p className="text-sm text-gray-400">{car.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Car Details Section - Only show when a size is selected */}
          {selectedSize && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 space-y-6"
            >
              <h2 className="text-2xl font-semibold mb-4">Car Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    placeholder="e.g., Toyota"
                    value={carDetails.make}
                    onChange={(e) => setCarDetails(prev => ({...prev, make: e.target.value}))}
                    className="bg-gray-900 border-gray-700 mt-2 placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    placeholder="e.g., Corolla"
                    value={carDetails.model}
                    onChange={(e) => setCarDetails(prev => ({...prev, model: e.target.value}))}
                    className="bg-gray-900 border-gray-700 mt-2 placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    placeholder="e.g., 2020"
                    value={carDetails.year}
                    onChange={(e) => setCarDetails(prev => ({...prev, year: e.target.value}))}
                    className="bg-gray-900 border-gray-700 mt-2 placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="plateNumber">Plate Number</Label>
                  <Input
                    id="plateNumber"
                    placeholder="e.g., ABC 123"
                    value={carDetails.plateNumber}
                    onChange={(e) => setCarDetails(prev => ({...prev, plateNumber: e.target.value}))}
                    className="bg-gray-900 border-gray-700 mt-2 placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    placeholder="e.g., Silver"
                    value={carDetails.color}
                    onChange={(e) => setCarDetails(prev => ({...prev, color: e.target.value}))}
                    className="bg-gray-900 border-gray-700 mt-2 placeholder:text-gray-300"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Notes Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Label className="block text-sm font-medium mb-2">Additional Notes</Label>
            <textarea
              className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or notes about your vehicle..."
            />
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex justify-end mt-8"
          >
            <Button 
              onClick={() => {
                if (validateForm()) {
                  const queryParams = new URLSearchParams({
                    size: selectedSize,
                    notes: notes,
                    make: carDetails.make,
                    model: carDetails.model,
                    year: carDetails.year,
                    plateNumber: carDetails.plateNumber,
                    color: carDetails.color
                  }).toString()
                  router.push(`/bookings/schedule/${serviceName}?${queryParams}`)
                }
              }}
              disabled={!selectedSize}
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-bold"
            >
              CONTINUE
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
