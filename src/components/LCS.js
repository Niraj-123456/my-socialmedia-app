import React from "react";

function LCS(props) {
  return (
    <div>
      <div className="fs-4">
        <a href="#" className="btn btn-light" onClick={props.onLikeBtnPressed}>
          <i className="far fa-thumbs-up fs-3"></i>
        </a>
        <span>{props.postLike}</span>
        <a href="#" className="btn btn-light">
          <i className="far fa-comments fs-3"></i>
        </a>
        <span>0</span>
        <a href="#" className="btn btn-light">
          <i className="fas fa-share fs-3"></i>
        </a>
      </div>
    </div>
  );
}

export default LCS;
