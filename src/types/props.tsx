import type { Brewery } from "./brewery";

export type BreweriesProps = {
  RandomResults: Brewery[];
  Random: () => void;
};

export type NavBarProps = {
  onNav: (page: string) => void;
};
