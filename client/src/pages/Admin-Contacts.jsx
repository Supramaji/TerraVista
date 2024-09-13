import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactsData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();
      console.log("contact data: ", data);
      setContactData(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }, [authorizationToken]);

  const deleteContactById = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/contacts/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: authorizationToken,
            },
          }
        );

        if (!response.ok) {
          toast.error("Not Deleted");
          throw new Error("Failed to delete");
        }

        toast.success("Deleted successfully");
        getContactsData();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [authorizationToken, getContactsData]
  );

  useEffect(() => {
    getContactsData();
  }, [getContactsData]);

  return (
    <section className="container100">
      <h1>Admin Contact Data</h1>

      <div className="container100admin-users">
        {contactData.map((curContactData) => {
          console.log(curContactData);
          const { username, email, phone, message, _id } = curContactData;

          return (
            <div key={_id}>
              <p>{username}</p>
              <p>{email}</p>
              <p>{phone}</p>
              <p>{message}</p>
              <button className="btn" onClick={() => deleteContactById(_id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
