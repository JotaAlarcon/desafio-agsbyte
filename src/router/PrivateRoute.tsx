import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { state } = useLocation();
  return state?.logged ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
