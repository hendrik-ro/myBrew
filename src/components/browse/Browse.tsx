import type { BrowseProps } from "../types/props";
import "./Browse.css";
import BrowseCountry from "./Country";

export default function Browse(props: BrowseProps) {
  const { results, onCountry, meta, loading } = props;

  return (
    <div className="browse-container">
      <header>
        <h1>Breweries</h1>
      </header>
      <BrowseCountry
        onCountry={onCountry}
        results={results}
        meta={meta}
        loading={loading}
      />
    </div>
  );
}
