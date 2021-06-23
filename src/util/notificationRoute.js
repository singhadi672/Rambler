export function notificationRoute(notification) {
  const route = notification.type;
  switch (route) {
    case "new post":
      return `/post/${notification.postId}`;
    case "like":
      return `/post/${notification.postId}`;
    case "comment":
      return `/comment/${notification.postId}`;
    default:
      return "/";
  }
}
