import React from "react";
import { ViewProfileNav } from "../index";
import { ViewProfileInfo } from "../index";
import "./ViewProfile.css";

export default function Profile() {
  return (
    <div className="view-profile">
      <ViewProfileNav />
      <div className="view-profile-content">
        <ViewProfileInfo />
      </div>
    </div>
  );
}
