import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Requests.css";

function Requests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadRequests = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
            "Unable to load blood requests."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [navigate, token]);

  const handleRespond = async (requestId) => {
    setResponseMessage("");

    try {
      await axios.post(
        "http://localhost:5000/api/responses",
        { bloodRequest: requestId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponseMessage("Your response was submitted successfully.");
    } catch (requestError) {
      setResponseMessage(
        requestError.response?.data?.message ||
          "Unable to submit your response."
      );
    }
  };

  const filteredRequests = requests.filter((request) => {
    const matchesBloodGroup = !bloodGroup || request.bloodGroup === bloodGroup;
    const matchesLocation = !location || request.location.toLowerCase().includes(location.toLowerCase());
    const matchesUrgency = !urgency || request.urgency === urgency;

    return matchesBloodGroup && matchesLocation && matchesUrgency;
  });

  return (
    <div className="requests-page">

      {/* Header */}
      <section className="requests-header">

        <div>
          <p>JEEVAPULSE NETWORK</p>

          <h1>Find Blood Requests</h1>

          <span>
            Find active blood requests and coordinate with people
            who need support.
          </span>
        </div>

        <Link
          to="/need-blood"
          className="request-blood-button"
        >
          + Need Blood
        </Link>

      </section>


      {/* Filters */}
      <section className="filter-section">

        <div className="filter-group">
          <label>Blood Group</label>

          <select value={bloodGroup} onChange={(event) => setBloodGroup(event.target.value)}>
            <option value="">All Blood Groups</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>


        <div className="filter-group">
          <label>Location</label>

          <input
            type="text"
            placeholder="Search location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>


        <div className="filter-group">
          <label>Urgency</label>

          <select value={urgency} onChange={(event) => setUrgency(event.target.value)}>
            <option value="">All Urgency Levels</option>
            <option value="Emergency">Emergency</option>
            <option value="Urgent">Urgent</option>
            <option value="Planned">Planned</option>
          </select>
        </div>

      </section>


      {/* Request Area */}
      {responseMessage && <p className="request-feedback">{responseMessage}</p>}

      {error && <p className="request-feedback request-error">{error}</p>}

      {loading ? (
        <section className="requests-empty">
          <h2>Loading blood requests...</h2>
        </section>
      ) : filteredRequests.length === 0 ? (
        <section className="requests-empty">
          <div className="empty-icon">🩸</div>
          <h2>No active requests</h2>
          <p>No blood requests match your current filters.</p>
          <Link to="/need-blood" className="empty-button">
            Create a Blood Request
          </Link>
        </section>
      ) : (
        <section className="requests-list">
          {filteredRequests.map((request) => (
            <article className="request-card" key={request._id}>
              <div className="request-card-header">
                <div>
                  <p className="request-blood-group">
                    {request.bloodGroup} · {request.unitsRequired} units
                  </p>
                  <h2>{request.hospitalName}</h2>
                </div>
                <strong className="request-card-status">{request.urgency}</strong>
              </div>

              <p className="request-card-details">
                {request.location} · Required {new Date(request.requiredDate).toLocaleDateString()}
              </p>

              <div className="request-card-actions">
                <Link to={`/requests/${request._id}`}>View details</Link>
                <button type="button" onClick={() => handleRespond(request._id)}>
                  Respond to Request
                </button>
              </div>
            </article>
          ))}
        </section>
      )}


      {/* Information */}
      <div className="request-information">

        <strong>Important:</strong>

        <span>
          JeevaPulse is a coordination platform. Medical eligibility
          and blood compatibility must be verified by qualified
          healthcare professionals.
        </span>

      </div>

    </div>
  );
}

export default Requests;