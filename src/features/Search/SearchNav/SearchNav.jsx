import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./SearchNav.css";

export default function ProfileNav() {
  return (
    <>
      <div className="search-nav">
        <div className="search-heading">
          <h2>Search</h2>
        </div>
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </>
  );
}
