import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notificationRoute } from "../../util/notificationRoute";
import { clearNotification } from "../Homepage/homepageSlice";
import "./Notification.css";

export default function Notification() {
  const { notifications } = useSelector((state) => state.homepage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function notificationHandler(notification) {
    const { meta } = await dispatch(clearNotification(notification._id));
    if (meta.requestStatus === "fulfilled") {
      navigate(notificationRoute(notification));
    }
  }
  return (
    <div className="notification-main">
      <div className="notifications">
        {notifications &&
          notifications.map((notification) => (
            <div
              className="notification-body"
              onClick={() => notificationHandler(notification)}
            >
              <div className="notification-user">
                <img src={notification.sourceUser.profilePicture} alt="" />
              </div>
              <div className="notification-text">
                <p>
                  {notification.sourceUser.username}{" "}
                  {notification.notificationText}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
