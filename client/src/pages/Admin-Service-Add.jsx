/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminServiceAdd = () => {
  const [data, setData] = useState({
    url: "",
    serviceName: "",
    description: "",
    price: "",
    provider: "",
    duration: "", // Added duration field
  });
  const [loading, setLoading] = useState(false);

  const { authorizationToken } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (data.price <= 0) {
      toast.error("Price must be a positive number");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Service added successfully");
        navigate("/admin/services");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("An error occurred while adding the service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Add New Service</h1>
      </div>
      <div className="container grid grid-two-cols">
        <section className="section-form">
          <form onSubmit={handleSubmit} className="add-service-form">
            <div className="form-group">
              <label htmlFor="url">Image URL</label>
              <input
                type="text"
                name="url"
                id="url"
                autoComplete="off"
                value={data.url}
                onChange={handleInput}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="serviceName">Service Name</label>
              <input
                type="text"
                name="serviceName"
                id="serviceName"
                autoComplete="off"
                value={data.serviceName}
                onChange={handleInput}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                autoComplete="off"
                value={data.description}
                onChange={handleInput}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                autoComplete="off"
                value={data.price}
                onChange={handleInput}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="provider">Service Provider</label>
              <input
                type="text"
                name="provider"
                id="provider"
                autoComplete="off"
                value={data.provider}
                onChange={handleInput}
                required
              />
            </div>

            {/* New duration field */}
            <div className="form-group">
              <label htmlFor="duration">Duration (e.g.- 5D/4N")</label>
              <input
                type="text"
                name="duration"
                id="duration"
                autoComplete="off"
                value={data.duration}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Adding..." : "Add Service"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
