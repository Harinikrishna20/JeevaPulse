import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Notifications.css";

function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadNotifications = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotifications(response.data?.data || []);
      } catch (requestError) {
        if (requestError.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setError(
          requestError.response?.data?.message ||
            "Unable to load notifications."
        );
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [navigate, token]);

  const markAllAsRead = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/notifications/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to update notifications."
      );
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/notifications/${notificationId}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((previousNotifications) =>
        previousNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to update this notification."
      );
    }
  };

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

            <button
              className="mark-read-button"
              type="button"
              onClick={markAllAsRead}
              disabled={notifications.length === 0}
            >
              Mark all as read
            </button>

          </div>


          {error && <p className="notifications-error">{error}</p>}

          {loading ? (
            <div className="notifications-empty">
              <h3>Loading notifications...</h3>
            </div>
          ) : notifications.length === 0 ? (
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
          ) : (
            <div className="notifications-list">
              {notifications.map((notification) => (
                <article
                  className={`notification-item ${notification.isRead ? "is-read" : "is-unread"}`}
                  key={notification._id}
                >
                  <div>
                    <p className="notification-item-type">{notification.type.replaceAll("_", " ")}</p>
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                    <small>
                      {new Date(notification.createdAt).toLocaleString()}
                    </small>
                  </div>

                  {!notification.isRead && (
                    <button
                      type="button"
                      onClick={() => markAsRead(notification._id)}
                    >
                      Mark read
                    </button>
                  )}
                </article>
              ))}
            </div>
          )}

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