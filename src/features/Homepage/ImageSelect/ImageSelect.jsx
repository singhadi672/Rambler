import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost, imageBoardVisible } from "../homepageSlice";
import "./ImageSelect.css";

export default function ImageSelect() {
  const [imagePath, setImagePath] = useState(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);
  const { requestLoader } = useSelector((state) => state.homepage);
  const dispatch = useDispatch();

  function getImage(e) {
    if (e.target.files && e.target.files[0]) {
      setImagePath(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function postImage({ postType, postDescription, postData }, e) {
    e.preventDefault();
    const data = new FormData();
    data.append("postData", postData);
    data.append("postType", postType);
    data.append("postDescription", postDescription);
    const { meta } = await dispatch(createNewPost(data));
    if (meta.requestStatus === "fulfilled") {
      dispatch(imageBoardVisible());
    }
  }

  return (
    <div className="image-select">
      <div className="image-form-section">
        <form action="#" className="image-form">
          <label htmlFor="image">
            <input
              type="file"
              name="image"
              id="image"
              ref={imageRef}
              accept=".jpeg, .jpg, .png"
              onChange={getImage}
            />
            <p>Choose Image</p>
          </label>
          {imagePath && (
            <img src={imagePath} alt="selected" className="selected-image" />
          )}
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="4"
            ref={descriptionRef}
            placeholder="Image caption"
          ></textarea>
          <div className="image-form-btn">
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(imageBoardVisible());
              }}
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                postImage(
                  {
                    postType: "image",
                    postDescription: descriptionRef.current.value,
                    postData: imageRef.current.files[0],
                  },
                  e
                );
              }}
            >
              {requestLoader === "pending" ? (
                <div className="login-loader"></div>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
