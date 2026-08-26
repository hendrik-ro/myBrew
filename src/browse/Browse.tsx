import type { BreweriesProps } from "../types/props";
import "./Browse.css";

export default function Browse(props: BreweriesProps) {
  const { CountryResults, Country } = props;
  if (CountryResults && Country) {
    console.log("countries loaded");
  }
  return (
    <div className="browse-container">
      <header>
        <h1>Breweries</h1>
      </header>
    </div>
  );
}
