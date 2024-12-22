import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

export default async function AddStaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  
  // Check if user is authenticated and has the correct role
  if (session?.user.role === 'user' || session?.user.role === 'staff') {
    redirect('/authorized/dashboard')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1 space-y-4 p-4 pt-6 xl:ml-24">
        {children}
      </div>
    </div>
  )
}
