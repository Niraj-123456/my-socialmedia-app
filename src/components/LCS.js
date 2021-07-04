import React, { useContext } from "react";
import { AuthContext } from "../features/useAuth";

function LCS(props) {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="fs-4">
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
        <span>{props.postLike}</span>
        <a className="btn btn-light">
          <i className="far fa-comments fs-3"></i>
        </a>
        <span>0</span>
        <a className="btn btn-light">
          <i className="fas fa-share fs-3"></i>
        </a>
      </div>
    </div>
  );
}

export default LCS;
