/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminServiceUpdate = () => {
  const [data, setData] = useState({
    serviceName: "",
    description: "",
    price: "",
    url: "",
    provider: "",
    duration: "", // Added duration field
  });

  const params = useParams();
  const { authorizationToken } = useAuth();

  // Get single service data
  const getSingleServiceData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch service data");
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  }, [params.id, authorizationToken]);

  useEffect(() => {
    getSingleServiceData();
  }, [getSingleServiceData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update the service data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/update/${params.id}`,
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
        toast.success("Service updated successfully");
      } else {
        toast.error("Service update failed");
      }
    } catch (error) {
      console.error("Error updating service data:", error);
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update Service Data</h1>
      </div>
      <div className="container grid grid-two-cols">
        <section className="section-form">
          <form onSubmit={handleSubmit} className="update-form">

            <div>
              <label htmlFor="imageUrl">Image URL</label>
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

            <div>
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

            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                autoComplete="off"
                value={data.description}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                autoComplete="off"
                value={data.price}
                onChange={handleInput}
                required
              />
            </div>

            <div>
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

            {/* New field for duration */}
            <div>
              <label htmlFor="duration">Duration (e.g.- "5D/4N")</label>
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
              <button type="submit" className="btn-submit">Update</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
