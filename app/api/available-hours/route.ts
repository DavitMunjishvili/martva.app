import { ENV } from "@/lib/config";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, city } = body;

    if (!date || !city) {
      return NextResponse.json(
        { error: "Date and city are required" },
        { status: 400 },
      );
    }

    const formattedDate = (date as string).split("-").reverse().join("-");

    const response = await fetch(
      `${ENV.API_URL}/api/available-hours?centerId=${city}&examDate=${formattedDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      console.log(await response.json());
      throw new Error("Failed to fetch from backend");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching available hours:", error);
    return NextResponse.json(
      { error: "Failed to fetch available hours" },
      { status: 500 },
    );
  }
}
