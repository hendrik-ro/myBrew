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
  * Pagination
  * Map via api call:
      - datalist
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
      {CountryResults ? (
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
            {CountryResults.map((c) => {
              return (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.brewery_type}</td>
                  <td>{c.address_1}</td>
                  <td>
                    {c.postal_code} {c.city}
                  </td>
                  <td>
                    {c.website_url ? (
                      <a
                        href={c.website_url}
                        target="_blank"
                        rel="noopener norefferer"
                      >
                        {c.website_url}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
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
      ) : null}
    </div>
  );
}
