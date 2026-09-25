import { Link } from "react-router-dom";
import "./RequesterDashboard.css";

function RequesterDashboard() {
  return (
    <div className="requester-dashboard">

      {/* =========================
          DASHBOARD HEADER
      ========================== */}

      <section className="dashboard-header">

        <div>
          <p className="dashboard-label">
            REQUESTER DASHBOARD
          </p>

          <h1>
            Welcome to your
            <span>JeevaPulse dashboard.</span>
          </h1>

          <p className="dashboard-description">
            Create and manage blood requests, monitor responses,
            and coordinate support from one place.
          </p>
        </div>

        <Link
          to="/need-blood"
          className="dashboard-primary-button"
        >
          + Create Blood Request
        </Link>

      </section>


      {/* =========================
          QUICK STATS
      ========================== */}

      <section className="dashboard-stats">

        <div className="dashboard-stat-card">

          <span className="stat-number">—</span>

          <span className="stat-label">
            Active Requests
          </span>

        </div>


        <div className="dashboard-stat-card">

          <span className="stat-number">—</span>

          <span className="stat-label">
            Responses
          </span>

        </div>


        <div className="dashboard-stat-card">

          <span className="stat-number">—</span>

          <span className="stat-label">
            Confirmed Support
          </span>

        </div>


        <div className="dashboard-stat-card">

          <span className="stat-number">—</span>

          <span className="stat-label">
            Fulfilled Requests
          </span>

        </div>

      </section>


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <section className="dashboard-content">


        {/* MY REQUESTS */}

        <div className="my-requests-card">

          <div className="card-heading">

            <div>
              <p>REQUEST MANAGEMENT</p>

              <h2>My Blood Requests</h2>
            </div>

            <Link to="/need-blood">
              + New Request
            </Link>

          </div>


          {/* EMPTY STATE */}

          <div className="dashboard-empty">

            <div className="dashboard-empty-icon">
              +
            </div>

            <h3>
              No blood requests yet
            </h3>

            <p>
              When you create a blood request, it will appear
              here so you can track its progress.
            </p>

            <Link
              to="/need-blood"
              className="empty-create-button"
            >
              Create Your First Request
            </Link>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <aside className="dashboard-side">


          {/* COORDINATION STATUS */}

          <div className="coordination-card">

            <p className="side-card-label">
              REQUEST STATUS
            </p>

            <h3>
              Track your coordination
            </h3>

            <p className="side-card-description">
              Once a request receives responses, its
              coordination progress will appear here.
            </p>


            <div className="status-list">

              <div className="status-item">

                <span className="status-dot"></span>

                <div>
                  <strong>Pending</strong>
                  <small>
                    Waiting for support
                  </small>
                </div>

              </div>


              <div className="status-item">

                <span className="status-dot"></span>

                <div>
                  <strong>Matched</strong>
                  <small>
                    Potential support identified
                  </small>
                </div>

              </div>


              <div className="status-item">

                <span className="status-dot"></span>

                <div>
                  <strong>Confirmed</strong>
                  <small>
                    Support coordinated
                  </small>
                </div>

              </div>


              <div className="status-item">

                <span className="status-dot"></span>

                <div>
                  <strong>Fulfilled</strong>
                  <small>
                    Request completed
                  </small>
                </div>

              </div>

            </div>

          </div>


          {/* PROFILE */}

          <div className="profile-card">

            <p className="side-card-label">
              YOUR PROFILE
            </p>

            <h3>
              Complete your profile
            </h3>

            <p>
              Keep your contact and location information
              updated for smoother coordination.
            </p>

            <Link to="/profile">
              View Profile →
            </Link>

          </div>

        </aside>

      </section>


      {/* =========================
          INFORMATION
      ========================== */}

      <div className="dashboard-notice">

        <strong>Important:</strong>

        <span>
          JeevaPulse is a coordination platform. Medical
          eligibility and blood compatibility must be verified
          by qualified healthcare professionals.
        </span>

      </div>

    </div>
  );
}

export default RequesterDashboard;