import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../profileSlice";
import "./ProfilePost.css";

export default function ProfilePost() {
  const { userAccount } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <div className="profile-post-main">
      {userAccount &&
        userAccount.posts.map((post) => (
          <div className="profile-post" key={post._id}>
            {post.postType === "text" ? (
              <div className="profile-text-post">
                <p>{post.postData}</p>
              </div>
            ) : (
              <img
                className="profile-image-post"
                src={post.postData}
                alt="profile-post"
              />
            )}
            <div
              className="profile-post-delete"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <FontAwesomeIcon icon={faTrash} size="xs" />
            </div>
          </div>
        ))}
    </div>
  );
}
