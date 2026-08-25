import type { BreweriesProps } from "../types/breweriesProps";

export default function Main(props: BreweriesProps) {
  const { ApiResults, Random } = props;

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
        {ApiResults && ApiResults.length > 0 ? (
          <div id="brewRandomResult">
            <p>{ApiResults[0].name}</p>
            <p>{ApiResults[0].address_1}</p>
            <p>
              {ApiResults[0].postal_code} {ApiResults[0].city}
            </p>
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
