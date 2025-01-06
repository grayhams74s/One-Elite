import MyCalendar  from "@/app/components/MyCalendar"


export default function CalendarPage() {
  return (
    <div className="flex-1 p-4 space-y-4 mt-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight px-7">Calendar</h2>
      </div>
      <div>
        <MyCalendar />
      </div>
    </div>
  )
}
