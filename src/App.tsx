import { useState } from "react";
import "./App.css";
import Main from "./main/main";
import About from "./about/about";
import Footer from "./ui/footer";
import NavBar from "./ui/navBar";
import BrewRandom from "../api/random.ts";

function App() {
  const [page, setPage] = useState("main");
  const [breweries, setBreweries] = useState(null);

  const pages: string[] = ["main", "about"];

  const handleNav = (page: string) => {
    if (!pages.includes(page)) return;
    setPage(page);
  };

  const handleRandom = () => {
    const result = [BrewRandom()];
    setBreweries(result);
  };

  return (
    <>
      <div className="container">
        <NavBar onNav={handleNav} />
        {page === "main" && (
          <Main ApiResults={breweries} Random={handleRandom} />
        )}
        {page === "about" && <About />}
        <Footer />
      </div>
    </>
  );
}

export default App;
