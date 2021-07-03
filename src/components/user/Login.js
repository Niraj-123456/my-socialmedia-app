import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../features/useAuth";

function Login() {
  const history = useHistory();
  const { signInWithGoogle } = useContext(AuthContext);

  const loginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      history.push("/dashboard");
    } catch (error) {
      history.push("/login");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <h5 className="card-header">Login</h5>
            <div className="card-body d-grid col-6 mx-auto gap-2">
              <a href="#" className="btn btn-primary" onClick={loginWithGoogle}>
                Login with Google
              </a>
              <Link to="/loginWithEmail&Pwd" className="btn btn-secondary">
                Login with Email
              </Link>
              <a href="#" className="btn btn-light">
                Login with Apple
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
