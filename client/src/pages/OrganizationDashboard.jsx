import { Link } from "react-router-dom";
import "./OrganizationDashboard.css";

function OrganizationDashboard() {
  return (
    <div className="organization-dashboard">

      {/* Sidebar */}
      <aside className="organization-sidebar">

        <div className="organization-logo">
          <span>♥</span>
          <strong>JeevaPulse</strong>
        </div>

        <div className="organization-role">
          ORGANIZATION
        </div>

        <nav className="organization-nav">

          <Link to="/organization-dashboard" className="active">
            <span>▦</span>
            Dashboard
          </Link>

          <Link to="/requests">
            <span>⌕</span>
            Blood Requests
          </Link>

          <Link to="/organization-responses">
            <span>↔</span>
            Responses
          </Link>

          <Link to="/organization-availability">
            <span>◉</span>
            Availability
          </Link>

          <Link to="/notifications">
            <span>♢</span>
            Notifications
          </Link>

          <Link to="/profile">
            <span>○</span>
            Profile
          </Link>

        </nav>

        <div className="organization-sidebar-bottom">

          <Link to="/how-it-works">
            <span>?</span>
            Help & Guide
          </Link>

          <Link to="/">
            <span>↪</span>
            Logout
          </Link>

        </div>

      </aside>


      {/* Main Area */}
      <main className="organization-main">

        {/* Top Bar */}
        <header className="organization-topbar">

          <div>
            <p>ORGANIZATION DASHBOARD</p>
            <h1>Organization Overview</h1>
          </div>

          <div className="organization-top-actions">

            <Link to="/notifications" className="notification-button">
              ♢
            </Link>

            <Link to="/profile" className="organization-profile">
              <span>O</span>

              <div>
                <strong>Organization</strong>
                <small>Account</small>
              </div>
            </Link>

          </div>

        </header>


        {/* Welcome */}
        <section className="organization-welcome">

          <div>
            <span>WELCOME TO JEEVAPULSE</span>

            <h2>
              Coordinate support
              <strong> from one place.</strong>
            </h2>

            <p>
              Manage blood requests, coordinate responses and
              keep your organization's availability information
              updated.
            </p>
          </div>

          <Link to="/requests" className="organization-primary-button">
            View Blood Requests →
          </Link>

        </section>


        {/* Stats */}
        <section className="organization-stats">

          <div className="organization-stat">

            <div className="stat-icon red">
              +
            </div>

            <div>
              <strong>—</strong>
              <span>Active Requests</span>
            </div>

          </div>


          <div className="organization-stat">

            <div className="stat-icon dark">
              ↔
            </div>

            <div>
              <strong>—</strong>
              <span>Responses</span>
            </div>

          </div>


          <div className="organization-stat">

            <div className="stat-icon green">
              ✓
            </div>

            <div>
              <strong>—</strong>
              <span>Confirmed Support</span>
            </div>

          </div>


          <div className="organization-stat">

            <div className="stat-icon neutral">
              ◷
            </div>

            <div>
              <strong>—</strong>
              <span>Completed</span>
            </div>

          </div>

        </section>


        {/* Main Dashboard Grid */}
        <section className="organization-grid">

          {/* Requests */}
          <div className="organization-requests-card">

            <div className="organization-card-header">

              <div>
                <span>COORDINATION</span>
                <h2>Blood Requests</h2>
              </div>

              <Link to="/requests">
                View All →
              </Link>

            </div>


            <div className="organization-empty">

              <div className="organization-empty-icon">
                +
              </div>

              <h3>
                No requests to display
              </h3>

              <p>
                Blood requests available for your organization
                will appear here after the platform is connected
                to the backend.
              </p>

              <Link to="/requests">
                Browse Requests
              </Link>

            </div>

          </div>


          {/* Right Column */}
          <div className="organization-right-column">

            {/* Availability */}
            <div className="organization-availability-card">

              <div className="small-card-header">

                <div>
                  <span>ORGANIZATION STATUS</span>
                  <h3>Availability</h3>
                </div>

                <div className="availability-dot"></div>

              </div>

              <p>
                Keep your organization's availability updated
                so coordination requests can be handled
                efficiently.
              </p>

              <div className="availability-status">

                <span className="status-circle"></span>

                <div>
                  <strong>Status not configured</strong>
                  <small>
                    Backend connection required
                  </small>
                </div>

              </div>

              <Link to="/organization-availability">
                Manage Availability →
              </Link>

            </div>


            {/* Activity */}
            <div className="organization-activity-card">

              <div className="small-card-header">

                <div>
                  <span>RECENT ACTIVITY</span>
                  <h3>Activity</h3>
                </div>

              </div>

              <div className="activity-empty">

                <span>◷</span>

                <p>
                  Your organization's coordination activity
                  will appear here.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* Bottom Section */}
        <section className="organization-bottom-grid">

          <div className="organization-response-card">

            <div className="organization-card-header">

              <div>
                <span>RESPONSE MANAGEMENT</span>
                <h2>Response Activity</h2>
              </div>

              <Link to="/organization-responses">
                View Responses →
              </Link>

            </div>

            <div className="response-empty">

              <div className="response-empty-icon">
                ↔
              </div>

              <div>
                <h3>No response activity yet</h3>

                <p>
                  Responses to blood requests will be shown here
                  when coordination begins.
                </p>
              </div>

            </div>

          </div>


          <div className="organization-profile-card">

            <span>ORGANIZATION PROFILE</span>

            <h3>
              Complete your organization profile
            </h3>

            <p>
              Add organization details and contact information
              to help other users coordinate with you.
            </p>

            <Link to="/profile">
              View Profile →
            </Link>

          </div>

        </section>


        {/* Notice */}
        <div className="organization-notice">

          <strong>Important:</strong>

          <span>
            JeevaPulse is a coordination platform. Medical
            decisions, donor eligibility and blood compatibility
            must be verified by qualified healthcare
            professionals and authorized organizations.
          </span>

        </div>

      </main>

    </div>
  );
}

export default OrganizationDashboard;