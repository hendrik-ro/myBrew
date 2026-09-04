/*
DEV
  API calls might be deactivated!
*/

import { useEffect, useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";
// CSS
import "./App.css";
// Components
import Main from "../components/main/Main.tsx";
import About from "../components/about/About.tsx";
import Footer from "../ui/Footer.tsx";
import NavBar from "../ui/NavBar.tsx";
import Browse from "../components/browse/Browse.tsx";
// Types
import type { Ratelimiter } from "../types/ratelimiter.tsx";
import type { BrewResults } from "../types/results.tsx";
// Store
import { useAppDispatch } from "./store.tsx";
import {
  fetchBreweriesByCountry,
  fetchBreweriesRandom,
  fetchMetaData,
  resetBreweries,
  selectBreweries,
  useCache,
} from "../features/breweriesSlice.tsx";

const MAX_REQS = 7;
const TIME_FRAME = 60_000;
const CACHE_TIMER = 900_000_000;

export default function App() {
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
  const breweriesState = useSelector(selectBreweries);
  const [cache, setCache] = useState<
    Record<string, Record<number, BrewResults>> // searchString -> page -> breweries
  >({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMetaData());
  }, []);

  const handleRandom = async () => {
    if (rateLimiter()) {
      dispatch(fetchBreweriesRandom());
    } else {
      alert(
        `You exceeded the max requests of ${MAX_REQS} with ${TIME_FRAME / 1000} seconds.`,
      );
    }
  };

  const handleCountry = async (searchCountry: string, page: number = 1) => {
    if (
      breweriesState.meta &&
      !Object.keys(breweriesState.meta.by_country).includes(searchCountry)
    ) {
      console.info("Browse: invalid search parameter");
      return;
    }
    const cached = cache[searchCountry]?.[page];
    if (cached) {
      if (Date.now() - cached.timestamp < CACHE_TIMER) {
        dispatch(useCache(cached));
        console.info("Cache: loaded data");
        return;
      }
    }
    if (rateLimiter()) {
      dispatch(fetchBreweriesByCountry({ country: searchCountry, page: page }));
      setCache((prev) => ({
        ...prev,
        [searchCountry]: {
          ...prev[searchCountry],
          [page]: breweriesState.breweries,
        },
      }));
    } else {
      alert(
        `You exceeded the max requests of ${MAX_REQS} with ${TIME_FRAME / 1000} seconds.`,
      );
    }
  };

  // Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <>
            <NavBar onNav={resetBreweries} />
            <Outlet />
            <Footer />
          </>
        }
      >
        <Route
          index
          element={
            <Main onRandom={handleRandom} results={breweriesState.random} />
          }
        />
        <Route
          path="browse"
          element={
            <Browse
              onCountry={handleCountry}
              results={breweriesState.breweries}
              meta={breweriesState.meta}
              loading={breweriesState.loading}
            />
          }
        />
        <Route path="about" element={<About />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
