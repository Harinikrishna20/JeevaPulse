import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyBloodRequests.css";

const API_URL = "http://localhost:5000/api/requests";

function MyBloodRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [responsesByRequest, setResponsesByRequest] = useState({});
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

        const requestList = response.data?.data || [];
        const responseEntries = await Promise.all(
          requestList.map(async (request) => {
            const responseList = await axios.get(
              `http://localhost:5000/api/responses/request/${request._id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            return [request._id, responseList.data?.data || []];
          })
        );

        setResponsesByRequest(Object.fromEntries(responseEntries));
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

  const updateResponse = async (responseId, action) => {
    try {
      await axios.put(
        `http://localhost:5000/api/responses/${responseId}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.location.reload();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          `Unable to ${action} this response.`
      );
    }
  };

  const markRequestFulfilled = async (requestId) => {
    try {
      await axios.put(
        `${API_URL}/${requestId}/status`,
        { status: "FULFILLED" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRequests((previousRequests) =>
        previousRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: "FULFILLED" }
            : request
        )
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to mark this request as fulfilled."
      );
    }
  };

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
                  {request.status !== "FULFILLED" && (
                    <button
                      type="button"
                      onClick={() => markRequestFulfilled(request._id)}
                    >
                      Mark fulfilled
                    </button>
                  )}
                  <button type="button" onClick={() => handleDelete(request._id)}>
                    Delete
                  </button>
                </div>

                {(responsesByRequest[request._id] || []).length > 0 && (
                  <div className="request-responses">
                    <h3>Donor responses</h3>
                    {responsesByRequest[request._id].map((response) => (
                      <div className="request-response" key={response._id}>
                        <div>
                          <strong>{response.donor?.name || "Donor"}</strong>
                          <span>
                            {response.donor?.bloodGroup || "Blood group not provided"}
                          </span>
                          <small>{response.message || "No message provided"}</small>
                        </div>
                        <div className="request-response-actions">
                          <span className={`response-status response-status-${response.status.toLowerCase()}`}>
                            {response.status}
                          </span>
                          {response.status === "PENDING" && (
                            <>
                              <button type="button" onClick={() => updateResponse(response._id, "accept")}>
                                Accept
                              </button>
                              <button type="button" onClick={() => updateResponse(response._id, "reject")}>
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default MyBloodRequests;
