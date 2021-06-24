import { faImage, faSmile, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRefreshedPage } from "../../User/authSlice";
import { createNewPost } from "../homepageSlice";
import "./Post.css";
import { emojiBoardVisible } from "../homepageSlice";
import { imageBoardVisible } from "../homepageSlice";
import Picker from "emoji-picker-react";

export default function Post() {
  const { user, token } = useSelector((state) => state.auth);
  const { emojiBoard, requestLoader } = useSelector((state) => state.homepage);
  const dispatch = useDispatch();
  const [currentText, setCurrentText] = useState("");
  const postTextRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window.onresize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    token && dispatch(userRefreshedPage({ token }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createPost(data) {
    if (data.postData) {
      const response = await dispatch(createNewPost(data));
      const { meta } = response;
      if (meta.requestStatus === "fulfilled") {
        postTextRef.current.value = "";
      }
    }
  }

  function setEmoji(event, emojiObject) {
    setCurrentText((currentText) => currentText + emojiObject.emoji);
  }

  return (
    <div className="post">
      <div className="profile-pic">
        <img src={user && user.profilePicture} alt="" />
      </div>
      <div className="post-update">
        <textarea
          name=""
          id=""
          cols="30"
          ref={postTextRef}
          rows="4"
          value={currentText}
          maxLength={200}
          onChange={() => setCurrentText(postTextRef.current.value)}
          placeholder="What's Poppin'?"
        ></textarea>
        <div className="options">
          <div className="extras">
            <div
              className="post-option app-photo"
              onClick={() => dispatch(imageBoardVisible())}
            >
              <FontAwesomeIcon icon={faImage} />
            </div>
            <div className="post-option app-video">
              <FontAwesomeIcon icon={faVideo} />
            </div>
            <div
              className="post-option app-emoji"
              onClick={() => dispatch(emojiBoardVisible())}
            >
              <FontAwesomeIcon icon={faSmile} />
            </div>
          </div>
          <div className="post-button">
            <button
              onClick={() =>
                createPost({
                  postType: "text",
                  postData: postTextRef.current.value,
                  postDescription: null,
                })
              }
            >
              {requestLoader === "pending" ? (
                <div className="login-loader"></div>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
        {emojiBoard && (
          <Picker
            pickerStyle={{
              width: windowWidth < 495 ? "90%" : "40%",
              position: "absolute",
              top: "11rem",
              left: windowWidth < 495 ? "5%" : "30%",
              opacity: "0.99",
              height: "10rem",
            }}
            groupVisibility={{ recently_used: false }}
            disableSearchBar={true}
            onEmojiClick={setEmoji}
          />
        )}
      </div>
    </div>
  );
}
