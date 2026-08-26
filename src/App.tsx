// DEV

import { useState } from "react";
import "./App.css";
import Main from "./main/Main.tsx";
import About from "./about/About.tsx";
import Footer from "./ui/footer";
import NavBar from "./ui/navBar";
import BrewRandom from "../api/random.ts";
import type { Brewery } from "./types/brewery";
import type { Ratelimiter } from "./types/ratelimiter.tsx";
import Browse from "./browse/Browse.tsx";

const MAX_REQS = 7;
const TIME_FRAME = 60_000;

function App() {
  // Navigation
  const [page, setPage] = useState("main");
  const pages: string[] = ["main", "browse", "about"];

  const handleNav = (page: string) => {
    if (!pages.includes(page)) return;
    setPage(page);
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
  const [breweries, setBreweries] = useState<Brewery[] | null>(null);

  const handleRandom = async () => {
    if (rateLimiter()) {
      console.info("API: fetching random brewery");
      const result = await BrewRandom();
      /*
      const result = {
        name: "Test Brewery",
        brewery_type: "micro",
        address_1: "Some street 23",
        city: "City of God",
        country: "Beerhalla",
        postal_code: "666",
      } as Brewery;
      */
      setBreweries([result]);
    } else {
      alert(
        `You exceeded the max requests of ${MAX_REQS} with ${TIME_FRAME / 1000} seconds.`,
      );
    }
  };

  const handleCountry = async () => {
    if (rateLimiter()) {
      console.info("API: fetching breweries by country");
      /*
      const result = await BrewCountry();
      */
      const result = [
        {
          name: "Test Brewery",
          brewery_type: "micro",
          address_1: "Some street 23",
          city: "City of God",
          country: "Beerhalla",
          postal_code: "666",
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
      setBreweries(result);
    } else {
      alert(
        `You exceeded the max requests of ${MAX_REQS} with ${TIME_FRAME / 1000} seconds.`,
      );
    }
    console.log("not yet implemented");
  };

  return (
    <div className="container">
      <NavBar onNav={handleNav} />
      {page === "main" && (
        <Main onRandom={handleRandom} RandomResults={breweries} />
      )}
      {page === "browse" && (
        <Browse onCountry={handleCountry} CountryResults={breweries} />
      )}
      {page === "about" && <About />}
      <Footer />
    </div>
  );
}

export default App;
