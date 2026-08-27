import type { BreweriesProps } from "../types/props";
import "./Main.css";

export default function Main(props: BreweriesProps) {
  return (
    <div className="main-container">
      <header>
        <h1>My Brew</h1>
        <p>Find your (new) favorite breweries</p>
        <img
          style={{ marginTop: "2rem" }}
          alt="beer glass"
          src="../favicon/favicon.ico"
        />
      </header>
      <Random results={props.results} onRandom={props.onRandom} />
      <section>
        <p>
          This webpage is powered by{" "}
          <a
            href="https://www.openbrewerydb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Brewery DB
          </a>
        </p>
      </section>
    </div>
  );
}

function Random(props: BreweriesProps) {
  const { results, onRandom } = props;

  const handleClick = () => {
    onRandom();
  };

  return (
    <div className="random">
      <p style={{ marginBottom: "0.5rem" }}>Try it now:</p>
      <button id="brewButton" onClick={handleClick}>
        Random Brewery
      </button>
      {results && results.breweries.length > 0 ? (
        <div className="brew-random" style={{ marginTop: "1rem" }}>
          <p>{results.breweries[0].name}</p>
          <p>Type: {results.breweries[0].brewery_type}</p>
          {results.breweries[0].address_1 && (
            <p>{results.breweries[0].address_1}</p>
          )}
          {results.breweries[0].postal_code && (
            <p>
              {results.breweries[0].postal_code} {results.breweries[0].city}
            </p>
          )}
          <p>{results.breweries[0].country}</p>
          {results.breweries[0].website_url && (
            <a
              href={results.breweries[0].website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {results.breweries[0].website_url}
            </a>
          )}
        </div>
      ) : null}
    </div>
  );
}
