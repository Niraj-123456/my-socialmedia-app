import React from "react";

function ShowComments(props) {
  return (
    <div>
      {props.comment.post_id === props.postId ? (
        <>
          <p>
            {props.comment.comment} <span>Posted By- {props.comment.user}</span>
          </p>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ShowComments;
