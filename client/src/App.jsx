import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NeedBlood from "./pages/NeedBlood";
import MyBloodRequests from "./pages/MyBloodRequests";
import Requests from "./pages/Requests";
import RequestDetails from "./pages/RequestDetails";
import Notifications from "./pages/Notifications";
import MyResponses from "./pages/MyResponses";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/need-blood"
          element={<NeedBlood />}
        />

        <Route
          path="/my-blood-requests"
          element={<MyBloodRequests />}
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
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/my-responses"
          element={<MyResponses />}
        />
      </Routes>
    </>
  );
}

export default App;