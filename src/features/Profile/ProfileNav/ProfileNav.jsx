import { faEllipsisV, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../User/authSlice";
import { toggleLogout } from "../profileSlice";
import "./ProfileNav.css";

export default function ProfileNav() {
  const dispatch = useDispatch();
  const { toggleLogout: logout } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(userLogout());
    navigate("/login");
  }
  return (
    <div className="profile-nav">
      <div className="profile-heading">
        <h2>Your Profile</h2>
      </div>
      <FontAwesomeIcon
        icon={faEllipsisV}
        onClick={() => dispatch(toggleLogout())}
      />
      {logout && (
        <div className="profile-option">
          <div className="logout-option" onClick={logoutHandler}>
            <p>Log Out</p>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </div>
        </div>
      )}
    </div>
  );
}
