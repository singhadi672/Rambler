import React, { useEffect } from "react";
import "./ProfileInfo.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProfileTab,
  getProfileDetails,
  toggleProfileEdit,
} from "../profileSlice";
import Loader from "../../Loader/Loader";
import { ProfilePost, ProfileFollowers, ProfileFollowing } from "../..";

export default function ProfileInfo() {
  const dispatch = useDispatch();
  const { userAccount, profileTab, triggerGetProfile } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(getProfileDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerGetProfile]);

  return userAccount ? (
    <div className="profile-info">
      <div className="basic-info">
        <img src={userAccount.user.profilePicture} alt="profile" />
        <div className="basic-desc">
          <h2>{userAccount.user.username}</h2>
          <p>{userAccount.accountDescription}</p>
        </div>
      </div>
      <div className="profile-status">
        <div className="status profile-followers">
          <h3>{userAccount.followersCount}</h3>
          <p>Followers</p>
        </div>
        <div className="status profile-following">
          <h3>{userAccount.followingCount}</h3>
          <p>Following</p>
        </div>
        <div className="status profile-post-count">
          <h3>{userAccount.postCount}</h3>
          <p>Posts</p>
        </div>
      </div>
      <div className="edit-profile">
        <button onClick={() => dispatch(toggleProfileEdit())}>
          Edit Profile
        </button>
      </div>
      <div className="profile-details">
        <button
          onClick={() => dispatch(changeProfileTab("followers"))}
          style={{
            borderBottom:
              profileTab === "followers" && "2px solid var(--border-light)",
          }}
        >
          Followers
        </button>
        <button
          onClick={() => dispatch(changeProfileTab("following"))}
          style={{
            borderBottom:
              profileTab === "following" && "2px solid var(--border-light)",
          }}
        >
          Following
        </button>
        <button
          onClick={() => dispatch(changeProfileTab("profilePost"))}
          style={{
            borderBottom:
              profileTab === "profilePost" && "2px solid var(--border-light)",
          }}
        >
          Posts
        </button>
      </div>
      {profileTab === "followers" && <ProfileFollowers />}
      {profileTab === "following" && <ProfileFollowing />}
      {profileTab === "profilePost" && <ProfilePost />}
    </div>
  ) : (
    <Loader />
  );
}
