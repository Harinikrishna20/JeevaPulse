import { Link } from "react-router-dom";
import "./DonorDashboard.css";

function DonorDashboard() {
  return (
    <div className="donor-dashboard">

      {/* =========================
          HEADER
      ========================== */}

      <section className="donor-header">

        <div>
          <p className="donor-label">
            DONOR DASHBOARD
          </p>

          <h1>
            Help where
            <span>support is needed.</span>
          </h1>

          <p className="donor-description">
            View blood requests, review coordination details,
            and respond when you are available to help.
          </p>
        </div>

        <Link
          to="/requests"
          className="donor-primary-button"
        >
          Find Blood Requests →
        </Link>

      </section>


      {/* =========================
          DONOR STATUS
      ========================== */}

      <section className="donor-status-bar">

        <div className="donor-status-info">

          <div className="availability-indicator"></div>

          <div>
            <span>YOUR AVAILABILITY</span>
            <strong>Availability status will appear here</strong>
          </div>

        </div>

        <button className="availability-button">
          Update Availability
        </button>

      </section>


      {/* =========================
          STATS
      ========================== */}

      <section className="donor-stats">

        <div className="donor-stat-card">
          <span className="donor-stat-number">—</span>
          <span className="donor-stat-label">
            Requests Available
          </span>
        </div>

        <div className="donor-stat-card">
          <span className="donor-stat-number">—</span>
          <span className="donor-stat-label">
            Responses Sent
          </span>
        </div>

        <div className="donor-stat-card">
          <span className="donor-stat-number">—</span>
          <span className="donor-stat-label">
            Confirmed Support
          </span>
        </div>

        <div className="donor-stat-card">
          <span className="donor-stat-number">—</span>
          <span className="donor-stat-label">
            Completed
          </span>
        </div>

      </section>


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <section className="donor-content">


        {/* AVAILABLE REQUESTS */}

        <div className="available-requests-card">

          <div className="donor-card-heading">

            <div>
              <p>COORDINATION NETWORK</p>

              <h2>
                Blood Requests
              </h2>
            </div>

            <Link to="/requests">
              View All →
            </Link>

          </div>


          {/* EMPTY STATE */}

          <div className="donor-empty">

            <div className="donor-empty-icon">
              🩸
            </div>

            <h3>
              No requests available
            </h3>

            <p>
              Active blood requests from the JeevaPulse network
              will appear here when they are available.
            </p>

            <Link
              to="/requests"
              className="donor-empty-button"
            >
              Browse Requests
            </Link>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <aside className="donor-side">


          {/* RESPONSE CARD */}

          <div className="response-card">

            <p className="donor-side-label">
              YOUR RESPONSES
            </p>

            <h3>
              Response activity
            </h3>

            <p>
              When you respond to a request, your response
              status and coordination progress will appear here.
            </p>

            <div className="response-status-list">

              <div className="response-status">
                <span></span>

                <div>
                  <strong>Response Sent</strong>
                  <small>
                    Waiting for coordination
                  </small>
                </div>
              </div>

              <div className="response-status">
                <span></span>

                <div>
                  <strong>Confirmed</strong>
                  <small>
                    Support confirmed
                  </small>
                </div>
              </div>

              <div className="response-status">
                <span></span>

                <div>
                  <strong>Completed</strong>
                  <small>
                    Coordination completed
                  </small>
                </div>
              </div>

            </div>

          </div>


          {/* PROFILE CARD */}

          <div className="donor-profile-card">

            <p className="donor-side-label">
              DONOR PROFILE
            </p>

            <h3>
              Keep your profile updated
            </h3>

            <p>
              Your blood group, location and availability
              help the platform show relevant coordination
              opportunities.
            </p>

            <Link to="/profile">
              View Profile →
            </Link>

          </div>

        </aside>

      </section>


      {/* =========================
          SAFETY NOTICE
      ========================== */}

      <div className="donor-notice">

        <strong>Important:</strong>

        <span>
          JeevaPulse does not determine medical eligibility
          for donation or blood compatibility. These decisions
          must be verified by qualified healthcare professionals.
        </span>

      </div>

    </div>
  );
}

export default DonorDashboard;