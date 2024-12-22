import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import Items from "./Items"


export default async function DashboardLayout() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="h-full relative">
      <main className="md:pl-12 mt-24">
        <div className="text-2xl font-bold">Approval Request</div>
        <Items/>
      </main>
    </div>
  )
}
