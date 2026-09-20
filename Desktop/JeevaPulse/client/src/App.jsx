import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import NeedBlood from "./pages/NeedBlood";
import Requests from "./pages/Requests";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestDetails from "./pages/RequestDetails";

import RequesterDashboard from "./pages/RequesterDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import OrganizationDashboard from "./pages/OrganizationDashboard";

import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import MyResponses from "./pages/MyResponses";
import Availability from "./pages/Availability";


function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Pages */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/requests"
          element={<Requests />}
        />

        <Route
          path="/requests/:id"
          element={<RequestDetails />}
        />

        <Route
          path="/need-blood"
          element={<NeedBlood />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Requester */}

        <Route
          path="/requester-dashboard"
          element={<RequesterDashboard />}
        />


        {/* Donor */}

        <Route
          path="/donor-dashboard"
          element={<DonorDashboard />}
        />

        <Route
          path="/my-responses"
          element={<MyResponses />}
        />

        <Route
          path="/availability"
          element={<Availability />}
        />


        {/* Organization */}

        <Route
          path="/organization-dashboard"
          element={<OrganizationDashboard />}
        />


        {/* Common */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

      </Routes>
    </>
  );
}

export default App;