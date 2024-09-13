import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();

  // Debugging: Log services data to verify structure
  console.log("Services Data:", services);

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services.length > 0 ? (
          services.map((service, index) => {
            const { url, price, description, provider, serviceName, duration } =
              service;

            console.log("Service Element:", service); // Log individual element

            return (
              <div className="card" key={index}>
                <div className="card-img">
                  <img src={url} alt={serviceName} width="1200" />
                </div>

                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{provider}</p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: "bold",
                          marginRight: "1rem",
                        }}
                      >{`₹${price}`}</p>
                      <p
                        style={{
                          fontStyle: "italic",
                          color: "#555",
                          fontWeight: "bold",
                          fontSize: "1.557rem",
                        }}
                      >
                        {duration}
                      </p>
                    </div>
                  </div>
                  <h2>{serviceName}</h2>
                  <p>{description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No services available</p>
        )}
      </div>
    </section>
  );
};
