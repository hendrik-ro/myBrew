import type { Brewery } from "../src/types/brewery";

export default async function BrewCountry(
  country: string,
  page: number = 1,
): Promise<Brewery[] | null> {
  // "https://api.openbrewerydb.org/v1/breweries?by_country=south%20korea&per_page=3"
  const url = "https://api.openbrewerydb.org/v1/breweries?by_country=";
  const perPage = "&per_page=12";
  const pages = "&page=" + page;

  try {
    const response = await fetch(
      url + country.toLowerCase().trim() + perPage + pages,
    );
    if (response.ok) {
      const breweries = (await response.json()) as Brewery[];
      if (breweries.length === 0) return null;
      return breweries;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}
