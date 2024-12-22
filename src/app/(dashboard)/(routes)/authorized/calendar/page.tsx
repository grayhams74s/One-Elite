import { CalendarEvent } from "@/app/components/MyCalendar"
import { Card } from "@/components/ui/card" 

export default function CalendarPage() {
  return (
    <div className="flex-1 p-4 space-y-4 mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight px-7">Calendar</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 border-0 shadow-none">
          <CalendarEvent 
            title="Sample Event"
            description="This is a sample calendar event"
            startTime={new Date().toISOString()}
            endTime={new Date(Date.now() + 3600000).toISOString()}
            location="Virtual"
            attendees={[{ name: "John Doe", email: "john@example.com" }]}
          />
        </Card>

        <Card className="p-4 border-0 shadow-none">
          <CalendarEvent 
            title="Another Event"
            description="This is another calendar event"
            startTime={new Date().toISOString()}
            endTime={new Date(Date.now() + 7200000).toISOString()}
            location="Office"
            attendees={[{ name: "John Doe", email: "john@example.com" }]}
          />
        </Card>

        <Card className="p-4 border-0 shadow-none">
          <CalendarEvent 
            title="Third Event"
            description="This is a third calendar event"
            startTime={new Date().toISOString()}
            endTime={new Date(Date.now() + 5400000).toISOString()}
            location="Remote"
            attendees={[{ name: "John Doe", email: "john@example.com" }]}
          />
        </Card>
      </div>
    </div>
  )
}
