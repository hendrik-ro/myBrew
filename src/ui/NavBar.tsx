import { NavLink } from "react-router-dom";
import "./NavBar.css";
import type { NavBarProps } from "../types/props";

export default function NavBar(props: NavBarProps) {
  const { onNav } = props;
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "activeNavLink" : "inactiveNavLink"
            }
            onClick={onNav}
          >
            My Brew
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/browse"
            className={({ isActive }) =>
              isActive ? "activeNavLink" : "inactiveNavLink"
            }
            onClick={onNav}
          >
            Browse
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "activeNavLink" : "inactiveNavLink"
            }
            onClick={onNav}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
