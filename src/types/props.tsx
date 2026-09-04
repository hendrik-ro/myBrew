import type React from "react";
import type { Metadata } from "./meta";
import type { BrewResults } from "./results";
import type { Brewery } from "./brewery";

export type NavBarProps = {
  onNav: () => void;
};

export type MainProps = {
  results: Brewery;
  onRandom: () => void;
};

export type BrowseProps = {
  results: BrewResults;
  onCountry: (arg0: string, arg1?: number) => void;
  meta: Metadata;
  loading: string;
};

export type BrewFormProps = {
  meta: Metadata;
  onSearch: (e: React.SubmitEvent<HTMLFormElement>) => void;
};
