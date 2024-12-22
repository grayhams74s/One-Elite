"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Attendee {
  name: string
  email: string
  avatar?: string
}

interface CalendarEventProps {
  title: string
  description: string
  startTime: string
  endTime: string
  location: string
  attendees: Attendee[]
}

export function CalendarEvent({
  title,
  description,
  startTime,
  endTime,
  location,
  attendees
}: CalendarEventProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatTime = (time: string) => {
    return format(parseISO(time), "h:mm a")
  }

  const formatDate = (time: string) => {
    return format(parseISO(time), "EEEE, MMMM d, yyyy")
  }

  return (
    <Card className="w-full max-w-md mx-auto border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <div className="flex items-center text-gray-500 mt-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(startTime)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-3 text-gray-500" />
            <div>
              <p className="font-medium">{formatTime(startTime)} - {formatTime(endTime)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-3 text-gray-500" />
            <p>{location}</p>
          </div>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-3 text-gray-500" />
              <p>{attendees.length} attendees</p>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 ml-2">
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2">
              <div className="space-y-2">
                {attendees.map((attendee, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={attendee.avatar} alt={attendee.name} />
                      <AvatarFallback>{attendee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{attendee.name}</p>
                      <p className="text-xs text-gray-500">{attendee.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">{description}</p>
      </CardFooter>
    </Card>
  )
}

// Example usage
export default function CalendarEventExample() {
  const eventData = {
    title: "Team Project Review",
    description: "Monthly review of our ongoing project progress and next steps.",
    startTime: "2023-07-15T14:00:00",
    endTime: "2023-07-15T15:30:00",
    location: "Conference Room A",
    attendees: [
      { name: "Alice Johnson", email: "alice@example.com", avatar: "https://api.dicebear.com/6.x/initials/svg?seed=Alice" },
      { name: "Bob Smith", email: "bob@example.com", avatar: "https://api.dicebear.com/6.x/initials/svg?seed=Bob" },
      { name: "Charlie Brown", email: "charlie@example.com", avatar: "https://api.dicebear.com/6.x/initials/svg?seed=Charlie" },
      { name: "Diana Ross", email: "diana@example.com", avatar: "https://api.dicebear.com/6.x/initials/svg?seed=Diana" },
    ]
  }

  return <CalendarEvent {...eventData} />
}

