import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const [role, setRole] = useState("donor");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bloodGroup: "",
    organizationName: "",
    organizationType: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((previousState) => !previousState);
      return;
    }

    setShowConfirmPassword((previousState) => !previousState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!formData.password || formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
      );

      if (response.data.success) {
        setMessage("Account created successfully!");

        // Save login information
        localStorage.setItem("token", response.data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        // Go to login page after registration
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Registration failed. Please try again."
        );
      } else {
        setError(`Cannot connect to backend: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">

        {/* Left Section */}
        <div className="register-intro">

          <div className="register-brand">
            <span>♥</span>
            <strong>JeevaPulse</strong>
          </div>

          <p className="register-label">
            JOIN THE NETWORK
          </p>

          <h1>
            One account.
            <span> One step closer to coordination.</span>
          </h1>

          <p className="register-description">
            Create your JeevaPulse account and become part of an
            emergency blood coordination network.
          </p>

          <div className="register-points">

            <div className="register-point">
              <span>01</span>

              <div>
                <strong>Create your profile</strong>

                <p>
                  Add your basic information and account type.
                </p>
              </div>
            </div>

            <div className="register-point">
              <span>02</span>

              <div>
                <strong>Access your dashboard</strong>

                <p>
                  Manage requests, responses and coordination.
                </p>
              </div>
            </div>

            <div className="register-point">
              <span>03</span>

              <div>
                <strong>Coordinate support</strong>

                <p>
                  Connect with people and organizations through
                  the platform.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Section */}
        <div className="register-card">

          <div className="register-card-header">

            <p>CREATE ACCOUNT</p>

            <h2>
              Join JeevaPulse
            </h2>

            <span>
              Fill in your details to get started.
            </span>

          </div>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="register-form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

            </div>

            {/* Email + Phone */}
            <div className="register-form-row">

              <div className="register-form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />

              </div>

              <div className="register-form-group">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  required
                />

              </div>

            </div>

            {/* Location */}
            <div className="register-form-group">

              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City / Area"
                required
              />

            </div>

            {/* Role */}
            <div className="register-form-group">

              <label>
                Account Type
              </label>

              <select
                value={role}
                onChange={handleRoleChange}
                required
              >

                <option value="donor">
                  Donor
                </option>

                <option value="requester">
                  Requester
                </option>

                <option value="organization">
                  Blood Organization
                </option>

              </select>

            </div>

            {/* Blood Group - Donor only */}
            {role === "donor" && (

              <div className="register-form-group">

                <label>
                  Blood Group
                </label>

                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select blood group
                  </option>

                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>

                </select>

              </div>

            )}

            {/* Organization fields */}
            {role === "organization" && (

              <div className="organization-fields">

                <div className="register-form-group">

                  <label>
                    Organization Name
                  </label>

                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Enter organization name"
                    required
                  />

                </div>

                <div className="register-form-group">

                  <label>
                    Organization Type
                  </label>

                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select type
                    </option>

                    <option value="blood-bank">
                      Blood Bank
                    </option>

                    <option value="hospital">
                      Hospital
                    </option>

                    <option value="ngo">
                      NGO
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </div>

              </div>

            )}

            {/* Password */}
            <div className="register-form-group">

              <label>
                Password
              </label>

              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  minLength="6"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility("password")}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

            </div>

            {/* Confirm Password */}
            <div className="register-form-group">

              <label>
                Confirm Password
              </label>

              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  minLength="6"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>

            </div>

            {/* Notice */}
            <div className="register-notice">

              <span>i</span>

              <p>
                Your account will be used only for JeevaPulse
                coordination. Medical eligibility and blood
                compatibility are not determined by the platform.
              </p>

            </div>

            {/* Messages */}
            {message && (
              <div className="register-success">
                {message}
              </div>
            )}

            {error && (
              <div className="register-error">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}

              {!loading && <span>→</span>}
            </button>

          </form>

          <div className="register-login">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Log in
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;