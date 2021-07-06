import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import db from "../../firebase";
import ShowComments from "./ShowComments";
import EditOrDelete from "./EditOrDelete";
import LCS from "../LCS";

function ViewPost(props) {
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState(props.post.likeCount);
  const [like, setLike] = useState([]);
  const [showComment, setShowComment] = useState([]);

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

          {/* Post Image Section */}
          <div className="row g-0">
            <div className="col-md-12">
              <div className="card-body">
                <img
                  src="http://www.mandysam.com/img/random.jpg"
                  style={{ width: "100%" }}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-md-12 text-start p-3 fs-4">
              {props.post.post}
            </div>
          </div>

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
