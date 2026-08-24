import type { PageProps } from "../types/pages";
import NavBar from "../ui/navBar";

export default function Main(props: PageProps) {
  return (
    <>
      <NavBar onNav={props.onNav} />
      <header>
        <h1>My Brew</h1>
        <p>Find your (new) favorite breweries</p>
      </header>
      <section>
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
