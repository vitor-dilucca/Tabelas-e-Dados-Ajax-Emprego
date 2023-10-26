import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (location.pathname === path) {
      return { color: '#ff9900' };
    } else {
      return { color: '#ffffff' };
    }
  };

  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive('/')} to="/">
            Inicio
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
