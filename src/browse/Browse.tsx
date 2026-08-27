import type { BreweriesProps } from "../types/props";
import "./Browse.css";

export default function Browse(props: BreweriesProps) {
  const { results, onCountry } = props;
  return (
    <div className="browse-container">
      <header>
        <h1>Breweries</h1>
      </header>
      <BrowseCountry onCountry={onCountry} results={results} />
    </div>
  );
}

function BrowseCountry(props: BreweriesProps) {
  const { results, onCountry } = props;

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

  const handleClick = (search: string, page: number) => {
    onCountry(search, page);
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
          <option value="France"></option>
          <option value="Germany"></option>
          <option value="Sweden"></option>
        </datalist>
        <input type="submit" value="search"></input>
      </form>
      {results ? (
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
            {results.breweries.map((c) => {
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
                        Link
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          {results.pages > 1 ? (
            <tfoot>
              <tr>
                <td colSpan={6}>
                  {results.current > 1 ? (
                    <button
                      onClick={() =>
                        handleClick(results.country, results.current - 1)
                      }
                    >
                      Prev
                    </button>
                  ) : null}
                  {results.pages > results.current ? (
                    <button
                      onClick={() =>
                        handleClick(results.country, results.current + 1)
                      }
                    >
                      Next
                    </button>
                  ) : null}
                </td>
              </tr>
            </tfoot>
          ) : null}
        </table>
      ) : null}
    </div>
  );
}
