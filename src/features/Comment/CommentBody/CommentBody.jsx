import moment from "moment";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommentsForPost, createNewComment } from "../commentSlice";
import "./CommentBody.css";
import { Loader } from "../..";

export default function CommentBody() {
  const { comments, commentLoader } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);
  const commentRef = useRef(null);
  const dispatch = useDispatch();
  const { postId } = useParams();

  useEffect(() => {
    dispatch(getCommentsForPost(postId));
  }, []);

  async function postComment() {
    if (commentRef.current.value) {
      const { meta } = await dispatch(
        createNewComment({
          commentText: commentRef.current.value,
          postID: postId,
        })
      );
      if (meta.requestStatus === "fulfilled") {
        commentRef.current.value = "";
      } else {
        console.log(meta);
      }
    }
  }

  return (
    <div className="comment-body">
      <div className="comment-section">
        <img src={user && user.profilePicture} alt="" />
        <textarea
          name="comment"
          id="comment"
          cols="26"
          rows="3"
          ref={commentRef}
          placeholder="Add a Comment..."
        ></textarea>
        <button onClick={postComment}>Post</button>
      </div>
      <div className="comments-all">
        {comments[0] ? (
          comments.map((comment) => (
            <div className="comment-article" key={comment._id}>
              <img src={comment.commentOwner.profilePicture} alt="" />
              <div>
                <small>
                  <b>
                    {comment.commentOwner.username} •{" "}
                    {moment(comment.updatedAt).fromNow()}
                  </b>
                </small>
                <p>{comment.commentText}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments </p>
        )}
      </div>
      {commentLoader === "pending" && <Loader />}
    </div>
  );
}
