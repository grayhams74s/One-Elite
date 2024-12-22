"use client"

import { Home, BookOpenCheckIcon, UserRoundCog, PlusCircle, ChartSpline, Settings, LucideIcon, LogOut, FilePen } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"

type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
}

const defaultItems: MenuItem[] = [
  { title: "Home", url: "/authorized/dashboard", icon: Home },
  { title: "My Calendar", url: "/authorized/calendar", icon: BookOpenCheckIcon },
  { title: "Customers", url: "/authorized/customers", icon: UserRoundCog },
  { title: "Approval", url: "/authorized/approval", icon: FilePen },
  { title: "Add Staff", url: "/authorized/add-staff", icon: PlusCircle },
  { title: "Reports", url: "/authorized/reports", icon: ChartSpline },
  { title: "Settings", url: "/authorized/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [userRole, setUserRole] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/users/${session.user.id}`)
          const data = await response.json()
          setUserRole(data.role)
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [session])

  const getFilteredMenuItems = () => {
    if (userRole === 'user') {
      return defaultItems.filter(item => 
        !['Customers', 'Reports', 'Add Staff', 'Approval'].includes(item.title)
      )
    }
    if (userRole === 'staff') {
      return defaultItems.filter(item => 
        !['Add Staff', 'Customers', 'Reports', 'Add Staff', 'Approval'].includes(item.title)
      )
    }
    return defaultItems
  }

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 flex items-center gap-2 ">
        <Image src="/ourlogo.jpg" alt="One Elite Automotive" width={40} height={40}  className="rounded-full"/>
        <span className="font-medium">One Elite Automotive</span>
      </div>

     {/* Navigation */}
     <div className="flex-1 p-4">
        <nav className="space-y-2">
          {isLoading ? (
            // Skeleton loading state
            <>
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-2 rounded-lg"
                >
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </>
          ) : (
            // Actual menu items
            getFilteredMenuItems().map((item: MenuItem) => (
              <Link 
                key={item.title}
                href={item.url} 
                className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 ${
                  pathname === item.url ? 'bg-gray-100' : ''
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </Link>
            ))
          )}
        </nav>
      </div>

      {/* Footer with Popover */}
      <div className="p-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">{session?.user?.name || 'User Name'}</p>
                <p className="text-xs text-gray-500">{session?.user?.email || 'user@example.com'}</p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 bg-white border-gray-100" align="start">
            <div className="space-y-2">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
