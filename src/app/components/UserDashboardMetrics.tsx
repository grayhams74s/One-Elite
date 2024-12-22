"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  Home,  } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { useRouter } from "next/navigation"

const itemVariants = {
  // ... your existing variants
}

const mockData = [
  { name: 'Jan', bookings: 2, spend: 150 },
  { name: 'Feb', bookings: 3, spend: 220 },
  { name: 'Mar', bookings: 1, spend: 80 },
  { name: 'Apr', bookings: 4, spend: 300 },
  { name: 'May', bookings: 2, spend: 175 },
]

export default function UserDashboard() {
  const router = useRouter()

  return (
    <>
      <motion.div 
        className="flex justify-between items-center mt-10 px-5"
        variants={itemVariants}
      >
        <h1 className="text-2xl font-bold">My Activity</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-none"
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>
      </motion.div>

      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-8 py-12"
        variants={itemVariants}
      >
        <Card className="col-span-2 p-2 border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Bookings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#000000" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2 p-2 border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Spend</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="spend" stroke="#000000" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
