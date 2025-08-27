import { fetchCityInfo } from "@/hooks/use-city-info";

export default async function CityCalendarPage({
  params,
}: {
  params: Promise<{ cityId: string }>;
}) {
  const { cityId } = await params;
  const cityInfo = await fetchCityInfo(parseInt(cityId));

  if (!cityInfo) {
    return <div>City not found</div>;
  }

  return (
    <div>
      <h1>{cityInfo.centerName}</h1>
      <p>{JSON.stringify(cityInfo)}</p>
    </div>
  );
}
