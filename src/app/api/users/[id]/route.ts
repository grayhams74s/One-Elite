import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    console.log("Received ID:", id)

    // Let's first check what users exist in the database
    const allUsers = await prismadb.user.findMany({
      select: {
        id: true,
        email: true,
        role: true
      }
    })
    console.log("All users in DB:", allUsers)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      )
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: `User not found with ID: ${id}` },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}