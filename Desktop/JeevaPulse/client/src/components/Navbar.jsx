import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        <span className="logo-heart">♥</span>
        <span>JeevaPulse</span>
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/requests">Find Requests</Link>
        <Link to="/how-it-works">How It Works</Link>
      </div>

      <div className="navbar-actions">

        <Link to="/login" className="login-link">
          Log in
        </Link>

        <Link to="/register" className="join-button">
          Join Platform
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;