import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./RamblerMapsNav.css";

export default function RamblerMapsNav() {
  return (
    <div className="rambler-map-nav">
      <div className="rambler-map-heading">
        <h2>Rambler Maps</h2>
      </div>
      <FontAwesomeIcon icon={faEllipsisV} />
    </div>
  );
}
