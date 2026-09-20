import { useState } from "react";
import "./NeedBlood.css";

function NeedBlood() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
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

          <div className="form-section">
            <h2>Blood Requirement</h2>

            <div className="form-row">

              <div className="form-group">
                <label>Blood Group</label>

                <select required>
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
                  min="1"
                  max="20"
                  placeholder="Example: 2"
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Urgency</label>

              <select required>
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
                placeholder="Enter hospital name"
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                placeholder="Example: Bengaluru"
                required
              />
            </div>

            <div className="form-group">
              <label>Required Date</label>

              <input
                type="date"
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
                placeholder="Enter contact number"
                required
              />
            </div>

            <div className="form-group">
              <label>Additional Information</label>

              <textarea
                rows="4"
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


          <button type="submit" className="submit-request">
            Create Blood Request
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