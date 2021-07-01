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
  const [likeCount, setLikeCount] = useState(0);
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
            post: postBody,
            likeCount: 0,
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

  // handle like button press action
  const onLikeBtnClicked = (id) => {
    //post like info
    db.collection("postLikes").add({
      likeCount: 1,
      post_id: id,
      user: user.displayName ? user.displayName : "",
      user_id: user.uid,
      likedDate: new Date().toLocaleString(),
    });

    //get like counts for particular post
    db.collection("postLikes")
      .where("post_id", "==", id)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          let count = 0;
          if (doc.data().likeCount > 0) {
            count = count + 1;
          }
          console.log(count);
        });
      });

    //update the like counts in post collection
    db.collection("posts")
      .doc(id)
      .update({
        likeCount: 0,
      })
      .then(() => {
        // setLikeCount(0);
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
              onDeletePost={() => deletePost(postData.id)}
              onUpdatePost={() => updatePost(postData.id)}
              onLikeBtnPressed={() => onLikeBtnClicked(postData.id)}
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
      {viewPost !== null ? viewPost : <p>No Post To Show!!!</p>}
    </div>
  );
}

export default Posts;
