import {
  faHome,
  faPlay,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Explore.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Explore() {
  const navigate = useNavigate();
  return (
    <div className="explore">
      <NavLink
        to="/"
        end
        activeClassName="explore-active"
        style={{ color: "var(--primary-accent-light-contrast)" }}
      >
        <div className="explore-item">
          <FontAwesomeIcon icon={faHome} />
        </div>
      </NavLink>
      <NavLink
        to="/search"
        activeClassName="explore-active"
        style={{ color: "var(--primary-accent-light-contrast)" }}
      >
        <div className="explore-item">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </NavLink>
      <div
        className="explore-item item-center"
        onClick={() => navigate("/ramblerMaps")}
      >
        <h2>R</h2>
      </div>
      <NavLink
        to="/videos"
        activeClassName="explore-active"
        style={{ color: "var(--primary-accent-light-contrast)" }}
      >
        <div className="explore-item">
          <FontAwesomeIcon icon={faPlay} />
        </div>
      </NavLink>
      <NavLink
        to="/profile"
        style={{ color: "var(--primary-accent-light-contrast)" }}
        activeClassName="explore-active"
      >
        <div className="explore-item">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </NavLink>
    </div>
  );
}
