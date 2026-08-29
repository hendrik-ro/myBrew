/*
DEV
  API calls might be deactivated!
*/

import { useEffect, useState } from "react";
import "./App.css";
import Main from "./main/Main.tsx";
import About from "./about/About.tsx";
import Footer from "./ui/footer";
import NavBar from "./ui/navBar";
import Browse from "./browse/Browse.tsx";
import BrewMeta from "../api/metadata.ts";
// import BrewRandom from "../api/random.ts";
import BrewCountry from "../api/country.ts";
import type { Brewery } from "./types/brewery";
import type { Ratelimiter } from "./types/ratelimiter.tsx";
import type { BrewResults } from "./types/results.tsx";
import type { Metadata } from "./types/meta.tsx";

const MAX_REQS = 7;
const TIME_FRAME = 60_000;
const CACHE_TIMER = 900_000_000;

const DEV_RESULTS = [
  {
    name: "Test Brewery",
    brewery_type: "micro",
    address_1: "Some street 23",
    city: "City of God",
    country: "Beerhalla",
    postal_code: "666",
    website_url: "none",
  },
  {
    name: "Another Brewery",
    brewery_type: "nano",
    address_1: "Other street 42",
    city: "City of Beer",
    country: "Beerhalla",
    postal_code: "333",
  },
] as Brewery[];

function App() {
  // Navigation
  const [page, setPage] = useState("main");
  const pages: string[] = ["main", "browse", "about"];

  const handleNav = (page: string) => {
    if (!pages.includes(page)) return;
    setPage(page);
    setBreweries({
      pages: 0,
      current: 0,
      breweries: [],
      timestamp: 0,
      country: "",
    } as BrewResults); // Reset breweries
  };

  // Soft rate limiter
  const [now, setNow] = useState(() => Date.now());
  const [ratelimit, setRatelimit] = useState<Ratelimiter>({
    reqs: 0,
    start: now,
  });

  const rateLimiter = (): boolean => {
    if (ratelimit === null) return false;
    setNow(() => Date.now());
    if (ratelimit.start + TIME_FRAME < now) {
      setRatelimit({
        reqs: 0,
        start: now,
      });
      return true;
    }
    if (ratelimit.reqs < MAX_REQS) {
      setRatelimit((prev) => ({
        reqs: prev.reqs + 1,
        start: prev.start,
      }));
      return true;
    }
    return false;
  };

  // APIs
  const [loading, setLoading] = useState<boolean>(false);
  const [meta, setMeta] = useState<Metadata>({
    total: 0,
    by_state: {},
    by_country: {},
    by_type: {},
    page: 0,
    per_page: 0,
  } as Metadata);
  const [breweries, setBreweries] = useState<BrewResults>({
    pages: 0,
    current: 0,
    breweries: [],
    timestamp: 0,
    country: "",
  } as BrewResults);
  const [cache, setCache] = useState<
    Record<string, Record<number, BrewResults>> // searchString -> page -> breweries
  >({});

  useEffect(() => {
    const fetchMetaData = async () => {
      const metadata = (await BrewMeta()) as Metadata;
      setMeta(metadata);
    };
    fetchMetaData();
  }, []);

  const handleRandom = async () => {
    if (rateLimiter()) {
      setLoading(true);
      // const result = await BrewRandom();
      // setBreweries([result])
      setBreweries({
        pages: 1,
        current: 1,
        breweries: [DEV_RESULTS[Math.floor(Math.random() * 2)]],
        timestamp: Date.now(),
        country: "",
      });
      setLoading(false);
    } else {
      alert(
        `You exceeded the max requests of ${MAX_REQS} with ${TIME_FRAME / 1000} seconds.`,
      );
    }
  };

  const handleCountry = async (searchCountry: string, page: number = 1) => {
    if (meta && !Object.keys(meta.by_country).includes(searchCountry)) {
      console.info("Browse: invalid search parameter");
      return;
    }
    const cached = cache[searchCountry]?.[page];
    if (cached) {
      if (Date.now() - cached.timestamp < CACHE_TIMER) {
        setBreweries(cached);
        console.info("Cache: loaded data");
        return;
      }
    }
    if (rateLimiter()) {
      setLoading(true);
      const result = await BrewCountry(searchCountry, page);
      if (!result) {
        return;
      }
      setBreweries(result);
      setCache((prev) => ({
        ...prev,
        [searchCountry]: {
          ...prev[searchCountry],
          [page]: result,
        },
      }));
      setLoading(false);
    } else {
      alert(
        `You exceeded the max requests of ${MAX_REQS} with ${TIME_FRAME / 1000} seconds.`,
      );
    }
  };

  return (
    <div className="container">
      <NavBar onNav={handleNav} />
      <div className="container">
        {page === "main" && (
          <Main onRandom={handleRandom} results={breweries} />
        )}
        {page === "browse" && (
          <Browse
            onCountry={handleCountry}
            results={breweries}
            meta={meta}
            loading={loading}
          />
        )}
        {page === "about" && <About />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
