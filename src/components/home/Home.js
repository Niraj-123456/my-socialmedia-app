import { catchClause } from "@babel/types";
import React from "react";
// import ViewPost from './posts/ViewPost'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container-fluid">
      {/* <ViewPost /> */}
      <div
        className="row align-items-center"
        style={{ height: "calc(100vh - 70px)" }}
      >
        <div className="col-md-6">
          <div
            className="card m-auto"
            style={{ width: "18rem", backgroundColor: "#92a8d1" }}
          >
            <div className="card-body">
              <p className="text-white">
                You must be logged In to access the features of the app
              </p>
              <Link to="/login" className="btn btn-primary">
                Go to Login page
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card m-auto"
            style={{ width: "18rem", backgroundColor: "#92a8d1" }}
          >
            <div class="card-body">
              <p className="text-light">
                Use your email and password to register to the system
              </p>
              <Link to="/register" className="btn btn-primary">
                Go to Register page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
