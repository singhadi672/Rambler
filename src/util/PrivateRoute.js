import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({ path, ...props }) => {
  const { login } = useSelector((state) => state.auth);
  return login ? (
    <Route exact {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} to="/login" replace/>
  );
};
