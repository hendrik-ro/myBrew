import type React from "react";
import type { Metadata } from "./meta";
import type { BrewResults } from "./results";

export type BreweriesProps = {
  meta?: Metadata;
  loading?: boolean;
  results?: BrewResults | null;
  onCountry?: (arg0: string, arg1?: number) => void;
  onRandom?: () => void;
  onSearch?: (e: React.SubmitEvent<HTMLFormElement>) => void;
};

export type NavBarProps = {
  onNav: (page: string) => void;
};

export type MainProps = {
  results: BrewResults | null;
  onRandom: () => void;
};

export type BrowseProps = {
  results: BrewResults | null;
  onCountry: (arg0: string, arg1?: number) => void;
  meta: Metadata;
  loading: boolean;
};

export type BrewFormProps = {
  meta: Metadata;
  onSearch: (e: React.SubmitEvent<HTMLFormElement>) => void;
};
