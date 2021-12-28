import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { notificationBoardVisible } from "../homepageSlice";

export default function Nav() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.homepage);

  return (
    <div className="nav">
      <header className="logo">
        <h1>Rambler</h1>
      </header>
      <section className="nav-options">
        <div
          className="notification"
          onClick={() => dispatch(notificationBoardVisible())}
        >
          <FontAwesomeIcon icon={faEnvelope} />
          {notifications && (
            <sup className="notify">
              <p>{notifications && notifications.length}</p>
            </sup>
          )}
        </div>
      </section>
    </div>
  );
}
