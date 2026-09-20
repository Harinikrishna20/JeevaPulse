import { Link, useParams } from "react-router-dom";
import "./RequestDetails.css";

function RequestDetails() {
  const { id } = useParams();

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

            <p className="request-detail-label">
              REQUEST
            </p>

            <h2>
              Request details will appear here
            </h2>

            <p>
              This page is ready to display the request identified
              by <strong>{id}</strong> once the backend provides
              the actual request information.
            </p>

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