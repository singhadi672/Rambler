import React from "react";
import "./ViewProfileFollowers.css";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileFollowers() {
  const { viewProfileAccount } = useSelector((state) => state.viewProfile);
  return (
    <div className="profile-follower-main">
      {viewProfileAccount &&
        viewProfileAccount.followers.map((user) =>
          user._id !== viewProfileAccount.user._id ? (
            <div className="profile-follower">
              <div className="profile-user-detail">
                <img src={user.profilePicture} alt="" />
                <p>{user.username}</p>
              </div>
            </div>
          ) : viewProfileAccount.followersCount == 0 ? (
            <p>No Followers</p>
          ) : null
        )}
    </div>
  );
}
