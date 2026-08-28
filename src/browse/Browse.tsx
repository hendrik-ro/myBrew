import type { BreweriesProps } from "../types/props";
import "./Browse.css";

export default function Browse(props: BreweriesProps) {
  const { results, onCountry, meta, loading } = props;
  return (
    <div className="browse-container">
      <header>
        <h1>Breweries</h1>
      </header>
      <BrowseCountry
        onCountry={onCountry}
        results={results}
        meta={meta}
        loading={loading}
      />
    </div>
  );
}

function BrowseCountry(props: BreweriesProps) {
  const { results, onCountry, meta, loading } = props;

  /*
  TODO:
  * Pagination
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
      {meta ? (
        <form id="country-search" onSubmit={handleSearch}>
          <input
            type="search"
            list="countries"
            id="country-choice"
            name="country-choice"
            placeholder={"Search for country..."}
          />
          <datalist id="countries">
            {Object.keys(meta.by_country).map((country) => (
              <option key={country} value={country}></option>
            ))}
          </datalist>
          <input type="submit" value="search"></input>
        </form>
      ) : (
        <p>Error: API failed to fetch meta data</p>
      )}
      {results && !loading ? (
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
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    {results.current > 1 ? (
                      <button
                        onClick={() =>
                          handleClick(results.country, results.current - 1)
                        }
                      >
                        Prev
                      </button>
                    ) : null}
                    {results.current > 1 && results.current < results.pages ? (
                      <p>1, 2, 3, 4</p>
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
                  </span>
                </td>
              </tr>
            </tfoot>
          ) : null}
        </table>
      ) : loading ? (
        <p>Loading breweries...</p>
      ) : null}
    </div>
  );
}
