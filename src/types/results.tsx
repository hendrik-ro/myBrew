import type { Brewery } from "./brewery";

export type BrewResults = {
  pages: number;
  current: number;
  breweries: Brewery[];
  timestamp: number;
  country?: string;
};

export type MetaResults = {
  total: number;
  page: number;
  per_page: number;
};
