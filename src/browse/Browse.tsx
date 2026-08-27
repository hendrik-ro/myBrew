import type { BreweriesProps } from "../types/props";
import "./Browse.css";

export default function Browse(props: BreweriesProps) {
  const { CountryResults, onCountry } = props;
  if (CountryResults && onCountry) {
    console.log("countries loaded");
  }
  return (
    <div className="browse-container">
      <header>
        <h1>Breweries</h1>
      </header>
      <BrowseCountry onCountry={onCountry} CountryResults={CountryResults} />
    </div>
  );
}

function BrowseCountry(props: BreweriesProps) {
  const { CountryResults, onCountry } = props;
  if (onCountry && CountryResults) {
    console.log("countries loaded");
  }

  /*
  TODO:
  * Add APIhandlers
  * Pagination
  * Map via api call:
      - datalist
      - tbody
  */

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (
      e.currentTarget.elements.namedItem("country-choice") as HTMLInputElement
    ).value;
    if (input.trim() !== "") onCountry(input);
  };

  return (
    <div className="country">
      <h2>Country</h2>
      <form id="country-search" onSubmit={handleSearch}>
        <input
          type="search"
          list="countries"
          id="country-choice"
          name="country-choice"
          placeholder={"Search for country..."}
        />
        <datalist id="countries">
          <option value="Austria"></option>
          <option value="Belgium"></option>
          <option value="Germany"></option>
          <option value="Sweden"></option>
        </datalist>
        <input type="submit" value="search"></input>
      </form>
      <table className="country-table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Type</td>
            <td>Address</td>
            <td>City</td>
            <td>Website</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test</td>
            <td>micro</td>
            <td>Street</td>
            <td>11111 City</td>
            <td>link</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <button>Prev</button>
            </td>
            <td>
              <button>Next</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
