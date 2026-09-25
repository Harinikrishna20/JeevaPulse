import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NeedBlood.css";

function NeedBlood() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const formValues = Object.fromEntries(
      new FormData(event.currentTarget)
    );

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/requests",
        {
          ...formValues,
          unitsRequired: Number(formValues.unitsRequired),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubmitted(true);
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      setError(
        requestError.response?.data?.message ||
          "Unable to create the blood request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="need-blood-page">

      <div className="need-blood-header">
        <p>EMERGENCY BLOOD REQUEST</p>
        <h1>Need Blood?</h1>
        <span>
          Provide the required details so potential support sources can
          coordinate with you.
        </span>
      </div>

      {!submitted ? (
        <form className="blood-form" onSubmit={handleSubmit}>

          {error && <p className="form-error">{error}</p>}

          <div className="form-section">
            <h2>Blood Requirement</h2>

            <div className="form-group">
              <label>Patient Name</label>

              <input
                type="text"
                name="patientName"
                placeholder="Enter patient name"
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Blood Group</label>

                <select name="bloodGroup" required>
                  <option value="">Select blood group</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div className="form-group">
                <label>Units Required</label>

                <input
                  type="number"
                  name="unitsRequired"
                  min="1"
                  max="20"
                  placeholder="Example: 2"
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Urgency</label>

              <select name="urgency" required>
                <option value="">Select urgency</option>
                <option>Emergency</option>
                <option>Urgent</option>
                <option>Planned</option>
              </select>
            </div>

          </div>


          <div className="form-section">
            <h2>Hospital & Location</h2>

            <div className="form-group">
              <label>Hospital Name</label>

              <input
                type="text"
                name="hospitalName"
                placeholder="Enter hospital name"
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                placeholder="Example: Bengaluru"
                required
              />
            </div>

            <div className="form-group">
              <label>Required Date</label>

              <input
                type="date"
                name="requiredDate"
                required
              />
            </div>

          </div>


          <div className="form-section">
            <h2>Contact Information</h2>

            <div className="form-group">
              <label>Contact Number</label>

              <input
                type="tel"
                name="contactNumber"
                placeholder="Enter contact number"
                required
              />
            </div>

            <div className="form-group">
              <label>Additional Information</label>

              <textarea
                rows="4"
                name="additionalDetails"
                placeholder="Add any important information about the request..."
              ></textarea>
            </div>

          </div>


          <div className="form-notice">
            <strong>Important:</strong>

            <span>
              JeevaPulse only helps coordinate requests and potential
              support sources. Medical eligibility and blood compatibility
              must be verified by qualified healthcare professionals.
            </span>
          </div>


          <button
            type="submit"
            className="submit-request"
            disabled={loading}
          >
            {loading ? "Creating Request..." : "Create Blood Request"}
          </button>

        </form>
      ) : (

        <div className="success-card">

          <div className="success-icon">✓</div>

          <p className="success-label">REQUEST CREATED</p>

          <h2>Your blood request has been created.</h2>

          <div className="request-id">
            <span>Request ID</span>
            <strong>BR1001</strong>
          </div>

          <div className="request-status">
            <span>Status</span>
            <strong>PENDING</strong>
          </div>

          <p>
            Your request can now be coordinated with potential donors
            and participating organizations.
          </p>

          <button
            className="new-request-button"
            onClick={() => setSubmitted(false)}
          >
            Create Another Request
          </button>

        </div>

      )}

    </div>
  );
}

export default NeedBlood;