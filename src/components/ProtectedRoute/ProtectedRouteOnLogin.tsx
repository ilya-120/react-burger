import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";

const ProtectedRouteOnLogin: FC<any> = ({ children }) => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const { isLogin } = useSelector((state: any) => state.userData);
  if (isLogin) {
    return <Navigate to={fromPage} state={{ from: location }} />;
  } else return children;
};

export default ProtectedRouteOnLogin;
