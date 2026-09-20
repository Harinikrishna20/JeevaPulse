import { Link } from "react-router-dom";
import "./Requests.css";

function Requests() {
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

          <select defaultValue="">
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
          />
        </div>


        <div className="filter-group">
          <label>Urgency</label>

          <select defaultValue="">
            <option value="">All Urgency Levels</option>
            <option value="Emergency">Emergency</option>
            <option value="Urgent">Urgent</option>
            <option value="Planned">Planned</option>
          </select>
        </div>

      </section>


      {/* Request Area */}
      <section className="requests-empty">

        <div className="empty-icon">
          🩸
        </div>

        <h2>No active requests</h2>

        <p>
          Blood requests created by users will appear here.
          There are currently no requests available.
        </p>

        <Link
          to="/need-blood"
          className="empty-button"
        >
          Create a Blood Request
        </Link>

      </section>


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