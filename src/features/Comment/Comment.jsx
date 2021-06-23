import React from "react";
import { CommentNav } from "..";
import "./Comment.css";
import CommentBody from "./CommentBody/CommentBody";

export default function Comment() {
  return (
    <div className="comment">
      <CommentNav />
      <div className="comment-context">
        <CommentBody />
      </div>
    </div>
  );
}
