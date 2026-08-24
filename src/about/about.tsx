import styles from "./about.module.css";

export default function About() {
  return (
    <>
      <header style={{ margin: "2rem" }}>
        <h1>About</h1>
      </header>
      <div className={styles.container}>
        <p style={{ marginBottom: "3rem" }}>
          This page is an open-source project on an GNU Affero General Public
          License. Contributions are welcome on{" "}
          <span className="highlight" style={{ fontStyle: "italic" }}>
            My Brew
          </span>
          's{" "}
          <span>
            <a
              href="https://github.com/hendrik-ro/myBrew"
              target="_blank"
              rel="noopener norefferer"
            >
              GitHub Page
            </a>
          </span>{" "}
          where you can submit a pull request.
        </p>
        <h2>API</h2>
        <p>
          All data is pulled from{" "}
          <span>
            <a
              href="https://www.openbrewerydb.org/"
              target="_blank"
              rel="noopener norefferer"
            >
              Open Brewery DB
            </a>
          </span>
        </p>
      </div>
    </>
  );
}
