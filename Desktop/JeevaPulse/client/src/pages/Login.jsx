import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend authentication will be connected here later.
    // For now, open the requester dashboard for frontend testing.
    navigate("/requester-dashboard");
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* Left side */}
        <div className="login-intro">

          <div className="login-brand">
            <span>♥</span>
            <strong>JeevaPulse</strong>
          </div>

          <p className="login-label">
            WELCOME BACK
          </p>

          <h1>
            Continue your
            <span> coordination journey.</span>
          </h1>

          <p className="login-description">
            Sign in to manage blood requests, coordinate support,
            and access your JeevaPulse dashboard.
          </p>

          <div className="login-highlight">

            <div className="highlight-icon">
              ✓
            </div>

            <div>
              <strong>One platform for coordination</strong>

              <p>
                Requests, responses and updates can be managed
                from your dashboard.
              </p>
            </div>

          </div>

        </div>


        {/* Login card */}
        <div className="login-card">

          <div className="login-card-header">

            <p>ACCOUNT LOGIN</p>

            <h2>
              Log in to JeevaPulse
            </h2>

            <span>
              Enter your account details to continue.
            </span>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="login-form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />

            </div>


            <div className="login-form-group">

              <div className="password-label">

                <label>
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-button"
                >
                  Forgot password?
                </button>

              </div>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />

            </div>


            <button
              type="submit"
              className="login-submit"
            >
              Log In
              <span>→</span>
            </button>

          </form>


          <div className="login-divider">
            <span>OR</span>
          </div>


          <div className="login-register">

            <span>
              Don't have a JeevaPulse account?
            </span>

            <Link to="/register">
              Create an account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;