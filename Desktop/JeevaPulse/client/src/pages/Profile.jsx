import { useState } from "react";
import "./Profile.css";

function Profile() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="profile-page">

      <div className="profile-page-header">
        <div>
          <p>ACCOUNT SETTINGS</p>
          <h1>My Profile</h1>
          <span>
            Manage your account and coordination information.
          </span>
        </div>

        <button
          className="profile-edit-button"
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>


      <div className="profile-layout">

        {/* Profile summary */}
        <aside className="profile-summary">

          <div className="profile-avatar">
            U
          </div>

          <h2>Your Name</h2>

          <p className="profile-role">
            Account Role
          </p>

          <div className="profile-status">
            <span></span>
            Account status
          </div>

          <div className="profile-summary-divider"></div>

          <div className="profile-summary-item">
            <span>Member since</span>
            <strong>—</strong>
          </div>

          <div className="profile-summary-item">
            <span>Profile completion</span>
            <strong>—</strong>
          </div>

        </aside>


        {/* Profile details */}
        <main className="profile-details">

          <section className="profile-card">

            <div className="profile-card-header">
              <div>
                <p>PERSONAL INFORMATION</p>
                <h2>Basic Details</h2>
              </div>
            </div>


            <div className="profile-form-grid">

              <div className="profile-field">
                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Your full name"
                  disabled={!editing}
                />
              </div>


              <div className="profile-field">
                <label>Email</label>

                <input
                  type="email"
                  placeholder="your@email.com"
                  disabled={!editing}
                />
              </div>


              <div className="profile-field">
                <label>Phone</label>

                <input
                  type="tel"
                  placeholder="Your phone number"
                  disabled={!editing}
                />
              </div>


              <div className="profile-field">
                <label>Location</label>

                <input
                  type="text"
                  placeholder="Your city / area"
                  disabled={!editing}
                />
              </div>

            </div>

          </section>


          <section className="profile-card">

            <div className="profile-card-header">
              <div>
                <p>ACCOUNT INFORMATION</p>
                <h2>Account Details</h2>
              </div>
            </div>


            <div className="account-info-grid">

              <div>
                <span>Account Type</span>
                <strong>—</strong>
              </div>

              <div>
                <span>Account ID</span>
                <strong>—</strong>
              </div>

              <div>
                <span>Verification Status</span>
                <strong>Not available</strong>
              </div>

              <div>
                <span>Last Updated</span>
                <strong>—</strong>
              </div>

            </div>

          </section>


          <section className="profile-card">

            <div className="profile-card-header">
              <div>
                <p>COORDINATION INFORMATION</p>
                <h2>Additional Information</h2>
              </div>
            </div>


            <div className="profile-form-grid">

              <div className="profile-field">
                <label>Blood Group</label>

                <select disabled={!editing}>
                  <option value="">
                    Not provided
                  </option>

                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>


              <div className="profile-field">
                <label>Availability</label>

                <select disabled={!editing}>
                  <option>Not configured</option>
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>
              </div>

            </div>


            {editing && (
              <button
                className="save-profile-button"
                onClick={() => setEditing(false)}
              >
                Save Profile
              </button>
            )}

          </section>


          <div className="profile-notice">

            <strong>Important:</strong>

            <span>
              JeevaPulse uses profile information for platform
              coordination. Medical eligibility and blood
              compatibility are not determined by the platform.
            </span>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Profile;