import type { MainProps } from "../../types/props";
import "./Main.css";
import Random from "./Random";

export default function Main(props: MainProps) {
  const { results, onRandom } = props;

  return (
    <div className="main-container">
      <header>
        <h1>My Brew</h1>
        <p>Find your (new) favorite breweries</p>
        <img
          style={{ marginTop: "2rem" }}
          alt="beer glass"
          src="../favicon.ico"
        />
      </header>
      <Random results={results} onRandom={onRandom} />
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
