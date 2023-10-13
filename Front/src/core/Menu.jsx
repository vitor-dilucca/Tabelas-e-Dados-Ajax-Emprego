import { Link } from "react-router-dom";
const Menu = () => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Inicio
        </Link>
      </li>
    </ul>
  </div>
);

export default Menu;
