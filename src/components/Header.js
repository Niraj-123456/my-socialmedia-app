import React, { useContext } from "react";
import "../Utils.css";
import { AuthContext } from "./../features/useAuth";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const { user, logOut } = useContext(AuthContext);
  const history = useHistory();

  const signOut = async () => {
    try {
      await logOut();
      history.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#6b5b95" }}
      >
        <div className="container d-flex">
          <a className="navbar-brand" href="#">
            <p>Social Media App</p>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse nav-icon justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              {user ? (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link icon"
                      tabIndex="0"
                      data-bs-toggle="popover"
                      data-bs-trigger="focus"
                      title="Notifications"
                      data-bs-content="And here's some amazing content. It's very engaging. Right?"
                    >
                      <i className="far fa-bell h5 text-light"></i>
                      <span className="badge-icon">1</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a role="button" className="nav-link icon">
                      <i className="fab fa-facebook-messenger h5 text-light"></i>
                      <span className="badge-icon">1</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a role="button" className="nav-link icon">
                      <i className="fas fa-user-friends h5 text-light"></i>
                      <span className="badge-icon">1</span>
                    </a>
                  </li>
                  <li className="nav-item dropdown icon ms-3">
                    <a
                      className="nav-link dropdown-toggle text-uppercase text-light"
                      href="#"
                      role="button"
                      id="navbarDropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.displayName ? user.displayName : "Anonymous"}
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-light"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <a href="#" className="dropdown-item">
                          My Profile
                        </a>
                      </li>
                      <li>
                        <a href="#" className="dropdown-item" onClick={signOut}>
                          LogOut
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-light icon m-2">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-light icon m-2">
                    Register
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
