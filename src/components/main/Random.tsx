import type { MainProps } from "../../types/props";
import "./Main.css";

export default function Random(props: MainProps) {
  const { results, onRandom } = props;

  const handleClick = () => {
    if (onRandom) {
      onRandom();
    } else {
      console.error(new Error("Failed to fetch property 'onRandom'"));
    }
  };

  return (
    <div className="random">
      <p style={{ marginBottom: "0.5rem" }}>Try it now:</p>
      <button id="brewButton" onClick={handleClick}>
        Random Brewery
      </button>
      {results && results.name ? (
        <div className="brew-random" style={{ marginTop: "1rem" }}>
          <p>{results.name}</p>
          <p>Type: {results.brewery_type}</p>
          {results.address_1 && <p>{results.address_1}</p>}
          {results.postal_code && (
            <p>
              {results.postal_code} {results.city}
            </p>
          )}
          <p>{results.country}</p>
          {results.website_url && (
            <a
              href={results.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {results.website_url}
            </a>
          )}
        </div>
      ) : null}
    </div>
  );
}
