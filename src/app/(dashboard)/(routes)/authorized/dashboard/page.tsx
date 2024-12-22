import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import Items from "./Items"
import AdminDashboard from "@/app/components/DashboardMetrics"
import UserDashboard from "@/app/components/UserDashboardMetrics"

export default async function DashboardLayout() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="h-full relative">
      <main className="md:pl-12">
      {(session.user.role === 'admin' || session.user.role === 'staff' || session.user.role === 'owner') ? (
          <AdminDashboard />
        ) : (
          <UserDashboard />
        )}
        <Items/>
      </main>
    </div>
  )
}
