import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "activeNavLink" : "inactiveNavLink"
            }
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
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
