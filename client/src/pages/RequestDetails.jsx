import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./RequestDetails.css";

function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/requests/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRequest(response.data?.data || null);
      } catch (requestError) {
        if (requestError.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setError(
          requestError.response?.data?.message ||
            "Unable to load this blood request."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [id, navigate]);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "Not provided";

  return (
    <div className="request-details-page">

      {/* Header */}

      <section className="request-details-header">

        <div>
          <p>JEEVAPULSE REQUEST</p>

          <h1>Blood Request Details</h1>

          <span>
            View request information and coordinate support.
          </span>
        </div>

        <Link
          to="/requests"
          className="back-requests-button"
        >
          ← Back to Requests
        </Link>

      </section>


      {/* Request Content */}

      <section className="request-details-layout">

        {/* Main Card */}

        <div className="request-main-card">

          <div className="request-loading-state">

            <div className="request-detail-icon">
              🩸
            </div>

            {loading ? (
              <h2>Loading request details...</h2>
            ) : error ? (
              <>
                <p className="request-detail-label">REQUEST</p>
                <h2>{error}</h2>
              </>
            ) : request ? (
              <>
                <p className="request-detail-label">{request.status}</p>
                <h2>{request.patientName} needs {request.bloodGroup} blood</h2>

                <div className="request-detail-grid">
                  <div>
                    <span>Blood group</span>
                    <strong>{request.bloodGroup}</strong>
                  </div>
                  <div>
                    <span>Units required</span>
                    <strong>{request.unitsRequired}</strong>
                  </div>
                  <div>
                    <span>Urgency</span>
                    <strong>{request.urgency}</strong>
                  </div>
                  <div>
                    <span>Required date</span>
                    <strong>{formatDate(request.requiredDate)}</strong>
                  </div>
                  <div>
                    <span>Hospital</span>
                    <strong>{request.hospitalName}</strong>
                  </div>
                  <div>
                    <span>Location</span>
                    <strong>{request.location}</strong>
                  </div>
                  <div>
                    <span>Contact number</span>
                    <strong>{request.contactNumber}</strong>
                  </div>
                  <div>
                    <span>Requester</span>
                    <strong>{request.requester?.name || "Not provided"}</strong>
                  </div>
                </div>

                {request.additionalDetails && (
                  <p className="request-additional-details">
                    <strong>Additional details:</strong> {request.additionalDetails}
                  </p>
                )}
              </>
            ) : (
              <h2>Request not found</h2>
            )}

          </div>

        </div>


        {/* Side Card */}

        <aside className="request-side-card">

          <p>REQUEST ID</p>

          <div className="request-id-box">
            {id}
          </div>

          <div className="side-divider"></div>

          <h3>How coordination works</h3>

          <div className="coordination-step">

            <span>01</span>

            <div>
              <strong>Review</strong>
              <p>
                Check the request information.
              </p>
            </div>

          </div>


          <div className="coordination-step">

            <span>02</span>

            <div>
              <strong>Respond</strong>
              <p>
                Potential support sources can respond.
              </p>
            </div>

          </div>


          <div className="coordination-step">

            <span>03</span>

            <div>
              <strong>Coordinate</strong>
              <p>
                Requester and support source coordinate.
              </p>
            </div>

          </div>


          <div className="coordination-step">

            <span>04</span>

            <div>
              <strong>Track</strong>
              <p>
                Follow the request status.
              </p>
            </div>

          </div>

        </aside>

      </section>


      {/* Safety Notice */}

      <div className="request-detail-notice">

        <strong>Important:</strong>

        <span>
          JeevaPulse provides coordination support only.
          Medical eligibility and blood compatibility must be
          verified by qualified healthcare professionals.
        </span>

      </div>

    </div>
  );
}

export default RequestDetails;