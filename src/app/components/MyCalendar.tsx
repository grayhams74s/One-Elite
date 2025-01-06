"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Menu, Plus, Search, HelpCircle, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Event {
  id: string
  title: string
  start: Date
  end: Date
  color: string
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [view, setView] = React.useState<"day" | "week" | "month" | "year">("week")
  const [events] = React.useState<Event[]>([
    {
      id: "1",
      title: "Video conference",
      start: new Date(2024, 1, 23, 9, 30),
      end: new Date(2024, 1, 23, 11, 30),
      color: "bg-red-200",
    },
    {
      id: "2",
      title: "Lisa's Birthday",
      start: new Date(2024, 1, 25, 0, 0),
      end: new Date(2024, 1, 25, 23, 59),
      color: "bg-blue-200",
    },
    {
      id: "3",
      title: "Virtual yoga class",
      start: new Date(2024, 1, 27, 9, 0),
      end: new Date(2024, 1, 27, 10, 0),
      color: "bg-purple-200",
    },
  ])

  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8) // 8 AM to 6 PM

  const startOfWeek = React.useMemo(() => {
    const date = new Date(currentDate)
    const day = date.getDay()
    return new Date(date.setDate(date.getDate() - day))
  }, [currentDate])

  const daysInWeek = React.useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(date.getDate() + i)
      return date
    })
  }, [startOfWeek])

  const daysInMonth = React.useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    
    // Add days from previous month to start on Sunday
    const prevMonthDays = firstDay.getDay()
    const prevMonth = new Date(year, month, 0)
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonth.getDate() - i))
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i))
    }
    
    return days
  }, [currentDate])

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const navigateToToday = () => {
    setCurrentDate(new Date())
  }

  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (view === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (view === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const formatEventTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r p-4 md:flex">
        <div className="flex items-center gap-2 pb-4">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-500" />
            <span className="font-semibold">Calendar</span>
          </div>
        </div>

        <Button className="mb-6 gap-2">
          <Plus className="h-4 w-4" />
          Create
        </Button>

        <div className="mb-4">
          <div className="grid grid-cols-7 text-center text-sm">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {daysInMonth.map((date, i) => (
              <div
                key={i}
                className={`cursor-pointer p-1 ${
                  date.getMonth() === currentDate.getMonth()
                    ? ""
                    : "text-gray-400"
                } ${
                  date.getDate() === currentDate.getDate() &&
                  date.getMonth() === currentDate.getMonth()
                    ? "rounded-full bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => setCurrentDate(new Date(date))}
              >
                {date.getDate()}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" checked className="rounded border-gray-300" />
            <span>My Calendar</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked className="rounded border-gray-300" />
            <span>Birthdays</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked className="rounded border-gray-300" />
            <span>Reminders</span>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked className="rounded border-gray-300" />
            <span>Tasks</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5 md:hidden" />
            </Button>
            <Button variant="ghost" onClick={navigateToToday}>Today</Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={navigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={navigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h1 className="text-xl font-semibold">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            <HelpCircle className="h-5 w-5" />
            <Settings className="h-5 w-5" />
            <Select value={view} onValueChange={(value: "day" | "week" | "month" | "year") => setView(value)}>
              <SelectTrigger className="w-[110px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Calendar Grid */}
        <div className="grid grid-cols-8 border-b">
          {/* Time column */}
          <div className="border-r pt-16">
            {timeSlots.map((hour) => (
              <div key={hour} className="relative h-20 border-t px-2 text-sm text-gray-500">
                <span className="absolute -top-3">{`${hour}:00`}</span>
              </div>
            ))}
          </div>

          {/* Days columns */}
          {daysInWeek.map((date, i) => (
            <div key={i} className="relative">
              <div className="sticky top-0 border-b bg-white p-2 text-center">
                <div className="text-sm text-gray-500">
                  {date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                </div>
                <div className={`text-lg ${
                  date.getDate() === new Date().getDate() &&
                  date.getMonth() === new Date().getMonth() &&
                  date.getFullYear() === new Date().getFullYear()
                    ? "rounded-full bg-blue-500 text-white"
                    : ""
                }`}>
                  {date.getDate()}
                </div>
              </div>

              {/* Events */}
              <div className="relative">
                {timeSlots.map((hour) => (
                  <div key={hour} className="h-20 border-t" />
                ))}
                {getEventsForDate(date).map((event) => {
                  const startHour = event.start.getHours()
                  const startMinutes = event.start.getMinutes()
                  const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60) // duration in minutes
                  const top = ((startHour - 8) * 80) + ((startMinutes / 60) * 80)
                  const height = (duration / 60) * 80

                  return (
                    <div
                      key={event.id}
                      className={`absolute left-0 right-0 mx-1 rounded ${event.color} p-2 text-xs`}
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                      }}
                    >
                      {event.title}
                      <br />
                      {formatEventTime(event.start)} - {formatEventTime(event.end)}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

