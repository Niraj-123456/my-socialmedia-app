import React from "react";

function Comment(props) {
  return (
    <div>
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
  );
}

export default Comment;
