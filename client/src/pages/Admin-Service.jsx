import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../store/auth";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();

  const getAllServicesData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/services`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }, [authorizationToken]);

  const deleteService = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Ensure the header is set correctly
            Authorization: authorizationToken,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to delete service:", errorData.message);
        throw new Error(errorData.message || "Failed to delete service");
      }

      const data = await response.json();
      console.log("Service deleted:", data);

      // Refresh the service list after deletion
      getAllServicesData();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  useEffect(() => {
    getAllServicesData();
  }, [getAllServicesData]);

  return (
    <section className="admin-services-section">
      <div className="container100">
        <h1>Admin Services Data</h1>
      </div>
      <div className="container admin-services">
        <table>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.serviceName}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
                <td>
                  <Link
                    to={`/admin/services/${service._id}/edit`}
                    className="update-link"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteService(service._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button 
          className="add-button" 
          onClick={() => navigate("/admin/services/add")} // Add button for adding new service
        >
          Add New Service
        </button>
      </div>
    </section>
  );
};
