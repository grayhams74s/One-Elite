"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useSession } from "next-auth/react"

export default function SettingsPage() {
  const { data: session } = useSession()

  return (
    <div className="max-w-6xl mx-auto px-20 py-8">
      <div className="grid gap-8 md:grid-cols-[1fr,280px]">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Settings ⚙️</h1>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                defaultValue={session?.user?.name || ""} 
                className="border-0 bg-gray-50" 
              />
              <p className="text-sm text-gray-400">
                This is your public display name. It can be your real name or a pseudonym. You can only
                change this once every 30 days.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                defaultValue={session?.user?.email || ""} 
                className="border-0 shadow-none bg-gray-50" 
              />
              <p className="text-sm text-gray-400">
                You can manage verified email addresses in your email settings.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>

              <p className="text-sm text-gray-400">
                You can @mention other users and organizations to link to them.
              </p>
            </div>

            <div className="space-y-2">
              <Label>URLs</Label>
              <p className="text-sm text-gray-400">
                Add links to your website, blog, or social media profiles.
              </p>
              <div className="space-y-2">
                <Input defaultValue="https://shadcn.com" className="border-0 shadow-none bg-gray-50" />
              </div>
            </div>

            <Button className="border-1 border-gray-300 bg-black text-white hover:text-black transition-all">Update profile</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

