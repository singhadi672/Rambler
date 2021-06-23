import { useState } from "react";
import { useRef } from "react";
import { editProfile, toggleProfileEdit } from "../profileSlice";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileEdit.css";
import { Loader } from "../../index";

export default function ProfileEdit() {
  const { userAccount, profileLoader } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const [imagePath, setImagePath] = useState(userAccount.user.profilePicture);
  const bioRef = useRef(null);
  const passwordRef = useRef(null);
  const profilePictureRef = useRef(null);

  function getImage(e) {
    if (e.target.files && e.target.files[0]) {
      setImagePath(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function editProfileHandler({
    username,
    password,
    accountDescription,
    profilePicture,
  }) {
    const data = new FormData();
    data.append("password", password);
    data.append("username", username);
    data.append("accountDescription", accountDescription);
    data.append("profilePicture", profilePicture);
    const { meta } = await dispatch(editProfile(data));
    if (meta.requestStatus === "fulfilled") {
      dispatch(toggleProfileEdit());
    }
  }

  return (
    <div className="profile-edit-main">
      <div className="profile-edit">
        <div className="edit-profile-image">
          <img src={imagePath} alt="profile" />
          <label>
            <input
              type="file"
              name=""
              id=""
              ref={profilePictureRef}
              accept=".jpeg, .jpg, .png"
              onChange={getImage}
            />
            <p>Change Profile Pic</p>
          </label>
        </div>
        <div className="edit-username">
          <label htmlFor="edit-username">Username</label>
          <input
            type="text"
            name="edit-username"
            ref={usernameRef}
            defaultValue={userAccount.user.username}
          />
        </div>
        <div className="edit-bio">
          <label htmlFor="edit-bio">Bio</label>
          <input
            type="text"
            maxLength={45}
            name="edit-bio"
            ref={bioRef}
            defaultValue={userAccount.accountDescription}
          />
        </div>
        <div className="edit-password">
          <label htmlFor="edit-password">Password</label>
          <input type="password" name="edit-bio" ref={passwordRef} />
        </div>
        <div className="profile-edit-btn">
          <button onClick={() => dispatch(toggleProfileEdit())}>Cancel</button>
          <button
            onClick={() =>
              editProfileHandler({
                username: usernameRef.current.value,
                accountDescription: bioRef.current.value,
                password: passwordRef.current.value,
                profilePicture: profilePictureRef.current.files[0],
              })
            }
          >
            {profileLoader === "pending" ? <Loader /> : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
