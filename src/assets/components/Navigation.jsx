import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/Navigation.css";

// Bug fix (navigation):
//   This component used to require an `onCategoryChange` prop and call it on
//   every click. Two problems came from that:
//     1. SearchPage renders <Navigation /> without the prop, so clicking any
//        category there threw "onCategoryChange is not a function".
//     2. The callback only duplicated the category that the URL already
//        carried, and that copy was thrown away as soon as the route changed.
//   Navigation now has ONE job: put the chosen category into the URL. Every
//   component reads it back with useParams(), so nothing has to be passed down
//   and it works the same on the home, category, search and favorites pages.
function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <button
            onClick={() => navigate("/")}
            className={isActive("/") ? "active" : ""}
          >
            Latest News
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/science_technology")}
            className={isActive("/science_technology") ? "active" : ""}
          >
            Technology
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/politics_government")}
            className={isActive("/politics_government") ? "active" : ""}
          >
            Politics
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/sport")}
            className={isActive("/sport") ? "active" : ""}
          >
            Sports
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/health")}
            className={isActive("/health") ? "active" : ""}
          >
            Health
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/society")}
            className={isActive("/society") ? "active" : ""}
          >
            Society
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/education")}
            className={isActive("/education") ? "active" : ""}
          >
            Education
          </button>
        </li>
        <li>
          <Link to="/search">
            <button className={isActive("/search") ? "active" : ""}>
              Search News...
            </button>
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <button className={isActive("/favorites") ? "active" : ""}>
              ♥ Favorites
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
