import type { Metadata } from "./meta";
import type { BrewResults } from "./results";

export type BreweriesProps = {
  meta?: Metadata;
  results?: BrewResults;
  onCountry?: (arg0: string, arg1?: number) => void;
  onRandom?: () => void;
};

export type NavBarProps = {
  onNav: (page: string) => void;
};
