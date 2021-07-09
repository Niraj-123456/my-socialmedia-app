import React from "react";

function WritePost(props) {
  return (
    <div className="container mt-5" id="write-post">
      <form onSubmit={props.onSubmit}>
        <div className="card mb-3 col-md-8 offset-2" style={{ border: "None" }}>
          <div
            className="card-header text-light"
            style={{ backgroundColor: "#6b5b95" }}
          >
            What's on your mind today?
          </div>
          <div className="form-floating">
            <textarea
              value={props.body}
              className="form-control"
              placeholder="Leave a comment here"
              rows="3"
              onChange={props.onhandlePostChange}
              id="floatingTextarea"
              required
            ></textarea>
            <label htmlFor="floatingTextarea">Write Post...</label>
          </div>
          <label htmlFor="formFileSm" className="form-label text-start my-2">
            Upload Image
          </label>
          <input
            className="form-control form-control-sm"
            type="file"
            id="formFile"
            onChange={props.onhandleImgChange}
          />
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
