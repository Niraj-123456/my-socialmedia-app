import React from "react";

function WritePost(props) {
  return (
    <div className="container mt-5" id="write-post">
      <form onSubmit={props.onSubmit}>
        <div className="card text-white mb-3 col-md-8 offset-2">
          <div className="card-header bg-primary">Write Your Post</div>
          <textarea
            value={props.body}
            className="form-control"
            placeholder="Enter your post here..."
            rows="3"
            onChange={props.handleChange}
          ></textarea>
        </div>
        <input
          type="submit"
          value={props.id ? "Update" : "Post"}
          className="btn btn-primary my-2"
        />
      </form>
    </div>
  );
}

export default WritePost;
