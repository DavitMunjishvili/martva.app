export interface AvailableHoursResponse {
  timeFrameId: number;
  timeFrameName: string;
}

export function useAvailableHours() {
  const fetchAvailableHours = async (
    centerId: number,
    date: string,
  ): Promise<AvailableHoursResponse[]> => {
    const response = await fetch("/api/available-hours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, city: centerId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch available hours");
    }

    const data: AvailableHoursResponse[] = await response.json();
    return data || [];
  };

  return {
    fetchAvailableHours,
  };
}
