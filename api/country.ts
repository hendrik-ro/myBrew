import type { Brewery } from "../src/types/brewery";

export default async function BrewCountry(
  country: string,
): Promise<Brewery[] | null> {
  // "https://api.openbrewerydb.org/v1/breweries?by_country=south%20korea&per_page=3"
  const url = "https://api.openbrewerydb.org/v1/breweries?by_country=";
  const queryParams = "&per_page=12";

  try {
    const response = await fetch(
      url + country.toLowerCase().trim() + queryParams,
    );
    if (response.ok) {
      const breweries = await response.json();
      return breweries as Brewery[];
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}
