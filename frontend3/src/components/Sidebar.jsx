import { Link, useLocation } from "react-router-dom";
import {
  FaCode, FaServer, FaDatabase, FaCloud, FaMobileAlt,
  FaHome, FaPlusCircle, FaEnvelope, FaBookOpen
} from "react-icons/fa";

const categories = [
  { name: "Frontend", icon: <FaCode /> },
  { name: "Backend", icon: <FaServer /> },
  { name: "Database", icon: <FaDatabase /> },
  { name: "Cloud", icon: <FaCloud /> },
  { name: "Mobile", icon: <FaMobileAlt /> },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h4 className="sidebar-heading">Categories</h4>
        <div className="sidebar-categories">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/courses?category=${cat.name}`}
              className="category-link"
            >
              <span className="cat-icon">{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <h4 className="sidebar-heading">Quick Menu</h4>
        <nav className="sidebar-nav">
          <Link to="/" className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}>
            <FaHome /> Dashboard
          </Link>
          <Link to="/courses" className={`sidebar-link ${location.pathname === "/courses" ? "active" : ""}`}>
            <FaBookOpen /> All Courses
          </Link>
          <Link to="/add-course" className={`sidebar-link ${location.pathname === "/add-course" ? "active" : ""}`}>
            <FaPlusCircle /> Add Course
          </Link>
          <Link to="/contact" className={`sidebar-link ${location.pathname === "/contact" ? "active" : ""}`}>
            <FaEnvelope /> Contact
          </Link>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
