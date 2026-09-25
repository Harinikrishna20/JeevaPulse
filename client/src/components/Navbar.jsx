import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">❤</span>
          <span>JeevaPulse</span>
        </Link>

        {/* Navigation */}
        <nav className="navbar-menu">

          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link
            to="/how-it-works"
            className="nav-link"
          >
            How It Works
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="nav-link"
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                className="nav-link"
              >
                Profile
              </Link>

              <button
                type="button"
                className="nav-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-login"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="nav-register"
              >
                Register
              </Link>
            </>
          )}

        </nav>

      </div>
    </header>
  );
}

export default Navbar;