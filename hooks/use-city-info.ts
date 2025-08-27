import { ENV } from "@/lib/config";
import { Center } from "./use-available-dates";

export type CityInfoResponse = Center | null;

export const fetchCityInfo = async (
  centerId: number,
): Promise<CityInfoResponse> => {
  try {
    const response = await fetch(
      `${ENV.API_URL}/api/city-info?centerId=${centerId}`,
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
    return data;
  } catch (error) {
    console.error("Error fetching available dates:", error);
    return null;
  }
};
