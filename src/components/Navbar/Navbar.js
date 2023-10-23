import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <ul className="navbar">
      <li className="navbar-logo-item navbar-item-left">
        <Link to="/">
          <img src={process.env.PUBLIC_URL + "/bpsim.png"} alt="bpsim" className="navbar-logo" />
        </Link>
      </li>
      <li className="navbar-text-item navbar-item-right">
        <Link to="/about" style={{color: "white", textDecoration: "none"}}>
          About
        </Link>
      </li>
    </ul>
  );
}
