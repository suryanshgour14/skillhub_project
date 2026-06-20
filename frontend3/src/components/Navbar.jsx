import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { FaMoon, FaSun, FaGraduationCap } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useContext(ThemeContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <FaGraduationCap className="nav-logo-icon" />
        <span className="nav-logo-text">SkillHub</span>
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
        </li>
        <li
          className="dropdown-wrapper"
          onClick={() => setOpen(!open)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          tabIndex={0}
        >
          <span className={`nav-link ${isActive("/courses") || isActive("/add-course") ? "active" : ""}`}>
            Courses ▾
          </span>
          {open && (
            <div className="dropdown">
              <Link to="/courses" onClick={() => setOpen(false)}>All Courses</Link>
              <Link to="/add-course" onClick={() => setOpen(false)}>Add Course</Link>
            </div>
          )}
        </li>
        <li>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
        </li>
      </ul>

      <button className="theme-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
        {dark ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
}

export default Navbar;
