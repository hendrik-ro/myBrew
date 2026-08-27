import type { Brewery } from "./brewery";

export type BrewResults = {
  pages: number;
  current: number;
  breweries: Brewery[];
};

export type MetaResults = {
  total: number;
  page: number;
  per_page: number;
};
