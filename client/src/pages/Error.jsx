import { NavLink } from "react-router-dom";

export const Error = () => {
  return (
    <section id="error-page">
      <div className="content">
        <h2 className="header">404</h2>
        <h4>Sorry! Page Not Found</h4>
        <p>
          <p>
            Oops! It seems like the page you&#39;re trying to access doesn&#39;t
            exist. If you believe there&#39;s an issue, feel free to report it,
            and we&#39;ll look into it.
          </p>
        </p>
        <div className="btns">
          <NavLink to="/" className="btn">
            Return Home
          </NavLink>
          <NavLink to="/contact" className="btn">
            Report Problem
          </NavLink>
        </div>
      </div>
    </section>
  );
};
