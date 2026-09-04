/*
  TODO: Use non-paginated cache result and split into chunks on front end
*/
import type { BrewResults } from "./results";

export type BrewCache = Record<string, Record<number, BrewResults>>;
