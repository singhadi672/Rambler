import React from "react";
import "./ViewProfileFollowing.css";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileFollowers() {
  const { viewProfileAccount } = useSelector((state) => state.viewProfile);

  return (
    <>
      <div className="profile-following-main">
        {viewProfileAccount &&
          viewProfileAccount.following.map((user) =>
            user._id !== viewProfileAccount.user._id ? (
              <div className="profile-user-following">
                <div className="profile-user-detail">
                  <img src={user.profilePicture} alt="" />
                  <p>{user.username}</p>
                </div>
              </div>
            ) : null
          )}
        {viewProfileAccount.following.length < 0 && <p>No Following</p>}
      </div>
    </>
  );
}
