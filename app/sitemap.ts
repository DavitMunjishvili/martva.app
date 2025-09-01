import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: this is wrong on many levels.
  // we should get available cities from the database

  // const response = await fetch("http://localhost:3000/api/available-dates");
  // const centers = await response.json();
  // const cityPages = centers.map((center: any) => ({
  //   url: `https://martva.app/city/${center.id}`,
  //   lastModified: new Date(),
  // }));

  return [
    {
      url: "https://martva.app",
      lastModified: new Date(),
    },
    // ...cityPages,
  ];
}
