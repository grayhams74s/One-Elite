"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChevronDown, MoreVertical, Settings, Users } from 'lucide-react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TeamMember {
  email: string
  firstName: string
  lastName: string
  dateJoined: string
  access: "Creator" | "Editor" | "Commenter" | "Viewer"
  avatarUrl?: string
}

export default function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      email: "james@example.com",
      firstName: "James",
      lastName: "Smith",
      dateJoined: "a few seconds ago",
      access: "Creator",
    },
    {
      email: "sarah@example.com",
      firstName: "Sarah",
      lastName: "Johnson",
      dateJoined: "a few seconds ago",
      access: "Editor",
    },
    {
      email: "michael@example.com",
      firstName: "Michael",
      lastName: "Brown",
      dateJoined: "an hour ago",
      access: "Viewer",
    },
    {
      email: "david@example.com",
      firstName: "David",
      lastName: "Wilson",
      dateJoined: "a few seconds ago",
      access: "Commenter",
    },
  ])

  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberAccess, setNewMemberAccess] = useState<TeamMember["access"]>("Viewer")
  const [newMemberFirstName, setNewMemberFirstName] = useState("")
  const [newMemberLastName, setNewMemberLastName] = useState("")
  const [newMemberPassword, setNewMemberPassword] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const getAvatarFallback = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  const handleAccessChange = (memberEmail: string, newAccess: TeamMember["access"]) => {
    setMembers(members.map(member => 
      member.email === memberEmail ? { ...member, access: newAccess } : member
    ))
  }

  const handleAddMember = () => {
    if (newMemberEmail && newMemberFirstName && newMemberLastName && newMemberPassword) {
      setMembers([...members, {
        email: newMemberEmail,
        firstName: newMemberFirstName,
        lastName: newMemberLastName,
        dateJoined: "just now",
        access: newMemberAccess,
      }])
      setNewMemberEmail("")
      setNewMemberFirstName("")
      setNewMemberLastName("")
      setNewMemberPassword("")
      setNewMemberAccess("Viewer")
      setShowAddMemberDialog(false)
    }
  }

  const filteredMembers = members.filter(member =>
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-2xl font-semibold">Add Staff 🥪</h1>
        <div className="flex items-center gap-2 justify-between">
          <Input 
            placeholder="Search member..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px] border-gray-200"
          />
          <Button 
            variant="ghost" 
            className="text-muted-foreground shadow-md"
            onClick={() => setShowAddMemberDialog(true)}
          >
            <Users className="w-4 h-4 mr-2" />
            Add Members
          </Button> 
        </div>
      </div>

      <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                placeholder="First Name"
                value={newMemberFirstName}
                onChange={(e) => setNewMemberFirstName(e.target.value)}
                className="border-gray-200"
              />
            </div>
            <div className="grid gap-2">
              <Input
                placeholder="Last Name"
                value={newMemberLastName}
                onChange={(e) => setNewMemberLastName(e.target.value)}
                className="border-gray-200"
              />
            </div>
            <div className="grid gap-2">
              <Input
                placeholder="Enter email address"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="border-gray-200"
              />
            </div>
            <div className="grid gap-2">
              <Input
                type="password"
                placeholder="Enter password"
                value={newMemberPassword}
                onChange={(e) => setNewMemberPassword(e.target.value)}
                className="border-gray-200"
              />
            </div>
            <div className="grid gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="border-gray-200">
                  <Button variant="outline" className="w-full justify-between">
                    {newMemberAccess}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-white text-black border border-gray-200">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setNewMemberAccess("Creator")}>
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setNewMemberAccess("Editor")}>
                    Owner
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setNewMemberAccess("Commenter")}>
                    Staff
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => setNewMemberAccess("Viewer")}>
                    User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMemberDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember}>
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="border rounded-lg shadow-sm border-gray-50 p-1">
        <Table>
          <TableHeader>
            <TableRow className="border-b hover:bg-transparent border-gray-200">
              <TableHead className="font-medium">Users</TableHead>
              <TableHead className="font-medium">Date Joined</TableHead>
              <TableHead className="font-medium">Access</TableHead>
              <TableHead className="font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.email} className="border-b border-gray-200">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatarUrl} />
                      <AvatarFallback>{getAvatarFallback(member.email)}</AvatarFallback>
                    </Avatar>
                    {member.email}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {member.dateJoined}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 text-xs">
                        {member.access}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white text-black border border-gray-300">
                      <DropdownMenuItem onClick={() => handleAccessChange(member.email, "Creator")}>
                        Creator
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAccessChange(member.email, "Editor")}>
                        Editor
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAccessChange(member.email, "Commenter")}>
                        Commenter
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAccessChange(member.email, "Viewer")}>
                        Viewer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white text-black border border-gray-300">
                      <DropdownMenuItem>❌Revoke Access</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredMembers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                  No members found matching &quot;{searchQuery}&quot;
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

