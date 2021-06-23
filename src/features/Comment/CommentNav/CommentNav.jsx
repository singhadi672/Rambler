import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./CommentNav.css";

export default function ProfileNav() {
  return (
    <div className="comment-nav">
      <div className="comment-heading">
        <h2>Comments</h2>
      </div>
      <FontAwesomeIcon icon={faEllipsisV} />
    </div>
  );
}
