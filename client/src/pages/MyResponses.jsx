import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyResponses.css";

function MyResponses() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadResponses = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/responses/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResponses(response.data?.data || []);
      } catch (requestError) {
        if (requestError.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setError(
          requestError.response?.data?.message ||
            "Unable to load your responses."
        );
      } finally {
        setLoading(false);
      }
    };

    loadResponses();
  }, [navigate, token]);

  const pendingResponses = responses.filter((response) => response.status === "PENDING").length;
  const acceptedResponses = responses.filter((response) => response.status === "ACCEPTED").length;
  const completedResponses = responses.filter((response) => response.bloodRequest?.status === "FULFILLED").length;

  return (
    <div className="responses-page">

      {/* Header */}
      <section className="responses-header">
        <div>
          <p>DONOR COORDINATION</p>
          <h1>My Responses</h1>
          <span>
            Track the blood requests you have responded to and their
            coordination status.
          </span>
        </div>

        <Link to="/requests" className="responses-header-button">
          Find Requests →
        </Link>
      </section>


      {/* Stats */}
      <section className="responses-stats">

        <div className="response-stat">
          <span className="response-stat-number">{responses.length}</span>
          <span className="response-stat-label">Responses Sent</span>
        </div>

        <div className="response-stat">
          <span className="response-stat-number">{pendingResponses}</span>
          <span className="response-stat-label">Pending</span>
        </div>

        <div className="response-stat">
          <span className="response-stat-number">{acceptedResponses}</span>
          <span className="response-stat-label">Confirmed</span>
        </div>

        <div className="response-stat">
          <span className="response-stat-number">{completedResponses}</span>
          <span className="response-stat-label">Completed</span>
        </div>

      </section>


      {/* Main content */}
      <section className="responses-content">

        <div className="responses-main-card">

          <div className="responses-card-header">
            <div>
              <p>COORDINATION HISTORY</p>
              <h2>My Response Activity</h2>
            </div>

            <Link to="/requests">
              Browse Requests
            </Link>
          </div>


          {error && <p className="responses-error">{error}</p>}

          {loading ? (
            <div className="responses-empty">
              <h3>Loading responses...</h3>
            </div>
          ) : responses.length === 0 ? (
            <div className="responses-empty">

              <div className="responses-empty-icon">
                ↔
              </div>

              <h3>No responses yet</h3>

              <p>
                When you respond to a blood request, your response
                and coordination status will appear here.
              </p>

              <Link
                to="/requests"
                className="responses-browse-button"
              >
                Find Blood Requests
              </Link>

            </div>
          ) : (
            <div className="responses-list">
              {responses.map((response) => (
                <article className="response-record" key={response._id}>
                  <div>
                    <p>{response.bloodRequest?.bloodGroup} · {response.bloodRequest?.hospitalName}</p>
                    <h3>{response.bloodRequest?.location}</h3>
                    <small>{response.message || "No message provided"}</small>
                  </div>
                  <strong>{response.status}</strong>
                </article>
              ))}
            </div>
          )}

        </div>


        {/* Side card */}
        <aside className="responses-side">

          <div className="response-process-card">

            <p>RESPONSE PROCESS</p>

            <h3>What happens after you respond?</h3>

            <div className="response-process-item">
              <span>01</span>
              <div>
                <strong>Response Sent</strong>
                <small>Your response is recorded for the request.</small>
              </div>
            </div>

            <div className="response-process-item">
              <span>02</span>
              <div>
                <strong>Coordination</strong>
                <small>The requester can coordinate with you.</small>
              </div>
            </div>

            <div className="response-process-item">
              <span>03</span>
              <div>
                <strong>Confirmation</strong>
                <small>Support can be confirmed through coordination.</small>
              </div>
            </div>

            <div className="response-process-item">
              <span>04</span>
              <div>
                <strong>Completed</strong>
                <small>The request can be marked as fulfilled.</small>
              </div>
            </div>

          </div>


          <div className="responses-profile-card">

            <p>DONOR PROFILE</p>

            <h3>Keep your information updated.</h3>

            <span>
              Your profile information helps the platform
              coordinate relevant requests.
            </span>

            <Link to="/profile">
              View Profile →
            </Link>

          </div>

        </aside>

      </section>


      {/* Safety notice */}
      <div className="responses-notice">

        <strong>Important:</strong>

        <span>
          Responding to a request does not mean medical eligibility
          or blood compatibility has been confirmed. These decisions
          must be verified by qualified healthcare professionals.
        </span>

      </div>

    </div>
  );
}

export default MyResponses;