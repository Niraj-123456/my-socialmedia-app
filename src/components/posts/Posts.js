import React, { useState, useEffect, useContext } from "react";
import WritePost from "./WritePost";
import ViewPost from "./ViewPost";
import db from "../../firebase";
import { AuthContext } from "../../features/useAuth";
import { useHistory } from "react-router-dom";

function Posts() {
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);
  const dateAdded = new Date().toDateString();
  const [postBody, setPostBody] = useState("");
  const [id, setId] = useState("");
  const history = useHistory();

  // fetch all post data in user's dashboard
  useEffect(() => {
    db.collection("posts")
      .orderBy("addedDate", "desc")
      .onSnapshot((snapshot) => {
        setPost(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      });
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
            commentCounts: 0,
            likeCounts: 0,
            post: postBody,
            user_id: user.uid,
            user: user.displayName,
            photoURL: user.photoURL,
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

  const viewPost = !post
    ? ""
    : post.map((postData) => {
        return (
          <ViewPost
            key={postData.id}
            post={postData}
            user={user}
            onDeletePost={deletePost}
            onUpdatePost={updatePost}
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
      {viewPost}
    </div>
  );
}

export default Posts;
