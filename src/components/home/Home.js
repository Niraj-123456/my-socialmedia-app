import React from "react";
// import ViewPost from './posts/ViewPost'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container-fluid">
      {/* <ViewPost /> */}
      <div className="row">
        <div className="col-md-6" style={styles}>
          <div
            className="card m-auto mt-5"
            style={{ width: "18rem", backgroundColor: "#92a8d1" }}
          >
            <div className="card-body">
              <p className="text-white">
                You must be logged In to access the features of the app
              </p>
              <Link
                to="/login"
                className="btn text-light"
                style={{ backgroundColor: "#6b5b95" }}
              >
                Go to Login page
              </Link>
            </div>
          </div>
          <p
            className="mt-5 mx-auto p-2 text-light fs-5"
            style={{ width: "30rem" }}
          >
            Labore ut dolore id ad id sunt pariatur excepteur enim irure ea
            reprehenderit elit quis. Cillum aliquip cillum officia ut veniam
            cillum ea sint tempor aliqua aliqua dolore. Sit laborum voluptate
            reprehenderit exercitation laboris laborum Lorem voluptate id. Et
            irure deserunt ipsum officia laborum cupidatat consequat laboris
            tempor. Magna dolore aute consequat aute ex esse eu velit eiusmod
            amet minim.
          </p>
        </div>
        <div className="col-md-6 mt-5">
          <p className="m-auto p-2 fs-5" style={{ width: "30rem" }}>
            Minim eiusmod esse consequat consequat anim est sunt cillum. Do
            pariatur ut est eu qui ex irure labore ullamco. Esse duis culpa do
            fugiat aliqua ut pariatur nostrud incididunt incididunt.
          </p>
          <div
            className="card m-auto mt-5"
            style={{ width: "18rem", backgroundColor: "#6b5b95" }}
          >
            <div className="card-body">
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

const styles = {
  backgroundColor: "#6b5b95",
  clipPath: "polygon(0 0, 100% 0, 83% 100%, 0% 100%)",
  height: "calc(100vh - 70px)",
};
