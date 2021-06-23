import { useNavigate, useParams } from "react-router-dom";
import "./SinglePost.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSinglePost } from "./singlePostSlice";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export default function SinglePost() {
  const { postId } = useParams();
  const { post } = useSelector((state) => state.singlePost);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSinglePost(postId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    post && (
      <>
        <div className="singlepost-nav">
          <div className="singlepost-heading">
            <h2>View Post</h2>
          </div>
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        <div className="singlepost-article" key={post._id}>
          <div className="singlepost-user-info">
            <img src={post.user.profilePicture} alt="" />
            <div className="singlepost-user-detail">
              <p>{post.user.username}</p>
              <small>{moment(post.createdAt).fromNow()}</small>
            </div>
          </div>
          <div className="singlepost-feed-content">
            {post.postType === "image" ? (
              <img src={post.postData} alt="" />
            ) : (
              <div className="singlepost-feed-text-content">
                <p>{post.postData}</p>
              </div>
            )}
            {post.postDescription && (
              <p className="singlepost-feed-post-desc">
                {post.postDescription}
              </p>
            )}
          </div>
          <div className="singlepost-feed-detail">
            <div className="singlepost-feed-reaction">
              <div className="singlepost-feed-likes">
                <FontAwesomeIcon icon={faHeart} size="lg" />
                <p>{post.likesCount}</p>
              </div>
              <div
                className="singlepost-feed-comment"
                onClick={() => navigate(`/comment/${post._id}`)}
              >
                <FontAwesomeIcon icon={faComment} size="lg" />
                <p>{post.commentsCount}</p>
              </div>
            </div>
            <div className="singlepost-article-bookmark">
              <FontAwesomeIcon icon={faBookmark} />
            </div>
          </div>
        </div>
      </>
    )
  );
}
