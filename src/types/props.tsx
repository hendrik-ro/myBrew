import type React from "react";
import type { Metadata } from "./meta";
import type { BrewResults } from "./results";

export type BreweriesProps = {
  meta?: Metadata;
  loading?: boolean;
  results?: BrewResults;
  onCountry?: (arg0: string, arg1?: number) => void;
  onRandom?: () => void;
  onSearch?: (e: React.SubmitEvent<HTMLFormElement>) => void;
};

export type NavBarProps = {
  onNav: (page: string) => void;
};
