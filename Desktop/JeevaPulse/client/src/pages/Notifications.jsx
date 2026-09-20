import { Link } from "react-router-dom";
import "./Notifications.css";

function Notifications() {
  return (
    <div className="notifications-page">

      <div className="notifications-header">

        <div>
          <p>JEEVAPULSE UPDATES</p>
          <h1>Notifications</h1>
          <span>
            Stay updated about your requests, responses and coordination.
          </span>
        </div>

        <Link to="/" className="notifications-home-button">
          ← Home
        </Link>

      </div>


      <div className="notifications-layout">

        {/* Main notifications */}
        <section className="notifications-card">

          <div className="notifications-card-header">

            <div>
              <span>RECENT UPDATES</span>
              <h2>Your Notifications</h2>
            </div>

            <button className="mark-read-button">
              Mark all as read
            </button>

          </div>


          <div className="notifications-empty">

            <div className="notifications-empty-icon">
              ♢
            </div>

            <h3>
              No notifications yet
            </h3>

            <p>
              Updates about blood requests, responses and
              coordination activity will appear here.
            </p>

          </div>

        </section>


        {/* Side information */}
        <aside className="notification-info">

          <div className="notification-info-card">

            <p>WHAT YOU'LL RECEIVE</p>

            <h2>
              Important updates in one place.
            </h2>

            <div className="notification-type">

              <span className="notification-type-icon">
                +
              </span>

              <div>
                <strong>Request Updates</strong>
                <p>
                  Changes to the status of your blood requests.
                </p>
              </div>

            </div>


            <div className="notification-type">

              <span className="notification-type-icon">
                ↔
              </span>

              <div>
                <strong>Response Updates</strong>
                <p>
                  Information about responses and coordination.
                </p>
              </div>

            </div>


            <div className="notification-type">

              <span className="notification-type-icon">
                ✓
              </span>

              <div>
                <strong>Confirmation Updates</strong>
                <p>
                  Updates when coordination progresses.
                </p>
              </div>

            </div>

          </div>


          <div className="notification-help-card">

            <span>NEED HELP?</span>

            <h3>
              Understand how JeevaPulse works.
            </h3>

            <p>
              Learn how requests, responses and coordination
              work on the platform.
            </p>

            <Link to="/how-it-works">
              How It Works →
            </Link>

          </div>

        </aside>

      </div>


      <div className="notifications-notice">

        <strong>Important:</strong>

        <span>
          Notifications are informational. Medical eligibility
          and blood compatibility are not determined by
          JeevaPulse.
        </span>

      </div>

    </div>
  );
}

export default Notifications;