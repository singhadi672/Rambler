import React from "react";
import "./ProfileFollowing.css";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUser } from "../profileSlice";

export default function ProfileFollowers() {
  const { userAccount } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <>
      <div className="profile-following-main">
        {userAccount &&
          userAccount.following.map((user) =>
            user._id !== userAccount.user._id ? (
              <div className="profile-user-following" >
                <div className="profile-user-detail">
                  <img src={user.profilePicture} alt="" />
                  <p>{user.username}</p>
                </div>
                <button onClick={() => dispatch(unfollowUser(user._id))}>
                  Remove
                </button>
              </div>
            ) : null
          )}
        {userAccount.following.length < 0 && <p>No Following</p>}
      </div>
    </>
  );
}
