import { NavLink } from "react-router-dom";
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./Navbar.css";
import { useAuth } from "../../store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">TerraVista</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/" exact>
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">
                  <FaInfoCircle /> About
                </NavLink>
              </li>
              <li>
                <NavLink to="/service">
                  <FaServicestack /> Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact">
                  <FaEnvelope /> Contact
                </NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">
                    <FaSignOutAlt /> Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">
                      <FaUserPlus /> Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">
                      <FaSignInAlt /> Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
