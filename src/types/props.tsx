import type { Brewery } from "./brewery";

export type BreweriesProps = {
  onCountry?: (arg: string) => void;
  CountryResults?: Brewery[];
  onRandom?: () => void;
  RandomResults?: Brewery[];
};

export type NavBarProps = {
  onNav: (page: string) => void;
};
