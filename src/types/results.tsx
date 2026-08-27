import type { Brewery } from "./brewery";

export type BrewResults = {
  pages: number;
  current: number;
  breweries: Brewery[];
  timestamp: number;
  country?: string;
};
