import { Analytics } from "../components/Analytics";

export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the One Of the Best Tours And Travel Company</p>
              <h1>Welcome to TerraVista</h1>
              <p>
                Explore the world with us! TerraVista is your premier tours and
                travel companion, offering curated experiences and personalized
                itineraries to make your journeys unforgettable. From
                adventure-filled escapades to relaxing getaways, we will guide
                you every step of the way. Discover new destinations, immerse in
                diverse cultures, and create lifelong memories. With TerraVista,
                your dream vacation is just a click away. Let us embark on a
                journey together and make your travel dreams a reality!
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/Travel1.png"
                alt="travel together"
                width="800"
                height="800"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section  */}
      <Analytics />

      {/* 3rd section  */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <img
              src="/images/Travel2.png"
              alt="travel together"
              width="800"
              height="800"
            />
          </div>

          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to embark on a more enriching journey? Contact TerraVista
              today for a free consultation and let us discuss how we can help
              your travel dreams thrive with personalized tours and
              unforgettable experiences.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/services">
                <button className="btn secondary-btn">learn more</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
