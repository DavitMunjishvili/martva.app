import { ENV } from "@/lib/config";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const response = await fetch(
      `${ENV.API_URL}/api/city-info?centerId=${id}`,
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
    console.error("Error fetching available dates:", error);
    return NextResponse.json(
      { error: "Failed to fetch available dates" },
      { status: 500 },
    );
  }
}
