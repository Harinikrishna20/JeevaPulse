import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1>JeevaPulse Dashboard</h1>

          <p>
            {user?.name
              ? `Welcome, ${user.name}`
              : "Welcome to JeevaPulse"}
          </p>
        </div>

        <div className="dashboard-cards">

          <Link
            to="/profile"
            className="dashboard-card"
          >
            <h2>My Profile</h2>

            <p>
              View and update your personal information.
            </p>
          </Link>

          <Link
            to="/need-blood"
            className="dashboard-card"
          >
            <h2>Need Blood</h2>

            <p>
              Create a blood request when blood support
              is required.
            </p>
          </Link>

          <Link
            to="/my-blood-requests"
            className="dashboard-card"
          >
            <h2>My Blood Requests</h2>

            <p>
              View and manage your blood requests.
            </p>
          </Link>

          <Link
            to="/requests"
            className="dashboard-card"
          >
            <h2>Find Blood Requests</h2>

            <p>
              Find requests that may need donor support.
            </p>
          </Link>

          <Link
            to="/my-responses"
            className="dashboard-card"
          >
            <h2>My Responses</h2>

            <p>
              View your responses to blood requests.
            </p>
          </Link>

          <Link
            to="/notifications"
            className="dashboard-card"
          >
            <h2>Notifications</h2>

            <p>
              View your JeevaPulse notifications.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;