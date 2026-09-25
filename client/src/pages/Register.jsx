import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const [role, setRole] = useState("user");

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

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Clear previous messages while typing
    if (error) {
      setError("");
    }

    if (message) {
      setMessage("");
    }
  };

  // ==========================================
  // HANDLE ROLE CHANGE
  // ==========================================
  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;

    setRole(selectedRole);

    setFormData((previousData) => ({
      ...previousData,

      // Clear donor-specific data
      bloodGroup:
        selectedRole === "donor"
          ? previousData.bloodGroup
          : "",

      // Clear organization-specific data
      organizationName:
        selectedRole === "organization"
          ? previousData.organizationName
          : "",

      organizationType:
        selectedRole === "organization"
          ? previousData.organizationType
          : "",
    }));

    setError("");
    setMessage("");
  };

  // ==========================================
  // SHOW / HIDE PASSWORD
  // ==========================================
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((previousState) => !previousState);
      return;
    }

    setShowConfirmPassword(
      (previousState) => !previousState
    );
  };

  // ==========================================
  // HANDLE REGISTRATION
  // ==========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    // ------------------------------------------
    // Get password values
    // ------------------------------------------
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // ------------------------------------------
    // Required password
    // ------------------------------------------
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    // ------------------------------------------
    // Minimum password length
    // ------------------------------------------
    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    // ------------------------------------------
    // Confirm password required
    // ------------------------------------------
    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    // ------------------------------------------
    // Password comparison
    // ------------------------------------------
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ------------------------------------------
    // Donor validation for all non-organization users
    // ------------------------------------------
    if (role !== "organization" && !formData.bloodGroup) {
      setError("Please select your blood group.");
      return;
    }

    // ------------------------------------------
    // Organization validation
    // ------------------------------------------
    if (role === "organization") {
      if (!formData.organizationName.trim()) {
        setError("Please enter the organization name.");
        return;
      }

      if (!formData.organizationType) {
        setError(
          "Please select the organization type."
        );
        return;
      }
    }

    setLoading(true);

    try {
      // ==========================================
      // SEND DATA TO BACKEND
      // ==========================================
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          location: formData.location.trim(),

          bloodGroup:
            role === "organization"
              ? ""
              : formData.bloodGroup,

          password: password,

          // IMPORTANT:
          // Backend requires this field
          confirmPassword: confirmPassword,

          role: role === "organization" ? "organization" : "user",

          organizationName:
            role === "organization"
              ? formData.organizationName.trim()
              : "",

          organizationType:
            role === "organization"
              ? formData.organizationType
              : "",
        }
      );

      // ==========================================
      // REGISTRATION SUCCESS
      // ==========================================
      if (response.data.success) {
        setMessage(
          response.data.message ||
            "Account created successfully!"
        );

        // ------------------------------------------
        // Backend response:
        //
        // response.data.data.user
        // response.data.data.token
        // ------------------------------------------
        const user = response.data.data?.user;
        const token = response.data.data?.token;

        // Save token
        if (token) {
          localStorage.setItem("token", token);
        }

        // Save user
        if (user) {
          localStorage.setItem(
            "user",
            JSON.stringify(user)
          );
        }

        // Go to login page
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setError(
          response.data.message ||
            "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      // ==========================================
      // BACKEND ERROR
      // ==========================================
      if (error.response) {
        setError(
          error.response.data?.message ||
            "Registration failed. Please try again."
        );
      }

      // ==========================================
      // BACKEND NOT RUNNING
      // ==========================================
      else if (error.request) {
        setError(
          "Cannot connect to backend. Make sure the backend server is running on port 5000."
        );
      }

      // ==========================================
      // OTHER ERROR
      // ==========================================
      else {
        setError(
          error.message ||
            "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-container">

        {/* ======================================
            LEFT SECTION
        ======================================= */}
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
            <span>
              {" "}
              One step closer to coordination.
            </span>
          </h1>

          <p className="register-description">
            Create your JeevaPulse account and become
            part of an emergency blood coordination
            network.
          </p>

          <div className="register-points">

            {/* POINT 1 */}
            <div className="register-point">

              <span>01</span>

              <div>
                <strong>
                  Create your profile
                </strong>

                <p>
                  Add your basic information and
                  account type.
                </p>
              </div>

            </div>

            {/* POINT 2 */}
            <div className="register-point">

              <span>02</span>

              <div>
                <strong>
                  Access your dashboard
                </strong>

                <p>
                  Manage requests, responses and
                  coordination.
                </p>
              </div>

            </div>

            {/* POINT 3 */}
            <div className="register-point">

              <span>03</span>

              <div>
                <strong>
                  Coordinate support
                </strong>

                <p>
                  Connect with people and
                  organizations through the platform.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ======================================
            RIGHT SECTION
        ======================================= */}
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

            {/* ==================================
                FULL NAME
            =================================== */}
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
                autoComplete="name"
                required
              />

            </div>

            {/* ==================================
                EMAIL + PHONE
            =================================== */}
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
                  autoComplete="email"
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
                  autoComplete="tel"
                  required
                />

              </div>

            </div>

            {/* ==================================
                LOCATION
            =================================== */}
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

            {/* ==================================
                ACCOUNT TYPE
            =================================== */}
            <div className="register-form-group">

              <label>
                Account Type
              </label>

              <select
                value={role}
                onChange={handleRoleChange}
                required
              >

                <option value="user">
                  Donor
                </option>

                <option value="organization">
                  Blood Organization
                </option>

              </select>

            </div>

            {/* ==================================
                BLOOD GROUP
            =================================== */}
            {role !== "organization" && (
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

                  <option value="A+">
                    A+
                  </option>

                  <option value="A-">
                    A-
                  </option>

                  <option value="B+">
                    B+
                  </option>

                  <option value="B-">
                    B-
                  </option>

                  <option value="AB+">
                    AB+
                  </option>

                  <option value="AB-">
                    AB-
                  </option>

                  <option value="O+">
                    O+
                  </option>

                  <option value="O-">
                    O-
                  </option>

                </select>

              </div>
            )}

            {/* ==================================
                ORGANIZATION FIELDS
            =================================== */}
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

            {/* ==================================
                PASSWORD
            =================================== */}
            <div className="register-form-group">

              <label>
                Password
              </label>

              <div className="password-input-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  minLength={8}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    togglePasswordVisibility(
                      "password"
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>

            {/* ==================================
                CONFIRM PASSWORD
            =================================== */}
            <div className="register-form-group">

              <label>
                Confirm Password
              </label>

              <div className="password-input-wrapper">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  minLength={8}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    togglePasswordVisibility(
                      "confirmPassword"
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>

            {/* ==================================
                PASSWORD MATCH STATUS
            =================================== */}
            {formData.confirmPassword && (
              <div
                style={{
                  marginTop: "-8px",
                  marginBottom: "15px",
                  fontSize: "13px",
                  color:
                    formData.password ===
                    formData.confirmPassword
                      ? "green"
                      : "red",
                }}
              >
                {formData.password ===
                formData.confirmPassword
                  ? "✓ Passwords match"
                  : "✕ Passwords do not match"}
              </div>
            )}

            {/* ==================================
                NOTICE
            =================================== */}
            <div className="register-notice">

              <span>i</span>

              <p>
                Your account will be used only for
                JeevaPulse coordination. Medical
                eligibility and blood compatibility
                are not determined by the platform.
              </p>

            </div>

            {/* ==================================
                SUCCESS MESSAGE
            =================================== */}
            {message && (
              <div className="register-success">
                {message}
              </div>
            )}

            {/* ==================================
                ERROR MESSAGE
            =================================== */}
            {error && (
              <div className="register-error">
                {error}
              </div>
            )}

            {/* ==================================
                SUBMIT
            =================================== */}
            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

              {!loading && (
                <span>→</span>
              )}

            </button>

          </form>

          {/* ====================================
              LOGIN LINK
          ===================================== */}
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