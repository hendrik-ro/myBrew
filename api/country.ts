import type { Brewery } from "../src/types/brewery";
import type { BrewResults, MetaResults } from "../src/types/results";

export default async function BrewCountry(
  country: string,
  page: number = 1,
  perPage: number = 12,
): Promise<BrewResults | null> {
  const metaURL = "https://api.openbrewerydb.org/v1/breweries/meta?by_country=";
  const url = "https://api.openbrewerydb.org/v1/breweries?by_country=";
  const perPageQuery = "&per_page=" + perPage;
  const pages = "&page=" + page;

  let results: BrewResults = {
    pages: 0,
    current: page,
    breweries: null,
    timestamp: Date.now(),
  };

  try {
    const response = await fetch(
      metaURL + country.toLowerCase().trim() + perPageQuery,
    );
    if (response.ok) {
      const meta = (await response.json()) as MetaResults;
      results.pages = Math.ceil(meta.total / meta.per_page);
    }
  } catch (error) {
    console.error(error);
  }

  if (results.current > results.pages) {
    console.error(new Error("pagination error"));
    return null;
  }

  try {
    const response = await fetch(
      url + country.toLowerCase().trim() + perPageQuery + pages,
    );
    if (response.ok) {
      const breweries = (await response.json()) as Brewery[];
      if (breweries.length === 0) {
        results.breweries = null;
      }
      results.breweries = breweries;
    }
  } catch (error) {
    console.error(error);
  }

  return results;
}
