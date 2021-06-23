import React from "react";
import "./ProfileFollowers.css";
import { useDispatch, useSelector } from "react-redux";
import { addFollowBackFunction } from "../../../util/addFollowBackFunction";
import { followUser } from "../profileSlice";

export default function ProfileFollowers() {
  const { userAccount } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  return (
    <div className="profile-follower-main">
      {userAccount &&
        userAccount.followers.map((user) =>
          user._id !== userAccount.user._id ? (
            <div className="profile-follower">
              <div className="profile-user-detail">
                <img src={user.profilePicture} alt="" />
                <p>{user.username}</p>
              </div>
              {addFollowBackFunction(user._id, userAccount.following) ? (
                <button className="friends">Friends</button>
              ) : (
                <button onClick={() => dispatch(followUser(user._id))}>
                  Follow
                </button>
              )}
            </div>
          ) : userAccount.followersCount == 0 ? (
            <p>No Followers</p>
          ) : null
        )}
    </div>
  );
}
