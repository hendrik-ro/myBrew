export default function Main() {
  return (
    <>
      <header style={{ margin: "2rem" }}>
        <h1>My Brew</h1>
        <p>Find your (new) favorite breweries</p>
      </header>
      <section>
        <button id="brewButton">Search</button>
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
