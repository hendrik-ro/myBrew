// API calls: OFF

import { useState } from "react";
import "./App.css";
import Main from "./main/main";
import About from "./about/about";
import Footer from "./ui/footer";
import NavBar from "./ui/navBar";
// import BrewRandom from "../api/random.ts";
import type { Brewery } from "./types/brewery";
import type { Ratelimiter } from "./types/ratelimiter.tsx";

const MAX_REQS = 7;
const TIME_FRAME = 60_000;

function App() {
  const [page, setPage] = useState("main");
  const [breweries, setBreweries] = useState<Brewery[] | null>(null);
  const [ratelimit, setRatelimit] = useState<Ratelimiter>({
    reqs: 0,
    start: Date.now(),
  });

  const pages: string[] = ["main", "about"];

  const handleNav = (page: string) => {
    if (!pages.includes(page)) return;
    setPage(page);
  };

  const handleRandom = async () => {
    if (rateLimiter()) {
      // const result = await BrewRandom();
      //*
      const result = {
        name: "Test Brewery",
        brewery_type: "micro",
        address_1: "Some street 23",
        city: "City of God",
        country: "Beerhalla",
        postal_code: "666",
      } as Brewery;
      //*/
      setBreweries([result]);
    } else {
      alert(
        `You exceeded the max requests of ${MAX_REQS} with ${TIME_FRAME / 1000} seconds.`,
      );
    }
  };

  const rateLimiter = (): boolean => {
    const now = Date.now();
    console.log(now);
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

  return (
    <>
      <div className="container">
        <NavBar onNav={handleNav} />
        {page === "main" && (
          <Main RandomResults={breweries} Random={handleRandom} />
        )}
        {page === "about" && <About />}
        <Footer />
      </div>
    </>
  );
}

export default App;
