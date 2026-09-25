import { useState } from "react";
import { Link } from "react-router-dom";
import "./Availability.css";

function Availability() {
  const [availability, setAvailability] = useState("available");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="availability-page">

      {/* Header */}
      <section className="availability-header">
        <div>
          <p>DONOR SETTINGS</p>
          <h1>Availability</h1>
          <span>
            Manage whether you are currently available for coordination.
          </span>
        </div>

        <Link to="/donor-dashboard" className="availability-back-button">
          ← Dashboard
        </Link>
      </section>


      <section className="availability-layout">

        {/* Main card */}
        <div className="availability-main-card">

          <div className="availability-card-header">
            <p>YOUR AVAILABILITY</p>
            <h2>Update Availability Status</h2>
            <span>
              Keep your status updated so relevant coordination
              opportunities can be handled appropriately.
            </span>
          </div>


          <div className="availability-options">

            <label
              className={`availability-option ${
                availability === "available" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="availability"
                value="available"
                checked={availability === "available"}
                onChange={(e) => {
                  setAvailability(e.target.value);
                  setSaved(false);
                }}
              />

              <div className="availability-radio"></div>

              <div>
                <strong>Available</strong>
                <p>
                  I am currently available to respond to
                  coordination requests.
                </p>
              </div>
            </label>


            <label
              className={`availability-option ${
                availability === "unavailable" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="availability"
                value="unavailable"
                checked={availability === "unavailable"}
                onChange={(e) => {
                  setAvailability(e.target.value);
                  setSaved(false);
                }}
              />

              <div className="availability-radio"></div>

              <div>
                <strong>Unavailable</strong>
                <p>
                  I am currently unavailable for coordination.
                </p>
              </div>
            </label>



          </div>


          <div className="availability-action">

            <button
              className="save-availability-button"
              onClick={handleSave}
            >
              Save Availability
            </button>

            {saved && (
              <span className="availability-saved">
                Availability updated for this session.
              </span>
            )}

          </div>

        </div>


        {/* Information card */}
        <aside className="availability-side">

          <div className="availability-info-card">

            <p>HOW IT WORKS</p>

            <h2>
              Keep your status current.
            </h2>

            <div className="availability-info-item">
              <span>01</span>
              <div>
                <strong>Set your status</strong>
                <small>
                  Choose the availability that represents your
                  current situation.
                </small>
              </div>
            </div>

            <div className="availability-info-item">
              <span>02</span>
              <div>
                <strong>Receive relevant requests</strong>
                <small>
                  Your availability can be used by the platform
                  for coordination.
                </small>
              </div>
            </div>

            <div className="availability-info-item">
              <span>03</span>
              <div>
                <strong>Update when needed</strong>
                <small>
                  Change your status whenever your availability
                  changes.
                </small>
              </div>
            </div>

          </div>


          <div className="availability-profile-card">

            <p>PROFILE</p>

            <h3>
              Keep your donor information updated.
            </h3>

            <span>
              Your profile contains the information used for
              platform coordination.
            </span>

            <Link to="/profile">
              View Profile →
            </Link>

          </div>

        </aside>

      </section>


      <div className="availability-notice">

        <strong>Important:</strong>

        <span>
          Availability does not mean medical eligibility to donate.
          Donation eligibility and blood compatibility must be
          verified by qualified healthcare professionals.
        </span>

      </div>

    </div>
  );
}

export default Availability;