import { Center } from "./use-available-dates";

export type CityInfoResponse = Center | null;

export function useCityInfo(centerId: number) {
  const fetchCityInfo = async (): Promise<CityInfoResponse> => {
    try {
      const response = await fetch(`/api/city-info/${centerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch from backend");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching available dates:", error);
      return null;
    }
  };

  return { fetchCityInfo };
}
