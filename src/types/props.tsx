import type { Brewery } from "./brewery";

export type BreweriesProps = {
  Country?: () => void;
  CountryResults?: Brewery[];
  Random?: () => void;
  RandomResults?: Brewery[];
};

export type NavBarProps = {
  onNav: (page: string) => void;
};
