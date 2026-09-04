import type { Brewery } from "../src/types/brewery";

export default async function BrewRandom(): Promise<Brewery | null> {
  console.info("API: fetching random brewery");
  const url = "https://api.openbrewerydb.org/v1/breweries/random";

  try {
    const response = await fetch(url);
    if (response.ok) {
      const brewery = await response.json();
      return brewery[0] as Brewery;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}
