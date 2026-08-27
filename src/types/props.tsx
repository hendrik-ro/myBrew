import type { BrewResults } from "./results";

export type BreweriesProps = {
  onCountry?: (arg: string) => void;
  results?: BrewResults;
  onRandom?: () => void;
};

export type NavBarProps = {
  onNav: (page: string) => void;
};
