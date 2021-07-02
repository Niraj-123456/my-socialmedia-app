import React from "react";

function ShowComments(props) {
  return (
    <>
      <div className="col-md-1">
        <img
          src={
            props.comment.user_photo
              ? props.comment.user_photo
              : "https://media.istockphoto.com/photos/cat-with-blue-eyes-looks-at-camera-picture-id1067347086?k=6&m=1067347086&s=612x612&w=0&h=aHrE1UPUHnRFESfIXNCT5uZg14Yus0LaYkK6YkLANOU="
          }
          alt="user-image"
          style={{ height: "30px", width: "30px", borderRadius: "50%" }}
        />
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
