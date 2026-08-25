import type { BreweriesProps } from "../types/breweriesProps";

export default function Main(props: BreweriesProps) {
  const { RandomResults, Random } = props;

  const handleClick = () => {
    Random();
  };

  return (
    <>
      <header style={{ margin: "2rem" }}>
        <h1>My Brew</h1>
        <p>Find your (new) favorite breweries</p>
      </header>
      <section>
        <p>Try it now:</p>
        <button id="brewButton" onClick={handleClick}>
          Random Brewery
        </button>
        {RandomResults ? (
          <div id="brewRandomResult" style={{ marginTop: "1rem" }}>
            <p>{RandomResults.name}</p>
            <p>Type: {RandomResults.brewery_type}</p>
            {RandomResults.address_1 && <p>{RandomResults.address_1}</p>}
            {RandomResults.postal_code && (
              <p>
                {RandomResults.postal_code} {RandomResults.city}
              </p>
            )}
            <p>{RandomResults.country}</p>
            {RandomResults.website_url && (
              <a
                href={RandomResults.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {RandomResults.website_url}
              </a>
            )}
          </div>
        ) : null}
      </section>
      <section style={{ margin: "auto" }}>
        <h2>Database</h2>
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
    </>
  );
}
