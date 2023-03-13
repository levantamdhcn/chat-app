import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authSelector } from "../store/reducers/auth/selectors";
import LoadingScreen from "./LoadingScreen";

const AuthGuard = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { isAuthenticated, user, isFetching } = useSelector(authSelector).auth;

  const location = useLocation();

  return isFetching ? (
    <LoadingScreen />
  ) : isAuthenticated && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : isAuthenticated && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthGuard;
