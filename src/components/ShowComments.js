import React from "react";

function ShowComments(props) {
  return (
    <>
      <div className="col-md-1">
        <i className="fas fa-user-circle"></i>
      </div>
      <div className="col-md-6">
        <p className="text-start">
          {props.comment.comment}{" "}
          <span className="text-sm">Posted By- {props.comment.user}</span>
        </p>
      </div>
      <div className="col-md-4">
        <a href="#" className="mx-1 mx-1 text-decoration-none">
          Edit
        </a>
        <a href="#" className="mx-1 text-decoration-none">
          Delete
        </a>
      </div>
    </>
  );
}

export default ShowComments;
