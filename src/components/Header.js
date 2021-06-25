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
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <p>Social Media App</p>
          </a>
          <div className="nav-icon d-flex">
            {user ? (
              <>
                <a
                  className="icon mx-2"
                  tabIndex="0"
                  role="button"
                  data-bs-toggle="popover"
                  data-bs-trigger="focus"
                  title="Notifications"
                  data-bs-content="And here's some amazing content. It's very engaging. Right?"
                >
                  <i className="far fa-bell h5"></i>
                  <span className="badge-icon">1</span>
                </a>
                <a role="button" className="icon mx-2">
                  <i className="fab fa-facebook-messenger h5"></i>
                  <span className="badge-icon">1</span>
                </a>
                <a role="button" className="icon mx-2">
                  <i className="fas fa-user-friends h5"></i>
                  <span className="badge-icon">1</span>
                </a>
                <div className="dropdown icon ms-5">
                  <button
                    className="btn btn-light btn-sm dropdown-toggle text-uppercase"
                    href="#"
                    role="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.displayName ? user.displayName : "Anonymous"}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        role="button"
                        onClick={signOut}
                      >
                        LogOut
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  role="button"
                  className="btn btn-light icon mx-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  role="button"
                  className="btn btn-light icon mx-2"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
