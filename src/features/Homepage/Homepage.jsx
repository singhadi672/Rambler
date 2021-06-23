import React from "react";
import { useSelector } from "react-redux";
import { Nav } from "../index";
import { Post } from "../index";
import { ImageSelect } from "../index";
import { Feed } from "../index";
import { Notification } from "../index";
import "./Homepage.css";

export default function Homepage() {
  const { imageBoard, notificationBoard } = useSelector(
    (state) => state.homepage
  );
  return (
    <div className="homepage">
      <Nav />
      <div className="context">
        <Post />
        <Feed />
        {imageBoard && <ImageSelect />}
        {notificationBoard && <Notification />}
      </div>
    </div>
  );
}
