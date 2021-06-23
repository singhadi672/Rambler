import {
  faBookmark,
  faComment,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed, getNotifications, likeButtonClicked } from "../homepageSlice";
import "./Feed.css";
import { Loader } from "../..";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import addLikeButton from "../../../util/addLikeButton";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";

export default function Feed() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { feed, feedState } = useSelector((state) => state.homepage);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getFeed());
    dispatch(getNotifications());
  }, []);

  return (
    <div className="feeds">
      {feedState === "pending" && <Loader />}
      {feed &&
        feed.map((feed) => (
          <div className="article" key={feed._id}>
            <div
              className="user-info"
              onClick={() => {
                navigate(`/profile/${feed.user._id}`);
              }}
            >
              <img src={feed.user.profilePicture} alt="" />
              <div className="user-detail">
                <p>{feed.user.username}</p>
                <small>{moment(feed.createdAt).fromNow()}</small>
              </div>
            </div>
            <div className="feed-content">
              {feed.postType === "image" ? (
                <img src={feed.postData} alt="" />
              ) : (
                <div className="feed-text-content">
                  <p>{feed.postData}</p>
                </div>
              )}
              {feed.postDescription && (
                <p className="feed-post-desc">{feed.postDescription}</p>
              )}
            </div>
            <div className="feed-detail">
              <div className="feed-reaction">
                <div
                  className="feed-likes"
                  onClick={() => {
                    dispatch(likeButtonClicked(feed._id));
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      addLikeButton(user._id, feed.likes)
                        ? faHeartFull
                        : faHeart
                    }
                    size="lg"
                  />
                  <p>{feed.likesCount}</p>
                </div>
                <div
                  className="feed-comment"
                  onClick={() => navigate(`/comment/${feed._id}`)}
                >
                  <FontAwesomeIcon icon={faComment} size="lg" />
                  <p>{feed.commentsCount}</p>
                </div>
              </div>
              <div className="article-bookmark">
                <FontAwesomeIcon icon={faBookmark} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
