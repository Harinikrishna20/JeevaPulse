import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-label">EMERGENCY BLOOD COORDINATION</p>

          <h1>
            Every Second
            <span> Matters.</span>
          </h1>

          <p className="hero-description">
            JeevaPulse helps people coordinate emergency blood requests
            with potential donors and participating blood organizations.
          </p>

          <div className="hero-buttons">
            <Link to="/need-blood" className="primary-button">
              Need Blood
            </Link>

            <Link to="/register" className="secondary-button">
              Become a Donor
            </Link>
          </div>

        </div>

        <div className="emergency-card">

          <div className="card-icon">♥</div>

          <p className="card-label">EMERGENCY REQUEST</p>

          <h3>Someone needs your help.</h3>

          <p>
            Create a blood request and connect with available support
            sources in your area.
          </p>

          <Link to="/need-blood" className="card-button">
            Create Request →
          </Link>

        </div>

      </section>


      {/* Quick Access */}
      <section className="quick-section">

        <div className="section-heading">
          <p>QUICK ACCESS</p>
          <h2>How can we help?</h2>
        </div>

        <div className="quick-grid">

          <Link to="/need-blood" className="quick-card">
            <div className="quick-icon red">+</div>
            <h3>Need Blood</h3>
            <p>
              Create an emergency blood request and find potential support.
            </p>
            <span>Request Blood →</span>
          </Link>

          <Link to="/requests" className="quick-card">
            <div className="quick-icon dark">⌕</div>
            <h3>Find Requests</h3>
            <p>
              Explore active requests that need donor coordination.
            </p>
            <span>View Requests →</span>
          </Link>

          <Link to="/register" className="quick-card">
            <div className="quick-icon green">♥</div>
            <h3>Become a Donor</h3>
            <p>
              Join the network and respond to blood requests.
            </p>
            <span>Join Network →</span>
          </Link>

        </div>

      </section>


      {/* How It Works */}
      <section className="how-section">

        <div className="section-heading">
          <p>HOW JEEVAPULSE WORKS</p>
          <h2>From request to coordination.</h2>
        </div>

        <div className="steps-grid">

          <div className="step">
            <div className="step-number">01</div>
            <h3>Create Request</h3>
            <p>
              Enter the blood group, required units, hospital and urgency.
            </p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Discover Support</h3>
            <p>
              Find potential donors and participating organizations.
            </p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Coordinate</h3>
            <p>
              Communicate with the available support source and coordinate.
            </p>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <h3>Track Status</h3>
            <p>
              Follow the request from pending to confirmed and fulfilled.
            </p>
          </div>

        </div>

      </section>


      {/* Why JeevaPulse */}
      <section className="why-section">

        <div className="why-content">

          <p className="hero-label">WHY JEEVAPULSE?</p>

          <h2>
            More than finding a donor.
          </h2>

          <p>
            JeevaPulse focuses on the complete emergency coordination
            process instead of simply displaying a list of donors.
          </p>

        </div>

        <div className="why-list">

          <div className="why-item">
            <span>01</span>
            <div>
              <h3>Request Tracking</h3>
              <p>Track the progress of every blood request.</p>
            </div>
          </div>

          <div className="why-item">
            <span>02</span>
            <div>
              <h3>Support Discovery</h3>
              <p>Identify potential donors and organizations.</p>
            </div>
          </div>

          <div className="why-item">
            <span>03</span>
            <div>
              <h3>Coordination</h3>
              <p>Keep communication and responses connected to the request.</p>
            </div>
          </div>

        </div>

      </section>


      {/* Final CTA */}
      <section className="cta-section">

        <p>JOIN THE JEEVAPULSE NETWORK</p>

        <h2>
          Be part of a faster
          <br />
          emergency response.
        </h2>

        <Link to="/register" className="cta-button">
          Join JeevaPulse →
        </Link>

      </section>

    </div>
  );
}

export default Home;