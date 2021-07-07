import React, { useState, useEffect, useContext } from "react";
import WritePost from "./WritePost";
import ViewPost from "./ViewPost";
import db from "../../firebase";
import { AuthContext } from "../../features/useAuth";
import { useHistory } from "react-router-dom";

function Posts() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);
  const dateAdded = new Date().toDateString();
  const [postBody, setPostBody] = useState("");
  const [id, setId] = useState("");
  const history = useHistory();

  // fetch all post data in user's dashboard
  useEffect(() => {
    let mounted = true;
    async function fetchPost() {
      await db
        .collection("posts")
        .orderBy("addedDate", "desc")
        .onSnapshot((snapshot) => {
          if (mounted) {
            setPost(
              snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              })
            );
          }
        });
    }
    fetchPost();
    setLoading(false);
    return () => (mounted = false);
  }, []);

  // get input value on change
  const handleChange = (e) => {
    setPostBody(e.target.value);
  };

  // method for handling post submit
  const handlePostSubmit = (e) => {
    e.preventDefault();
    try {
      // if post id is null then perform post method
      if (id === "") {
        db.collection("posts")
          .add({
            addedDate: dateAdded,
            post: postBody,
            likeCount: 0,
            commentCount: 0,
            user_id: user.uid,
            user: user.displayName ? user.displayName : "",
            photoURL: user.photoURL ? user.photoURL : "",
          })
          .then(() => {
            setPostBody("");
          })
          .catch((error) => {
            console.log(error.message);
          });
        // if the post id is not null, then perform update post method
      } else {
        db.collection("posts")
          .doc(id)
          .update({ post: postBody })
          .then(() => {
            setPostBody("");
            setId("");
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } catch (error) {
      console.log("Something when wrong");
      setPostBody("");
    }
  };

  // fetch the single post for update
  const updatePost = (id) => {
    db.collection("posts")
      .doc(id)
      .get()
      .then((snapshot) => {
        setPostBody(snapshot.data().post);
        setId(snapshot.id);
      });
  };

  // delete the post
  const deletePost = (id) => {
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const viewPost =
    post === []
      ? null
      : post.map((postData) => {
          return (
            <ViewPost
              key={postData.id}
              post={postData}
              user={user}
              loading={loading}
              onDeletePost={() => deletePost(postData.id)}
              onUpdatePost={() => updatePost(postData.id)}
            />
          );
        });

  return (
    <div>
      <WritePost
        body={postBody}
        handleChange={handleChange}
        onSubmit={handlePostSubmit}
        id={id}
      />
      {!loading ? (
        viewPost
      ) : (
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default Posts;
