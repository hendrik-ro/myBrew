import type { BrewResults } from "./results";

export type BreweriesProps = {
  onCountry?: (arg0: string, arg1?: number) => void;
  results?: BrewResults;
  onRandom?: () => void;
};

export type NavBarProps = {
  onNav: (page: string) => void;
};
