/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Download } from "lucide-react"


const itemVariants = {
  // ... your existing variants
}

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const mockData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
]

export default function AdminDashboard() {
  return (
    <>
      <motion.div 
        className="flex justify-between items-center mt-10 px-5"
        variants={itemVariants}
      >
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-none shadow-md">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Pick a date 
          </Button>
          <Button variant="default" className="bg-black hover:bg-black/90 text-white">
            <Download className="mr-2 h-4 w-4" />
            My Report
          </Button>
        </div>
      </motion.div>

      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-8 py-12"
        variants={itemVariants}
      >
        <Card className="col-span-2 p-2 border-gray-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#000000" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2 p-2 border-gray-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Growth Trend</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#000000" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
