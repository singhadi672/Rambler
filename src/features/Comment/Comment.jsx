import React from "react";
import { useParams } from "react-router";
import { CommentNav } from "..";
import "./Comment.css";
import CommentBody from "./CommentBody/CommentBody";

export default function Comment() {
  let { postId } = useParams();
  return (
    <div className="comment">
      <CommentNav />
      <div className="comment-context">
        <CommentBody />
      </div>
    </div>
  );
}
