/*
  TODO: Fetch all pages and merge into one BrewResults in the back end (see below)
*/

import type { Brewery } from "../src/types/brewery";
import type { CountryMeta } from "../src/types/meta";
import type { BrewResults } from "../src/types/results";

export default async function BrewCountry(
  country: string,
  page: number = 1,
  perPage: number = 12,
): Promise<BrewResults | null> {
  console.info(`API: fetching breweries for ${country} - page ${page}`);

  const metaURL = "https://api.openbrewerydb.org/v1/breweries/meta?by_country=";
  const url = "https://api.openbrewerydb.org/v1/breweries?by_country=";
  const perPageQuery = "&per_page=" + perPage;
  const pages = "&page=" + page;

  let results: BrewResults = {
    pages: 0,
    current: page,
    breweries: [],
    timestamp: Date.now(),
    country: country,
  };

  try {
    const response = await fetch(
      metaURL + country.toLowerCase().trim() + perPageQuery,
    );
    if (response.ok) {
      const meta = (await response.json()) as CountryMeta;
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
        results.breweries = [];
      }
      results.breweries = breweries;
    }
  } catch (error) {
    console.error(error);
  }

  return results;
}

/*
export interface Issue {
  id: string;
  title: string;
}

export interface PageResponse {
  ok: boolean;
  status: number;
  statusText: string;
  json(): Promise<unknown>;
}

export type RequestFn = (url: string) => Promise<PageResponse>;

export async function collectIssues(
  startUrl: string,
  request: RequestFn,
): Promise<Issue[]> {
  let result: Issue[] = [];
  try {
    const response = await request(startUrl);
    if (response.ok) {
      const page = await response.json() as {
        items: Issue[],
        next: string | null,
      };
      result.push(...page.items);
      // recursively call request until return empty list
      if (page.next) {
        result.push(... await collectIssues(page.next, request));
      }
    }
  } catch (error) {
    console.error(error);
  }
  return result;
}
*/
