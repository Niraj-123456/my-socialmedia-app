import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import Comment from "./Comment";
import db from "../../firebase";
import ShowComments from "./ShowComments";
import LCS from "../LCS";

function ViewPost(props) {
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState(props.post.likeCount);
  const [like, setLike] = useState();
  const [showComment, setShowComment] = useState([]);

  // handle comment input change
  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  // handle like button press action
  const onLikeBtnClicked = (id) => {
    // post like info
    db.collection("postLikes").add({
      likeCount: 1,
      post_id: id,
      user: props.user.displayName ? props.user.displayName : "",
      user_id: props.user.uid,
      likedDate: new Date().toLocaleString(),
    });

    //get like counts for particular post
    db.collection("postLikes")
      .where("post_id", "==", id)
      .onSnapshot((snapshot) => {
        setLike(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      });

    //increment like count with ever click
    setLikeCount(likeCount + 1);

    //update the like counts in post collection
    db.collection("posts")
      .doc(id)
      .update({
        likeCount: likeCount + 1,
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // handle comment submit
  const onCommentSubmit = (e) => {
    e.preventDefault();
    try {
      db.collection("comments")
        .add({
          comment: comment,
          post_id: props.post.id,
          user_id: props.user.uid,
          user: props.user.displayName ? props.user.displayName : "Anonymous",
          user_photo: props.user.photoURL,
          addedDate: new Date().toLocaleString(),
        })
        .then(() => {
          setComment("");
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // fetch comments for the specific post
  useEffect(() => {
    db.collection("comments")
      .orderBy("addedDate", "desc")
      .onSnapshot((snapshot) => {
        setShowComment(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      });
  }, []);

  const allComments =
    showComment === null
      ? ""
      : showComment.map((comments) => {
          return comments.post_id === props.post.id ? (
            <ShowComments comment={comments} key={comments.id} />
          ) : (
            ""
          );
        });

  return (
    <div className="container mt-5">
      {props.post === " " ? (
        <ul className="list-group">
          <li className="list-group-item list-group-item-success text-dark">
            There is no post to show!!!
          </li>
        </ul>
      ) : (
        <div className="card mb-3 offset-3" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
            <div className="col-md-12">
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
          </div>
          <div className="row g-0">
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title text-uppercase">
                  {props.post.user ? props.post.user : "Anonymous"}
                </h5>
                <p className="card-text">{props.post.post}</p>
                <p className="card-text">
                  <small className="text-muted">{props.post.addedDate}</small>
                </p>
              </div>

              {/* Like Comment Share Component */}
              <LCS
                likeId={like}
                postLike={props.post.likeCount}
                onLikeBtnPressed={() => onLikeBtnClicked(props.post.id)}
              />

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
          </div>
          <div className="row g-0 justify-content-center my-2">
            <div className="col-md-10">
              <Comment
                comment={comment}
                onCommentChange={onCommentChange}
                onCommentSubmit={onCommentSubmit}
              />
            </div>
          </div>
          <div className="row my-3 justify-content-center">{allComments}</div>
        </div>
      )}
    </div>
  );
}

export default ViewPost;
