import type { Brewery } from "./brewery";

export type BreweriesProps = {
  onCountry?: () => void;
  CountryResults?: Brewery[];
  onRandom?: () => void;
  RandomResults?: Brewery[];
};

export type NavBarProps = {
  onNav: (page: string) => void;
};
