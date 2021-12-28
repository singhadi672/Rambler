import React from "react";
import { useSelector } from "react-redux";
import "./ViewProfilePost.css";

export default function ProfilePost() {
  const { viewProfileAccount } = useSelector((state) => state.viewProfile);

  return (
    <div className="profile-post-main">
      {viewProfileAccount &&
        viewProfileAccount.posts.map((post) => (
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
          </div>
        ))}
    </div>
  );
}
