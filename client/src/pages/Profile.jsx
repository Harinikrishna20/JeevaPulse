import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    bloodGroup: "",
    availability: "",
  });

  const getAuthToken = () => localStorage.getItem("token");

  useEffect(() => {
    const token = getAuthToken();

    const getProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileUser =
          response.data?.data?.user;

        setUser(profileUser);

        localStorage.setItem(
          "user",
          JSON.stringify(profileUser)
        );
      } catch (error) {
        console.error(
          "Profile loading error:",
          error
        );

        if (
          error.response?.status === 401 ||
          error.response?.status === 404
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setError(
            "Unable to load your profile."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  const startEditing = () => {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      location: user.location || "",
      bloodGroup: user.bloodGroup || "",
      availability: user.availability || "",
    });
    setError("");
    setEditing(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const authToken = getAuthToken();

    if (!authToken) {
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    const trimmedData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      bloodGroup: formData.bloodGroup.trim(),
      availability: formData.availability || "",
    };

    if (!trimmedData.name || !trimmedData.phone || !trimmedData.location) {
      setError("Please complete all required profile fields before saving.");
      return;
    }

    setSaving(true);

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        trimmedData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const updatedUser = response.data?.data?.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEditing(false);
    } catch (updateError) {
      if (updateError.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      const message =
        updateError.response?.data?.message ||
        updateError.message ||
        "Unable to update your profile.";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-container">

        <div className="profile-heading">
          <h1>My Profile</h1>

          {!editing && user && (
            <button type="button" onClick={startEditing}>
              Edit Profile
            </button>
          )}
        </div>

        {error && <p className="profile-error">{error}</p>}

        {editing ? (
          <form className="profile-card profile-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" value={formData.name} onChange={handleChange} required />
            </label>

            <label>
              Email
              <input value={user.email || ""} readOnly />
            </label>

            <label>
              Phone
              <input name="phone" value={formData.phone} onChange={handleChange} required />
            </label>

            <label>
              Location
              <input name="location" value={formData.location} onChange={handleChange} required />
            </label>

            <label>
              Blood Group
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
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
            </label>

            <label>
              Availability
              <select name="availability" value={formData.availability} onChange={handleChange}>
                <option value="">Not available</option>
                <option value="AVAILABLE">Available</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>
            </label>

            <div className="profile-form-actions">
              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : user && (
          <div className="profile-card">

            <div className="profile-item">
              <strong>Name</strong>
              <span>
                {user.name || "Not provided"}
              </span>
            </div>

            <div className="profile-item">
              <strong>Email</strong>
              <span>
                {user.email || "Not provided"}
              </span>
            </div>

            <div className="profile-item">
              <strong>Phone</strong>
              <span>
                {user.phone || "Not provided"}
              </span>
            </div>

            <div className="profile-item">
              <strong>Location</strong>
              <span>
                {user.location || "Not provided"}
              </span>
            </div>

            <div className="profile-item">
              <strong>Blood Group</strong>
              <span>
                {user.bloodGroup || "Not provided"}
              </span>
            </div>

            <div className="profile-item">
              <strong>Donor Status</strong>
              <span>
                {user.isDonor
                  ? "Registered Donor"
                  : "Not a Donor"}
              </span>
            </div>

            <div className="profile-item">
              <strong>Availability</strong>
              <span>
                {user.availability ||
                  "Not available"}
              </span>
            </div>

            <div className="profile-item">
              <strong>Role</strong>
              <span>
                {user.role === "organization"
                  ? "Organization"
                  : "Donor"}
              </span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Profile;