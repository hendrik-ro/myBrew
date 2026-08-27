/*
DEV
  API calls might be deactivated!
*/

import { useState } from "react";
import "./App.css";
import Main from "./main/Main.tsx";
import About from "./about/About.tsx";
import Footer from "./ui/footer";
import NavBar from "./ui/navBar";
// import BrewRandom from "../api/random.ts";
import BrewCountry from "../api/country.ts";
import type { Brewery } from "./types/brewery";
import type { Ratelimiter } from "./types/ratelimiter.tsx";
import Browse from "./browse/Browse.tsx";
import type { BrewResults } from "./types/results.tsx";

const MAX_REQS = 7;
const TIME_FRAME = 60_000;
const CACHE_TIMER = 900_000;

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
    setBreweries(null); // Reset breweries
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
  const [breweries, setBreweries] = useState<BrewResults | null>(null);
  const [cache, setCache] = useState<
    Record<string, Record<number, BrewResults>>
  >({});

  const handleRandom = async () => {
    if (rateLimiter()) {
      console.info("API: fetching random brewery");
      // const result = await BrewRandom();
      // setBreweries([result])
      setBreweries({
        pages: 1,
        current: 1,
        breweries: [DEV_RESULTS[Math.floor(Math.random() * 2)]],
        timestamp: Date.now(),
      });
    } else {
      alert(
        `You exceeded the max requests of ${MAX_REQS} with ${TIME_FRAME / 1000} seconds.`,
      );
    }
  };

  const handleCountry = async (searchCountry: string, page: number = 1) => {
    const cached = cache[searchCountry]?.[page];
    if (cached) {
      if (Date.now() - cached.timestamp < CACHE_TIMER) {
        setBreweries(cached);
        console.info("Cache: loaded data");
        return;
      }
    }
    if (rateLimiter()) {
      console.info("API: fetching breweries for " + searchCountry);
      const result = await BrewCountry(searchCountry);
      setBreweries(result);
      setCache((prev) => ({
        ...prev,
        [searchCountry]: {
          [page]: result,
        },
      }));
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
          <Browse onCountry={handleCountry} results={breweries} />
        )}
        {page === "about" && <About />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
