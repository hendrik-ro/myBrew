/*
  TODO: Scratch pages + current and fetch all breweries in back end
*/

import type { Brewery } from "./brewery";

export type BrewResults = {
  pages: number;
  current: number;
  breweries: Brewery[];
  timestamp: number;
  country?: string;
};
