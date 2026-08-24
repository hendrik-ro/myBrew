import type { PageProps } from "../types/pages";

export default function NavBar(props: PageProps) {
  const onNav = props.onNav;

  return (
    <nav>
      <ul>
        <li>
          <button className="navButton" onClick={() => onNav("main")}>
            My Brew
          </button>
        </li>
        <li>
          <button className="navButton" onClick={() => onNav("about")}>
            About
          </button>
        </li>
        <li>
          <button className="navButton" onClick={() => onNav("status")}>
            Status
          </button>
        </li>
      </ul>
    </nav>
  );
}
