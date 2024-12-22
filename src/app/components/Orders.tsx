/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MoreHorizontal, Eye, Pencil, Trash2, Check, Download, BanknoteIcon, Car, NotebookPen, CheckCircle2, CircleX } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import Link from 'next/link'
import toast from 'react-hot-toast'
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";

interface Booking {
  id: number
  serviceDate: string
  status: string
  serviceType: string
  amount: number
  user: {
    name: string
    email: string
  }
  referenceNo: string | null
  gcashNumber: string | null
  screenshot: string
  notes: string | null
  createdAt: string
  updatedAt: string
  userId: number
  vehicleSize: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: string
  plateNumber: string
  vehicleColor: string
}

interface Session {
  user: {
    role: string;
  };
}

interface OrdersTableProps {
  bookings: Booking[]
  isLoading: boolean
  onStatusUpdate?: (bookingId: number, status: string) => Promise<void>
}

export default function OrdersTable({ bookings, isLoading, onStatusUpdate }: OrdersTableProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showRefundDialog, setShowRefundDialog] = useState(false)
  const [refundImage, setRefundImage] = useState("")
  const { data: session } = useSession()  // Add this line
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showCarDialog, setShowCarDialog] = useState(false)

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toString().includes(searchQuery.trim())
    const matchesStatus = statusFilter === "all" ? true : booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = async (bookingId: number) => {
    await handleStatusUpdate(bookingId, 'approved');
  };

  const handleStatusUpdate = async (bookingId: number, status: string) => {
    if (session?.user?.role !== 'admin' && session?.user?.role !== 'owner') {
      toast.error('Only administrators and owners can update booking status');
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    return toast.promise(
      (async () => {
        const endpoint = status === 'rejected' 
          ? `/api/approval/reject/${bookingId}`
          : `/api/approval/confirm/${bookingId}`;

        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) {
          throw new Error('Failed to update booking status');
        }

        const booking = await response.json();

        // Send email notification
        await fetch(`${baseUrl}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookingId: booking.id,
            serviceType: booking.serviceType,
            serviceDate: booking.serviceDate,
            amount: booking.amount,
            status: status,
            reason: status === 'rejected' ? 'Schedule conflict' : undefined,
          }),
        });

        await onStatusUpdate?.(bookingId, status);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })(),
      {
        loading: 'Updating booking status...',
        success: `Booking ${status} and notification sent!`,
        error: (err) => `Error: ${err.message}`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 5000,
        },
      }
    );
  };  const handleDelete = async (bookingId: number) => {
    if (session?.user?.role !== 'admin' && session?.user?.role !== 'owner') {
      toast.error('Only administrators and owners can delete bookings');
      return;
    }

    return toast.promise(
      (async () => {
        const response = await fetch(`/api/bookings/${bookingId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete booking');
        }

        await onStatusUpdate?.(bookingId, 'deleted');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })(),
      {
        loading: 'Deleting booking...',
        success: 'Booking deleted successfully!',
        error: (err) => `Error: ${err.message}`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 5000,
        },
      }
    );
  };


  // Add this function to handle rejections
  const handleReject = async (bookingId: number) => {
    await handleStatusUpdate(bookingId, 'rejected');
  };


  if (isLoading) {
    return (
      <Card className="border-gray-100 lg:w-[1200px] w-[400px] p-3 shadow-none">
        <CardHeader>
          <CardTitle className="mb-3">Bookings</CardTitle>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-10 w-[300px] bg-gray-100 animate-pulse rounded" />
            <div className="h-10 w-[150px] bg-gray-100 animate-pulse rounded" />
            <div className="h-10 w-[150px] bg-gray-100 animate-pulse rounded" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md lg:w-[1100px] w-[300px] mb-36">
            <Table>
              <TableHeader>
                <TableRow className="border-b hover:bg-transparent border-b-gray-100">
                  <TableHead className="w-[50px]">
                    <div className="h-4 w-4 bg-gray-100 animate-pulse rounded" />
                  </TableHead>
                  <TableHead className="font-medium">
                    <div className="h-4 w-20 bg-gray-100 animate-pulse rounded" />
                  </TableHead>
                  <TableHead className="font-medium">
                    <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
                  </TableHead>
                  <TableHead className="font-medium">
                    <div className="h-4 w-16 bg-gray-100 animate-pulse rounded" />
                  </TableHead>
                  <TableHead className="font-medium">
                    <div className="h-4 w-20 bg-gray-100 animate-pulse rounded" />
                  </TableHead>
                  <TableHead className="font-medium">
                    <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
                  </TableHead>
                  <TableHead className="font-medium">
                    <div className="h-4 w-16 bg-gray-100 animate-pulse rounded" />
                  </TableHead>
                  <TableHead className="font-medium">
                    <div className="h-4 w-16 bg-gray-100 animate-pulse rounded" />
                  </TableHead>
                  <TableHead className="font-medium"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 border-b-gray-100">
                    <TableCell>
                      <div className="h-4 w-4 bg-gray-100 animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-16 bg-gray-100 animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-32 bg-gray-100 animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-20 bg-gray-100 animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-32 bg-gray-100 animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-32 bg-gray-100 animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-16 bg-gray-100 animate-pulse rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-6 w-20 bg-gray-100 animate-pulse rounded-full" />
                    </TableCell>
                    <TableCell>
                      <div className="h-8 w-8 bg-gray-100 animate-pulse rounded" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    )
  }

  const PaymentDialog = () => (
    <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-xs">Reference Number</Label>
            <div className="p-2 bg-secondary rounded text-sm">
              {selectedBooking?.referenceNo || 'N/A'}
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="text-xs">GCash Number</Label>
            <div className="p-2 bg-secondary rounded text-sm">
              {selectedBooking?.gcashNumber || 'N/A'}
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="text-xs">Amount</Label>
            <div className="p-2 bg-secondary rounded text-sm">
              ₱{selectedBooking?.amount}
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="text-xs">Payment Screenshot</Label>
            <div className="relative h-[300px] w-full bg-secondary rounded-lg overflow-hidden group">
              <Image
                src={selectedBooking?.screenshot || ''}
                alt="Payment Screenshot"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <a href={selectedBooking?.screenshot || ''} download target="_blank" rel="noopener noreferrer" className="flex items-center justify-center border-gray-100">
             <Button className="bg-white hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">Download        <Download className="h-4 w-4 text-gray-600 hover:text-gray-400" /></Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )

  const EditDialog = () => (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => {
          e.preventDefault()
          // Handle edit submission here
        }}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Input
                id="serviceType"
                defaultValue={selectedBooking?.serviceType}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="serviceDate">Service Date</Label>
              <Input
                id="serviceDate"
                type="datetime-local"
                defaultValue={selectedBooking?.serviceDate}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={selectedBooking?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="pending">Approved</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="completed">Rejected</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                defaultValue={selectedBooking?.amount}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )

  const RefundDialog = () => (
    <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Upload Refund Receipt</DialogTitle>
        </DialogHeader>
        {refundImage && (
            <div className="relative h-[200px] w-full bg-secondary rounded-lg overflow-hidden">
              <Image
                src={refundImage}
                alt="Refund Screenshot"
                fill
                className="object-contain"
              />
            </div>
          )}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-xs">Upload Screenshot</Label>
            <UploadDropzone<OurFileRouter, "imageUploader">
              appearance={{
                container: {},
                uploadIcon: { color: "black" },
                label: { color: "black" },
                button: {
                  color: "white",
                  background: "black",
                  cursor: "pointer",
                },
              }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  setRefundImage(res[0].url);
                  toast.success("Upload completed")
                }
              }}
              onUploadError={(error: Error) => {
                toast.error(`Error: ${error.message}`)
              }}
            />
          </div>
        
        </div>
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            className="border-none shadow-lg hover:bg-gray-100 transition-all duration-300"
            onClick={() => setShowRefundDialog(false)}
          >
            Cancel
          </Button>
          <Button 
          className="bg-white text-black hover:bg-gray-100 transition-all duration-300"
            type="button"
            disabled={!refundImage}
            onClick={async () => {
              if (selectedBooking) {
                await handleStatusUpdate(selectedBooking.id, 'refunded')
                await fetch(`/api/bookings/${selectedBooking.id}/refund`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ refundImage }),
                })
                setShowRefundDialog(false)
                setRefundImage("")
              }
            }}
          >
            Confirm Refund
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const CarDetailsDialog = () => (
    <Dialog open={showCarDialog} onOpenChange={setShowCarDialog}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Vehicle Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-xs">Vehicle Size</Label>
            <div className="p-2 bg-secondary rounded text-sm">
              {selectedBooking?.vehicleSize || 'N/A'}
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="text-xs">Make & Model</Label>
            <div className="p-2 bg-secondary rounded text-sm">
              {selectedBooking?.vehicleMake} {selectedBooking?.vehicleModel || 'N/A'}
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="text-xs">Year</Label>
            <div className="p-2 bg-secondary rounded text-sm">
              {selectedBooking?.vehicleYear || 'N/A'}
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="text-xs">Plate Number</Label>
            <div className="p-2 bg-secondary rounded text-sm">
              {selectedBooking?.plateNumber || 'N/A'}
            </div>
          </div>
          <div className="grid gap-2">
            <Label className="text-xs">Color</Label>
            <div className="p-2 bg-secondary rounded text-sm">
              {selectedBooking?.vehicleColor || 'N/A'}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <Card className="border-gray-100 lg:w-[1200px] w-[400px] p-3 shadow-none">
      <CardHeader>
        <CardTitle className="mb-3">Bookings</CardTitle>
        <div className="flex items-center gap-4 mt-4">
          <Input 
            placeholder="Search booking ID..." 
            className="max-w-[300px] border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[150px] border-gray-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black border-none">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[150px] border-gray-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black border-none">
              <SelectItem value="all">All Categories</SelectItem>
              {/* Add your categories here */}
            </SelectContent>
          </Select>
          {session?.user?.role === 'user' && (
            <Link href="/bookings" className="ml-auto">
              <Button className="bg-black text-white hover:bg-black/50 transition-all duration-300">
                Book Now
                <NotebookPen />
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md lg:w-[1100px] w-[300px] mb-36">
          <Table>
            <TableHeader>
              <TableRow className="border-b hover:bg-transparent border-b-gray-100">
                <TableHead className="w-[50px]">
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableHead>
                <TableHead className="font-medium">Booking #</TableHead>
                <TableHead className="font-medium">Price</TableHead>
                <TableHead className="font-medium">Customer</TableHead>
                <TableHead className="font-medium">Booking Date</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50 border-b-gray-100">
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-100" />
                  </TableCell>
                  <TableCell>#{booking.id}</TableCell>
                  <TableCell>
                    ₱{booking.amount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{booking.user.name}</div>
                      <div className="text-sm text-gray-500">{booking.user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(booking.serviceDate).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        booking.status === 'pending' ? 'yellow' :
                        booking.status === 'approved' ? 'green' :
                        booking.status === 'completed' ? 'red' :
                        'red'
                      }
                      className={`rounded-full px-3 py-1.5 text-xs font-normal flex items-center justify-center gap-2 w-24 ${
                        booking.status === 'pending' ? 'bg-yellow-50' :
                        booking.status === 'approved' ? 'bg-green-50' :
                        booking.status === 'rejected' ? 'bg-red-50' :
                        booking.status === 'cancelled' ? 'bg-red-50' :
                        booking.status === 'refunded' ? 'bg-blue-50' :
                        booking.status === 'completed' ? 'bg-gray-100' : ''
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${
                        booking.status === 'pending' ? 'bg-yellow-500' :
                        booking.status === 'approved' ? 'bg-green-500' :
                        booking.status === 'completed' ? 'bg-gray-500' :
                        booking.status === 'rejected' ? 'bg-red-500' :
                        booking.status === 'cancelled' ? 'bg-red-500' :
                        booking.status === 'refunded' ? 'bg-blue-500' :
                        'bg-gray-500'
                      }`} />
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white text-black border-gray-100">
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedBooking(booking)
                            setShowPaymentDialog(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Payment
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedBooking(booking)
                            setShowCarDialog(true)
                          }}
                        >
                          <Car className="mr-2 h-4 w-4" />
                          View Vehicle
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleApprove(booking.id)}>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleReject(booking.id)}
                        >
                          <CircleX className="mr-2 h-4 w-4" />
                          Decline
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="cursor-pointer text-red-600"
                          onClick={() => handleDelete(booking.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>

                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                    No bookings found
                    {searchQuery && ` matching ID: ${searchQuery}`}
                    {statusFilter && ` with status: ${statusFilter}`}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <EditDialog />
      <PaymentDialog />
      <RefundDialog />
      <CarDetailsDialog />
    </Card>
  )
}

