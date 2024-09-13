import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";

export const About = () => {
  const { user } = useAuth();
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              {/* <p>We care to cure your Health</p> */}
              <p>
                Welcome
                {user ? ` ${user.username} to TerraVista.` : ` to TerraVista.`}
              </p>
              <h1>Why Choose TerraVista?</h1>
              <p>
                Expertise: Our team of passionate travel connoisseurs boasts
                in-depth knowledge and stays ahead of the curve with the latest
                industry insights, crafting extraordinary journeys that exceed
                your expectations.
              </p>
              <p>
                Personalization: We understand every traveler is unique, so we
                tailor our tours to meet your specific needs and preferences.
              </p>
              <p>
                Customer-Centric Approach: Your satisfaction is our priority,
                and we provide exceptional support to ensure a seamless travel
                experience.
              </p>
              <p>
                Affordability: We offer competitive pricing without compromising
                on the quality of our services, making your dream vacation a
                reality.
              </p>
              <p>
                Reliability: Count on us to be there every step of the way,
                ensuring your journey is smooth and enjoyable from start to
                finish.
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn"> Connect Now</button>
                </NavLink>
                <button className="btn secondary-btn">learn more</button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/about.png"
                alt="we are the best"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <Analytics />
    </>
  );
};
