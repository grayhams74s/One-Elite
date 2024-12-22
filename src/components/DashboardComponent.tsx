"use client"

import * as React from "react"
import { ArrowUpIcon } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, XAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { time: "12am", value: 0 },
  { time: "2am", value: 10 },
  { time: "4am", value: 150 },
  { time: "6am", value: 0 },
  { time: "8am", value: 180 },
  { time: "10am", value: 0 },
  { time: "12pm", value: 350 },
  { time: "2pm", value: 0 },
  { time: "4pm", value: 200 },
  { time: "6pm", value: 80 },
  { time: "8pm", value: 0 },
]

interface MetricCardProps {
  title: string
  value: string | number | React.ReactNode
  percentageIncrease: number
}

function MetricCard({ title, value, percentageIncrease }: MetricCardProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <text x="8" y="16" fontSize="20">₱</text>
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-green-500">
          <ArrowUpIcon className="mr-1 h-4 w-4" />
          {percentageIncrease}%
        </div>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 ">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard 🚀</h2>
        <div className="flex items-center space-x-2">
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard 
            title="Revenue" 
            value={<span className="text-green-500">₱1,030</span>} 
            percentageIncrease={15} 
          />
          <MetricCard title="Orders" value="10" percentageIncrease={19} />
          <MetricCard title="AOV" value="₱103" percentageIncrease={5} />
          <MetricCard title="Refunds" value="0" percentageIncrease={10} />
        </div>
        <Card className="col-span-4 md:w-[1000px] w-lg border-0 shadow-md">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

