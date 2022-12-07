import { Navigate, useLocation } from "react-router-dom";
import { FC } from "react";
import { IProtectedRoute } from "../../utils/typeData";
import { useAppSelector } from "../../hooks/hook";

const ProtectedRouteOnLogin: FC<IProtectedRoute> = ({ children }) => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const { isLogin } = useAppSelector((state) => state.userData);
  if (isLogin) {
    return <Navigate to={fromPage} state={{ from: location }} />;
  } else return children;
};

export default ProtectedRouteOnLogin;
