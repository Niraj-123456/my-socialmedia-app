import React, { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
import db from "../../firebase";
import ShowComments from "./ShowComments";
import EditOrDelete from "./EditOrDelete";
import { AuthContext } from "../../features/useAuth";
import LCS from "../LCS";

function ViewPost(props) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState(props.post.likeCount);
  const [like, setLike] = useState([]);
  const [showComment, setShowComment] = useState([]);

  // handle like button press action
  const onLikeBtnClicked = (id) => {
    // post like info
    db.collection("postLikes")
      .add({
        likeCount: 1,
        post_id: id,
        user: user.displayName ? user.displayName : "",
        user_id: user.uid,
        likedDate: new Date().toLocaleString(),
      })
      .then(() => {
        //increment like count with ever click
        setLikeCount(likeCount + 1);
      })
      .then(() => {
        //update the like counts in post collection
        db.collection("posts")
          .doc(id)
          .update({
            likeCount: likeCount + 1,
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .then(() => {
        setLike("");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    //get like counts for particular post
    async function fetchLikes() {
      await db
        .collection("postLikes")
        .where("post_id", "==", props.post.id)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setLike(doc.data());
          });
        });
    }
    fetchLikes();
  }, [props.post.id]);

  // handle comment input change
  const onCommentChange = (e) => {
    setComment(e.target.value);
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
    async function fetchComment() {
      await db
        .collection("comments")
        .orderBy("addedDate", "desc")
        .onSnapshot((snapshot) => {
          setShowComment(
            snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            })
          );
        });
    }
    fetchComment();
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
        <div className="card mb-3 mx-auto" style={{ maxWidth: "540px" }}>
          <div className="card-header">
            <div className="row g-0 align-items-center">
              <div className="col-md-2 p-1 text-start">
                <img
                  src={
                    props.post.photoURL
                      ? props.post.photoURL
                      : "https://media.istockphoto.com/photos/cat-with-blue-eyes-looks-at-camera-picture-id1067347086?k=6&m=1067347086&s=612x612&w=0&h=aHrE1UPUHnRFESfIXNCT5uZg14Yus0LaYkK6YkLANOU="
                  }
                  alt=""
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
              </div>
              <div className="col-md-8 p-1 fs-4 text-start text-capitalize">
                {props.post.user ? props.post.user : "Anonymous"}
              </div>

              {/* Edit or Delete Post */}
              {props.user.uid && props.user.uid === props.post.user_id ? (
                <div className="col-md-2 text-end">
                  <EditOrDelete
                    updatePost={props.onUpdatePost}
                    deletePost={props.onDeletePost}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Post Caption Section */}
          <div className="row g-0">
            <div className="col-md-12 text-start p-3 fs-5">
              {props.post.post}
            </div>
          </div>

          {/* Post Image Section */}
          {props.post.postImg ? (
            <div className="row g-0">
              <div className="col-md-12">
                <div className="card-body">
                  <img
                    src={props.post.postImg}
                    style={{ width: "100%" }}
                    alt=""
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Like Comment Share Component */}
          <LCS
            liked={like}
            postLike={props.post.likeCount}
            onLikeBtnPressed={() => onLikeBtnClicked(props.post.id)}
          />

          {/* Write comment component */}
          <Comment
            comment={comment}
            onCommentChange={onCommentChange}
            onCommentSubmit={onCommentSubmit}
          />

          {/* Show all comments related to a post */}
          {allComments}

          <div className="card-footer text-muted text-start">
            {props.post.addedDate}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewPost;
