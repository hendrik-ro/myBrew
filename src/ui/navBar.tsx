import type { NavBarProps } from "../types/navBarProps";

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
          <button className="navButton" onClick={() => onNav("about")}>
            About
          </button>
        </li>
      </ul>
    </nav>
  );
}
