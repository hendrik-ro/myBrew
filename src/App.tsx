import { useState } from "react";
import "./App.css";
import Main from "./main/main";
import About from "./about/about";
import Footer from "./ui/footer";
import NavBar from "./ui/navBar";

function App() {
  const [page, setPage] = useState("main");

  const pages: string[] = ["main", "about"];

  const handleNav = (page: string) => {
    if (!pages.includes(page)) return;
    setPage(page);
  };

  return (
    <>
      <div className="container">
        <NavBar onNav={handleNav} />
        {page === "main" && <Main />}
        {page === "about" && <About />}
        <Footer />
      </div>
    </>
  );
}

export default App;
