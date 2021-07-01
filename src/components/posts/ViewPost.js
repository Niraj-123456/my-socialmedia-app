import React, { useState } from "react";
import { Link } from "react-scroll";
import Comment from "./Comment";

function ViewPost(props) {
  const [comment, setComment] = useState("");

  // handle comment input change
  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  // handle comment submit
  const onCommentSubmit = (e) => {
    e.preventDefault();
    console.log(comment);
  };

  return (
    <div className="container mt-5">
      {props.post === " " ? (
        <ul className="list-group">
          <li className="list-group-item list-group-item-success text-dark">
            There is no post to show!!!
          </li>
        </ul>
      ) : (
        <div className="card mb-3 offset-1" style={{ maxWidth: "940px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={
                  props.post.photoURL
                    ? props.post.photoURL
                    : "https://media.istockphoto.com/photos/cat-with-blue-eyes-looks-at-camera-picture-id1067347086?k=6&m=1067347086&s=612x612&w=0&h=aHrE1UPUHnRFESfIXNCT5uZg14Yus0LaYkK6YkLANOU="
                }
                alt="..."
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title text-uppercase">
                  {props.post.user ? props.post.user : "Anonymous"}
                </h5>
                <p className="card-text">{props.post.post}</p>
                <p className="card-text">
                  <small className="text-muted">{props.post.addedDate}</small>
                </p>
              </div>
              <div className="fs-4">
                <a
                  href="#"
                  className="btn btn-light"
                  role="button"
                  onClick={props.onLikeBtnPressed}
                >
                  <i className="far fa-thumbs-up fs-3"></i>
                </a>
                <span>{props.post.likeCount}</span>
                <a href="#" className="btn btn-light">
                  <i className="far fa-comments fs-3"></i>
                </a>
                <span>0</span>
                <a href="#" className="btn btn-light">
                  <i className="fas fa-share fs-3"></i>
                </a>
              </div>
              {props.user.uid && props.post.user_id === props.user.uid ? (
                <div>
                  <Link
                    to="write-post"
                    smooth={true}
                    offset={-20}
                    duration={500}
                  >
                    <button
                      className="btn btn-sm btn-secondary m-2"
                      onClick={props.onUpdatePost}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn btn-sm btn-danger m-2"
                    onClick={props.onDeletePost}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                " "
              )}
            </div>
            <div className="col-md-8 offset-4 my-2">
              <Comment
                comment={comment}
                onCommentChange={onCommentChange}
                onCommentSubmit={onCommentSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewPost;
