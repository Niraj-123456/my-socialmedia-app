import React, { useContext } from "react";
import { AuthContext } from "../features/useAuth";

function LCS(props) {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="row g-0">
        <div className="col-md-12 p-3">
          <p className="text-start">
            {props.postLike && props.postLike > 0
              ? props.postLike + " " + "Likes"
              : ""}
          </p>
        </div>
      </div>
      <div className="row g-0 my-2">
        <div className="col-md-4 fs-4 mb-2">
          <a
            className={
              user.uid === props.liked.user_id && props.liked.likeCount === 1
                ? "btn btn-primary disabled"
                : "btn btn-light"
            }
            onClick={props.onLikeBtnPressed}
          >
            <i className="far fa-thumbs-up fs-3"></i>
          </a>
        </div>

        {/* Comment section */}
        <div className="col-md-4 fs-4">
          <a className="btn btn-light">
            <i className="far fa-comments fs-3"></i>
          </a>
        </div>

        {/* Share post section */}
        <div className="col-md-4 fs-4">
          <a className="btn btn-light">
            <i className="fas fa-share fs-3"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default LCS;
