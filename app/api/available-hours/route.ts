import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, city } = body

    if (!date || !city) {
      return NextResponse.json({ error: "Date and city are required" }, { status: 400 })
    }

    // Replace 'localhost:8080' with your actual Go backend URL
    const response = await fetch("http://localhost:8080/api/available-hours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, city }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch from backend")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching available hours:", error)
    return NextResponse.json({ error: "Failed to fetch available hours" }, { status: 500 })
  }
}
