/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Download, Settings } from 'lucide-react'
import { LineChart, BarChart } from "@/app/components/ui/chart"
import OrdersTable from "./Orders"
import { motion } from "framer-motion"

export default function ApprovalBoard() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings/approval')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setBookings(data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [])

  // Sample data for charts
  const lineChartData = [40, 60, 45, 35, 50, 55]
  const barChartData = {
    desktop: [580, 650, 540, 420, 380, 530],
    mobile: [480, 550, 410, 480, 420, 390]
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

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

  return (
    <motion.div 
      className="p-6 space-y-6 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="grid gap-6 md:grid-cols-2"
        variants={itemVariants}
      >
        <OrdersTable bookings={bookings} isLoading={isLoading} />
      </motion.div>
    </motion.div>
  )
}

