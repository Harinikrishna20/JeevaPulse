import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [role, setRole] = useState("donor");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend will be connected here later.
    alert("Account form submitted. Backend connection will be added later.");
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
                onChange={(event) => setRole(event.target.value)}
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

                <select required>

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
                    placeholder="Enter organization name"
                    required
                  />

                </div>

                <div className="register-form-group">

                  <label>
                    Organization Type
                  </label>

                  <select required>

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

              <input
                type="password"
                placeholder="Create a password"
                minLength="6"
                required
              />

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


            {/* Submit */}
            <button
              type="submit"
              className="register-submit"
            >
              Create Account
              <span>→</span>
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