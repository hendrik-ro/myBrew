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
      <BrowseCountry />
    </div>
  );
}

function BrowseCountry(props: BreweriesProps) {
  const { CountryResults, onCountry } = props;
  if (onCountry && CountryResults) {
    console.log("countries loeaded");
  }

  /*
  TODO:
  * Add APIhandlers
  * Pagination
  * Map via api call:
      - datalist
      - tbody
  */

  return (
    <div className="country">
      <form id="country-search">
        <input
          type="search"
          list="countries"
          id="country-choice"
          name="country-choice"
          defaultValue={"Search for country..."}
        />
        <datalist id="countries">
          <option value="Sweden"></option>
        </datalist>
      </form>
      <table className="country-table">
        <thead>
          <th>Name</th>
          <th>Type</th>
          <th>Address</th>
          <th>City</th>
          <th>Website</th>
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
