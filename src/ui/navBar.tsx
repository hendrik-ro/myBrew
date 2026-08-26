import type { NavBarProps } from "../types/props";

export default function NavBar(props: NavBarProps) {
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
          <button className="navButton" onClick={() => onNav("browse")}>
            Browse
          </button>
        </li>
        <li>
          <button className="navButton" onClick={() => onNav("about")}>
            About
          </button>
        </li>
      </ul>
    </nav>
  );
}
