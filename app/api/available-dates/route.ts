import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://driving-license-exams.fly.dev/api/available-dates",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from backend");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching available dates:", error);
    return NextResponse.json(
      { error: "Failed to fetch available dates" },
      { status: 500 },
    );
  }
}
