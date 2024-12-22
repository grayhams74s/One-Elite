"use client"

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PaymentSuccessPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <CheckCircle2 className="w-20 h-20 text-white mb-6" />
      </motion.div>
      
      <motion.h1 
        className="text-3xl md:text-4xl font-bold text-center mb-4 text-white"
        variants={itemVariants}
      >
        Payment Successful!
      </motion.h1>

      
      <motion.p 
        className="text-gray-600 text-center mb-8 max-w-md"
        variants={itemVariants}
      >
        Thank you for your payment. Please wait for approval from the admin.
      </motion.p>
      
      <motion.div 
        className="space-x-4"
        variants={itemVariants}
      >
        <Link href="/authorized/dashboard">
          <Button variant="default" className="text-black bg-white font-bold hover:text-white">
            Go to Dashboard
          </Button>
        </Link>
        <Link href="/authorized/dashboard">
          <Button variant="outline" className='text-white hover:text-white'>
            View Bookings
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
