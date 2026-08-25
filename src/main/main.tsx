import type { BreweriesProps } from "../types/props";

export default function Main(props: BreweriesProps) {
  return (
    <>
      <header style={{ margin: "2rem" }}>
        <h1>My Brew</h1>
        <p>Find your (new) favorite breweries</p>
      </header>
      <Random RandomResults={props.RandomResults} Random={props.Random} />
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

function Random(props: BreweriesProps) {
  const { RandomResults, Random } = props;

  const handleClick = () => {
    Random();
  };

  return (
    <div>
      <p>Try it now:</p>
      <button id="brewButton" onClick={handleClick}>
        Random Brewery
      </button>
      {RandomResults && RandomResults.length > 0 ? (
        <div id="brewRandomResult" style={{ marginTop: "1rem" }}>
          <p>{RandomResults[0].name}</p>
          <p>Type: {RandomResults[0].brewery_type}</p>
          {RandomResults[0].address_1 && <p>{RandomResults[0].address_1}</p>}
          {RandomResults[0].postal_code && (
            <p>
              {RandomResults[0].postal_code} {RandomResults[0].city}
            </p>
          )}
          <p>{RandomResults[0].country}</p>
          {RandomResults[0].website_url && (
            <a
              href={RandomResults[0].website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {RandomResults[0].website_url}
            </a>
          )}
        </div>
      ) : null}
    </div>
  );
}
