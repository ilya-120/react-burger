import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";
import { IProtectedRoute } from "../../utils/typeData";
import { RootState } from "../../services/reducers";

const ProtectedRouteOnLogin: FC<IProtectedRoute> = ({ children }) => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const { isLogin } = useSelector((state: RootState) => state.userData);
  if (isLogin) {
    return <Navigate to={fromPage} state={{ from: location }} />;
  } else return children;
};

export default ProtectedRouteOnLogin;
