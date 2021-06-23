import React, { useEffect } from "react";
import "./ViewProfileInfo.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import {
  ViewProfilePost,
  ViewProfileFollowers,
  ViewProfileFollowing,
} from "../..";
import { useParams } from "react-router-dom";
import { getTargetUser, changeProfileTab } from "../viewProfileSlice";

export default function ProfileInfo() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { viewProfileAccount, viewProfileTab } = useSelector(
    (state) => state.viewProfile
  );

  useEffect(() => {
    dispatch(getTargetUser(userId));
  });

  {
    return viewProfileAccount ? (
      <div className="view-profile-info">
        <div className="basic-info">
          <img
            src={viewProfileAccount.user.profilePicture}
            alt="view-profile"
          />
          <div className="basic-desc">
            <h2>{viewProfileAccount.user.username}</h2>
            <p>{viewProfileAccount.accountDescription}</p>
          </div>
        </div>
        <div className="view-profile-status">
          <div className="status view-profile-followers">
            <h3>{viewProfileAccount.followersCount}</h3>
            <p>Followers</p>
          </div>
          <div className="status view-profile-following">
            <h3>{viewProfileAccount.followingCount}</h3>
            <p>Following</p>
          </div>
          <div className="status view-profile-post-count">
            <h3>{viewProfileAccount.postCount}</h3>
            <p>Posts</p>
          </div>
        </div>
        <div className="view-profile-details">
          <button
            onClick={() => dispatch(changeProfileTab("followers"))}
            style={{
              borderBottom:
                viewProfileTab === "followers" &&
                "2px solid var(--border-light)",
            }}
          >
            Followers
          </button>
          <button
            onClick={() => dispatch(changeProfileTab("following"))}
            style={{
              borderBottom:
                viewProfileTab === "following" &&
                "2px solid var(--border-light)",
            }}
          >
            Following
          </button>
          <button
            onClick={() => dispatch(changeProfileTab("profilePost"))}
            style={{
              borderBottom:
                viewProfileTab === "profilePost" &&
                "2px solid var(--border-light)",
            }}
          >
            Posts
          </button>
        </div>
        {viewProfileTab === "followers" && <ViewProfileFollowers />}
        {viewProfileTab === "following" && <ViewProfileFollowing />}
        {viewProfileTab === "profilePost" && <ViewProfilePost />}
      </div>
    ) : (
      <Loader />
    );
  }
}
