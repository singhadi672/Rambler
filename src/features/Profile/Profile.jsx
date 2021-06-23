import React from "react";
import { useSelector } from "react-redux";
import { ProfileNav } from "../index";
import { ProfileInfo } from "../index";
import "./Profile.css";
import { ProfileEdit } from "../index";

export default function Profile() {
  const { toggleProfileEdit } = useSelector((state) => state.profile);
  return (
    <div className="profile">
      <ProfileNav />
      <div className="profile-content">
        <ProfileInfo />
        {toggleProfileEdit && <ProfileEdit />}
      </div>
    </div>
  );
}
