import { useEffect, useState } from "react";
import "./App.css";
import Main from "./main/main";
import About from "./about/about";
import Status from "./status/status";

function App() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (page === null) {
      setPage("main");
    }
  }, []);

  const pages: string[] = ["main", "about", "status"];

  const handleNav = (page: string) => {
    if (!pages.includes(page)) return;
    setPage(page);
  };

  return (
    <>
      {page === "main" && <Main onNav={handleNav} />}
      {page === "about" && <About onNav={handleNav} />}
      {page === "status" && <Status onNav={handleNav} />}
    </>
  );
}

export default App;
