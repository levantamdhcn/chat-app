import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "./LoadingScreen";

const AuthGuard = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { isAuthenticated, user, isFetching } = useAuth();

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
