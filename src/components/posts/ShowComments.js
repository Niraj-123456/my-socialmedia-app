import React from "react";

function ShowComments(props) {
  return (
    <div className="row my-2 justify-content-center">
      <div className="col-md-1">
        <img
          src={
            props.comment.user_photo
              ? props.comment.user_photo
              : "https://media.istockphoto.com/photos/cat-with-blue-eyes-looks-at-camera-picture-id1067347086?k=6&m=1067347086&s=612x612&w=0&h=aHrE1UPUHnRFESfIXNCT5uZg14Yus0LaYkK6YkLANOU="
          }
          alt="user"
          style={{ height: "30px", width: "30px", borderRadius: "50%" }}
        />
      </div>
      <div className="col-md-7">
        <p className="text-start">
          {props.comment.comment}{" "}
          <span className="text-capitalize" style={{ fontSize: "11px" }}>
            Commented By- {props.comment.user}
          </span>
        </p>
      </div>
      <div className="d-flex col-md-2">
        <a className="btn btn-light">
          <i className="far fa-edit" style={{ color: "#6b5b95" }}></i>
        </a>
        <a className="btn btn-light">
          <i className="fas fa-trash text-danger"></i>
        </a>
      </div>
    </div>
  );
}

export default ShowComments;
