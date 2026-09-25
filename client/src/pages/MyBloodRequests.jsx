import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyBloodRequests.css";

const API_URL = "http://localhost:5000/api/requests";

function MyBloodRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadRequests = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRequests(response.data?.data || []);
      } catch (requestError) {
        if (requestError.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setError(
          requestError.response?.data?.message ||
            "Unable to load your blood requests."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [navigate, token]);

  const handleDelete = async (requestId) => {
    if (!window.confirm("Delete this blood request?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests((previousRequests) =>
        previousRequests.filter((request) => request._id !== requestId)
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to delete this blood request."
      );
    }
  };

  if (loading) {
    return (
      <main className="my-requests-page">
        <div className="my-requests-container">
          <p className="my-requests-state">Loading your requests...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="my-requests-page">
      <div className="my-requests-container">
        <section className="my-requests-header">
          <div>
            <p className="my-requests-label">REQUEST MANAGEMENT</p>
            <h1>My Blood Requests</h1>
            <p>Track and manage the blood requests you have created.</p>
          </div>

          <Link to="/need-blood" className="my-requests-primary-button">
            + New Request
          </Link>
        </section>

        {error && <p className="my-requests-error">{error}</p>}

        {requests.length === 0 ? (
          <section className="my-requests-empty">
            <div className="my-requests-empty-icon">+</div>
            <h2>No blood requests yet</h2>
            <p>Create a request when you need blood support.</p>
            <Link to="/need-blood" className="my-requests-secondary-button">
              Create Your First Request
            </Link>
          </section>
        ) : (
          <section className="my-requests-list" aria-label="Your blood requests">
            {requests.map((request) => (
              <article className="my-request-card" key={request._id}>
                <div className="my-request-card-header">
                  <div>
                    <p className="my-request-blood-group">
                      {request.bloodGroup} <span>· {request.unitsRequired} units</span>
                    </p>
                    <h2>{request.hospitalName}</h2>
                  </div>
                  <span className={`request-status status-${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </div>

                <div className="my-request-details">
                  <span>{request.location}</span>
                  <span>{request.urgency}</span>
                  <span>{new Date(request.requiredDate).toLocaleDateString()}</span>
                </div>

                <div className="my-request-actions">
                  <Link to={`/requests/${request._id}`}>View details</Link>
                  <button type="button" onClick={() => handleDelete(request._id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default MyBloodRequests;
