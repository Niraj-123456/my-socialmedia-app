import React, { useContext } from "react";
import { AuthContext } from "../../features/useAuth";

function Comment(props) {
  const { user } = useContext(AuthContext);
  return (
    <div className="row justify-content-center my-2">
      <div className="col-md-1">
        <img
          src={
            user.photoURL
              ? user.photoURL
              : "https://media.istockphoto.com/photos/cat-with-blue-eyes-looks-at-camera-picture-id1067347086?k=6&m=1067347086&s=612x612&w=0&h=aHrE1UPUHnRFESfIXNCT5uZg14Yus0LaYkK6YkLANOU="
          }
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      </div>
      <div className="col-md-9">
        <form onSubmit={props.onCommentSubmit}>
          <input
            className="form-control"
            id="comment"
            value={props.comment}
            onChange={props.onCommentChange}
            placeholder="Enter Comment..."
          />
        </form>
      </div>
    </div>
  );
}

export default Comment;
