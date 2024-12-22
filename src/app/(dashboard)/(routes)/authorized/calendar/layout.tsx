import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calendar",
  description: "View and manage your schedule",
}

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  )
}
