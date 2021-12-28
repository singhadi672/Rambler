import React, { useEffect } from "react";
import "./Video.css";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "./videoSlice";
import { Loader } from "../";
import { useNavigate } from "react-router-dom";

export default function Video() {
  const dispatch = useDispatch();
  const { videos, videoLoader } = useSelector((state) => state.video);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getVideos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="video-nav">
        <div className="video-heading">
          <h2>Rambler Watch</h2>
        </div>
      </div>
      <div className="video-main">
        {videos &&
          videos.map((video) => (
            <div className="video" key={video.items[0].id}>
              <iframe
                id="ytplayer"
                type="text/html"
                width="95%"
                title={video.items[0].snippet.title}
                height="210"
                frameBorder="0"
                src={`https://www.youtube.com/embed/${video.items[0].id}`}
              ></iframe>
              <p>{video.items[0].snippet.title}</p>
            </div>
          ))}
        <button
          className="video-btn"
          onClick={() =>
            window.open("https://wandr-view.netlify.app/", "_blank")
          }
        >
          Load More
        </button>
        {videoLoader === "pending" && <Loader />}
      </div>
    </>
  );
}
