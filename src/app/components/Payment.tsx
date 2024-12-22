/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Image from 'next/image'
import { useState, } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { UploadDropzone } from "../utils/uploadthing";
import toast from 'react-hot-toast'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import "@uploadthing/react/styles.css";
import axios from 'axios'


type BookingDetails = {
  date: string | null;
  time: string | null;
  service: string | null;
  price: string | null;
  size: string | null;
  make: string | null;
  model: string | null;
  year: string | null;
  plateNumber: string | null;
  color: string | null;
  notes: string | null;
}

interface PaymentFormProps {
  bookingDetails: BookingDetails
}

export default function PaymentForm({ bookingDetails }: PaymentFormProps) {
  const router = useRouter()
  const [enableRecurring, setEnableRecurring] = useState(false)
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAgreed, setIsAgreed] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    referenceNo: '',
    gcashNumber: '',
  })

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const handleConfirmOrder = async () => {
    if (!paymentDetails.referenceNo.trim()) {
      toast.error('Please enter a reference number')
      return
    }

    if (!paymentDetails.gcashNumber.trim()) {
      toast.error('Please enter a GCash number')
      return
    }

    if (!imageUrl) {
      toast.error('Please upload a payment screenshot')
      return
    }

    if (!isAgreed) {
      toast.error('Please agree to the Terms and Conditions')
      return
    }

    await toast.promise(
      axios.post('/api/bookings', {
        payment: {
          ...paymentDetails,
          screenshot: imageUrl,
        },
        booking: bookingDetails
      }),
      {
        loading: 'Confirming your booking...',
        success: () => {
          router.push('/bookings/success')
          return 'Booking confirmed successfully!'
        },
        error: 'Failed to confirm booking. Please try again.'
      }
    )
  }

  return (
    <motion.div 
      className="container mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Link 
        href="/bookings/schedule/car-wash?size=LARGE&notes=" 
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft size={20} className='text-white hover:text-white/20'/>
        <span className='text-white hover:text-white/20'>Back to Schedule</span>
      </Link>

      <motion.h1 
        className='text-4xl font-extrabold mt-5 flex gap-x-2 items-center justify-center'
        variants={itemVariants}
      >
        <Image 
          src="https://img.icons8.com/?size=100&id=a8naL829HXnB&format=png&color=FFFFFF"
          alt="Payment Icon"
          width={60}
          height={60}
        />
        Payment
      </motion.h1>
      <div className="grid gap-6 lg:grid-cols-2 mt-20">
        <motion.div variants={itemVariants}>
          {/* Payment Details Section */}
          <Card className='bg-white text-black shadow-md border-none shadow-white'>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* VAT Number */}
                <div className="space-y-2">
                  <Label htmlFor="vat">Reference No.</Label>
                  <Input 
                    id="vat" 
                    placeholder="" 
                    className='border-black/20'
                    value={paymentDetails.referenceNo}
                    onChange={(e) => setPaymentDetails(prev => ({
                      ...prev,
                      referenceNo: e.target.value
                    }))}
                  />
                </div>

                {/* PO Number */}
                <div className="space-y-2">
                  <Label htmlFor="po">GCASH Number</Label>
                  <Input 
                    id="po" 
                    placeholder="+63" 
                    className='border-black/20'
                    value={paymentDetails.gcashNumber}
                    onChange={(e) => setPaymentDetails(prev => ({
                      ...prev,
                      gcashNumber: e.target.value
                    }))}
                  />
                </div>

                {/* Payment Method */}

                {imageUrl ? (
                  <div className="flex items-center justify-center">
                     <Image src={imageUrl} alt="Screenshot" width={300} height={300} />
                  </div>
                ) : (
                  <p>No screenshot uploaded</p>
                )}

                {/* Screenshot Upload */}
                <div className="flex items-center justify-center gap-4">
                  <UploadDropzone
                    appearance={{
                      container: {},
                      uploadIcon: { color: "black" },
                      label: { color: "black" },
                      button: {
                        color: "white",
                        background: "black",
                        cursor: "pointer",
                      },
                    }}
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        setImageUrl(res[0].url);
          
                      }
                    }}
                    onUploadError={(error: Error) => {
    
                    }}
                  />
                </div>

                {/* Save Payment Details */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="savePayment" 
                    checked={isAgreed}
                    onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                  />
                  <Label htmlFor="savePayment">Agree to Terms and Conditions</Label>
                </div>

                {/* Recurring Payments */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Switch
                      checked={enableRecurring}
                      onCheckedChange={setEnableRecurring}
                    />
                  </div>

                  {enableRecurring && (
                    <div className="space-y-2">
                      <Label>When my balance is below</Label>
                      <div className="flex items-center gap-2">
                        <Input placeholder="€ 0.00" className="w-32" />
                        <span className="text-sm text-muted-foreground">Automatically recharge</span>
                        <Input placeholder="€ 500.00" className="w-32" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          {/* Order Summary Section */}
          <Card className='bg-white text-black shadow-md border-none shadow-white'>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking Date</span>
                  <span>{new Date(bookingDetails.date!).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span>{new Date(bookingDetails.date!).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span>{bookingDetails.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size</span>
                  <span>{bookingDetails.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Balance amount</span>
                  <span> {bookingDetails.price}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span> {bookingDetails.price}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                </div>
                <Button 
                  className="w-full bg-black text-white hover:bg-slate-800 hover:text-white transition-all" 
                  size="lg"
                  onClick={handleConfirmOrder}
                >
                  Confirm your order
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  After confirming your order, you will be notified via email if your booking is approved.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

