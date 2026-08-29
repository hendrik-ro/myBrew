import type { BrewFormProps, BrowseProps } from "../types/props";
import "./Browse.css";

export default function Browse(props: BrowseProps) {
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

function BrowseCountry(props: BrowseProps) {
  const { results, onCountry, meta, loading } = props;

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
      {meta ? (
        <BrewForm meta={meta} onSearch={handleSearch} />
      ) : (
        <p>Error: API failed to fetch meta data</p>
      )}
      {results.breweries.length > 0 && !loading ? (
        <BrewTable
          onCountry={onCountry}
          results={results}
          meta={meta}
          loading={loading}
        />
      ) : (
        loading && <p>Loading breweries...</p>
      )}
    </div>
  );
}

function BrewForm(props: BrewFormProps) {
  const { meta, onSearch } = props;

  return (
    <form id="country-search" onSubmit={onSearch}>
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
  );
}

function BrewTable(props: BrowseProps) {
  const { results, onCountry, meta, loading } = props;

  return (
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
      {results.pages > 1 && (
        <tfoot>
          <tr>
            <td colSpan={6}>
              <Pagination
                onCountry={onCountry}
                results={results}
                meta={meta}
                loading={loading}
              />
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}

function Pagination(props: BrowseProps) {
  const { onCountry, results } = props;

  const pages: Record<number, boolean> = {};
  for (let i = 1; i <= results.pages; i++) {
    pages[i] = i === results.current;
  }

  const handleClick = (search: string, page: number) => {
    onCountry(search, page);
  };

  const renderPageButton = (pageNum: number) => {
    const isCurrent = pageNum === results.current;
    return (
      <button
        className="num-button"
        key={pageNum}
        disabled={isCurrent}
        onClick={() => handleClick(results.country, pageNum)}
        style={{
          fontWeight: isCurrent ? "bold" : "normal",
          margin: "0 0.2rem",
        }}
      >
        {pageNum}
      </button>
    );
  };

  const renderEllipsis = (key: string) => (
    <span key={key} style={{ margin: "0 0.2rem" }}>
      ...
    </span>
  );

  const getVisiblePages = () => {
    const visiblePages: number[] = [];
    const { current, pages } = results;

    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || Math.abs(i - current) <= 3) {
        const lastItem = visiblePages[visiblePages.length - 1];
        if (visiblePages.length > 0 && lastItem !== -1 && i - lastItem > 1) {
          visiblePages.push(-1);
        }
        visiblePages.push(i);
      }
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <span className="pagination">
      <button
        disabled={results.current <= 1}
        onClick={() => handleClick(results.country, results.current - 1)}
        style={{ margin: "0 0.2rem" }}
      >
        Prev
      </button>

      {visiblePages.map((item, index) =>
        item === -1
          ? renderEllipsis(`ellipsis-${index}`)
          : renderPageButton(item),
      )}

      <button
        disabled={results.current === results.pages}
        onClick={() => handleClick(results.country, results.current + 1)}
        style={{ margin: "0 0.2rem" }}
      >
        Next
      </button>
    </span>
  );
}
