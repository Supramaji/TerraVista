import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  const params = useParams();
  const { authorizationToken } = useAuth();

  // Get single user data
  const getSingleUserData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [params.id, authorizationToken]);

  useEffect(() => {
    getSingleUserData();
  }, [getSingleUserData]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Update the user data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Updated successfully");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Inline styles for checkbox
  const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const checkboxLabelStyle = {
    marginRight: "10px",
    fontWeight: "normal",
  };

  const checkboxInputStyle = {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update User Data</h1>
      </div>
      {/* Main form content */}
      <div className="container grid grid-two-cols">
        <section className="section-form">
          <form onSubmit={handleSubmit} className="update-form">
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="phone">Mobile</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="off"
                value={data.phone}
                onChange={handleInput}
                required
              />
            </div>

            <div style={checkboxContainerStyle}>
              <label htmlFor="isAdmin" style={checkboxLabelStyle}>Admin</label>
              <input
                type="checkbox"
                name="isAdmin"
                id="isAdmin"
                checked={data.isAdmin}
                onChange={handleInput}
                style={checkboxInputStyle}
              />
            </div>

            <div>
              <button type="submit" className="btn-submit">Update</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
