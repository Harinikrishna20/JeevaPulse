import { Link } from "react-router-dom";
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <div className="how-page">

      {/* Header */}
      <section className="how-hero">
        <p className="how-label">HOW JEEVAPULSE WORKS</p>

        <h1>
          From a request
          <span> to coordination.</span>
        </h1>

        <p>
          JeevaPulse connects people who need blood with potential donors
          and participating organizations through a structured coordination
          process.
        </p>
      </section>


      {/* Main Workflow */}
      <section className="workflow-section">

        <div className="section-title">
          <p>THE JEEVAPULSE FLOW</p>
          <h2>One request. One connected process.</h2>
        </div>

        <div className="workflow">

          <div className="workflow-step">
            <div className="workflow-number">01</div>

            <div className="workflow-content">
              <h3>Create a Request</h3>

              <p>
                A requester provides the blood group, required units,
                hospital, location, urgency and required date.
              </p>

              <span>REQUEST</span>
            </div>
          </div>


          <div className="workflow-line"></div>


          <div className="workflow-step">
            <div className="workflow-number">02</div>

            <div className="workflow-content">
              <h3>Discover Support</h3>

              <p>
                The platform helps identify potential donors and
                participating organizations relevant to the request.
              </p>

              <span>DISCOVERY</span>
            </div>
          </div>


          <div className="workflow-line"></div>


          <div className="workflow-step">
            <div className="workflow-number">03</div>

            <div className="workflow-content">
              <h3>Respond</h3>

              <p>
                Potential donors or participating organizations can
                respond to an active request.
              </p>

              <span>RESPONSE</span>
            </div>
          </div>


          <div className="workflow-line"></div>


          <div className="workflow-step">
            <div className="workflow-number">04</div>

            <div className="workflow-content">
              <h3>Coordinate</h3>

              <p>
                The requester and responding support source can
                communicate and coordinate the next steps.
              </p>

              <span>COORDINATION</span>
            </div>
          </div>


          <div className="workflow-line"></div>


          <div className="workflow-step">
            <div className="workflow-number">05</div>

            <div className="workflow-content">
              <h3>Track the Request</h3>

              <p>
                The requester can follow the progress of the request
                through its different statuses.
              </p>

              <span>TRACKING</span>
            </div>
          </div>


          <div className="workflow-line"></div>


          <div className="workflow-step">
            <div className="workflow-number">06</div>

            <div className="workflow-content">
              <h3>Fulfillment</h3>

              <p>
                Once the required support has been coordinated, the
                request can be marked as fulfilled.
              </p>

              <span>FULFILLMENT</span>
            </div>
          </div>

        </div>

      </section>


      {/* Status Section */}
      <section className="status-section">

        <div className="section-title">
          <p>REQUEST STATUS</p>

          <h2>
            Follow the journey of every request.
          </h2>
        </div>

        <div className="status-flow">

          <div className="status-item active">
            <div className="status-dot">✓</div>
            <h3>Pending</h3>
            <p>Request created</p>
          </div>

          <div className="status-connector"></div>

          <div className="status-item">
            <div className="status-dot">02</div>
            <h3>Matched</h3>
            <p>Potential support found</p>
          </div>

          <div className="status-connector"></div>

          <div className="status-item">
            <div className="status-dot">03</div>
            <h3>Confirmed</h3>
            <p>Support coordinated</p>
          </div>

          <div className="status-connector"></div>

          <div className="status-item">
            <div className="status-dot">04</div>
            <h3>Fulfilled</h3>
            <p>Request completed</p>
          </div>

        </div>

      </section>


      {/* For Different Users */}
      <section className="users-section">

        <div className="section-title">
          <p>BUILT FOR COORDINATION</p>

          <h2>
            Different users. One connected platform.
          </h2>
        </div>

        <div className="users-grid">

          <div className="user-card">

            <div className="user-icon red">
              +
            </div>

            <h3>People Who Need Blood</h3>

            <p>
              Create requests, provide required details, receive responses
              and track the progress of your request.
            </p>

            <Link to="/need-blood">
              Create a Request →
            </Link>

          </div>


          <div className="user-card">

            <div className="user-icon dark">
              ♥
            </div>

            <h3>Donors</h3>

            <p>
              Discover relevant requests, respond to requests and manage
              your availability on the platform.
            </p>

            <Link to="/register">
              Join as Donor →
            </Link>

          </div>


          <div className="user-card">

            <div className="user-icon green">
              +
            </div>

            <h3>Organizations</h3>

            <p>
              Participating blood organizations can respond to requests,
              report support availability and coordinate with requesters.
            </p>

            <Link to="/register">
              Join as Organization →
            </Link>

          </div>

        </div>

      </section>


      {/* Safety */}
      <section className="safety-section">

        <div className="safety-content">

          <p className="how-label">IMPORTANT</p>

          <h2>
            JeevaPulse coordinates.
            <br />
            Healthcare professionals verify.
          </h2>

          <p>
            JeevaPulse is a coordination platform. It does not determine
            medical eligibility for donation or make clinical blood
            compatibility decisions. Those decisions must be verified by
            qualified healthcare professionals.
          </p>

        </div>

      </section>


      {/* CTA */}
      <section className="how-cta">

        <p>READY TO JOIN THE NETWORK?</p>

        <h2>
          Help make emergency
          <br />
          coordination faster.
        </h2>

        <div className="how-cta-buttons">

          <Link to="/need-blood" className="cta-primary">
            Need Blood
          </Link>

          <Link to="/register" className="cta-secondary">
            Join JeevaPulse
          </Link>

        </div>

      </section>

    </div>
  );
}

export default HowItWorks;