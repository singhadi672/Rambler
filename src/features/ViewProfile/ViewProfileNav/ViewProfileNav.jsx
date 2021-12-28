import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ViewProfileNav.css";

export default function ProfileNav() {
  return (
    <div className="view-profile-nav">
      <div className="view-profile-heading">
        <h2>View Profile</h2>
      </div>
      <FontAwesomeIcon icon={faEllipsisV} />
    </div>
  );
}
