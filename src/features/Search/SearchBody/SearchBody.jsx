import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchBody.css";
import { getAllUsers, filterAccounts, getUserDetails } from "../searchSlice";
import { addFollowBackFunction } from "../../../util/addFollowBackFunction";
import { followUser } from "../../Profile/profileSlice";
import { useNavigate } from "react-router-dom";

export default function SearchBody() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { followLoader } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { userAccount, filteredAccounts } = useSelector(
    (state) => state.search
  );

  return (
    <div className="search-body">
      <div className="search-bar">
        <button>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search by username"
          onChange={(e) => {
            dispatch(filterAccounts(e.target.value));
          }}
          maxLength={35}
        />
      </div>
      <div className="search-result">
        {filteredAccounts &&
          filteredAccounts.map((user) =>
            user._id !== (userAccount && userAccount.user._id) ? (
              <div className="search-user">
                <div onClick={() => navigate(`/profile/${user._id}`)}>
                  <img src={user.profilePicture} alt="" />
                  <p>{user.username}</p>
                </div>
                {addFollowBackFunction(
                  user._id,
                  userAccount && userAccount.following
                ) ? (
                  <button style={{ background: "var(--button-bg-secondary)" }}>
                    Following
                  </button>
                ) : (
                  <button
                    style={{
                      background: "var(--button-bg-primary)",
                      pointerEvents: followLoader === "pending" ? "none" : null,
                    }}
                    onClick={() => dispatch(followUser(user._id))}
                  >
                    {followLoader === "pending" ? (
                      <div className="login-loader"></div>
                    ) : (
                      "follow"
                    )}
                  </button>
                )}
              </div>
            ) : null
          )}
      </div>
    </div>
  );
}
