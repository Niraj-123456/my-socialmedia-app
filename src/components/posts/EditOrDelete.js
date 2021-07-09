import React from "react";

function EditOrDelete(props) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      ></button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a href="#" className="dropdown-item" onClick={props.updatePost}>
            Edit
          </a>
        </li>
        <li>
          <a className="dropdown-item" onClick={props.deletePost}>
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
}

export default EditOrDelete;
