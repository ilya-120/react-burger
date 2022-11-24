import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";
import { AnyAction } from "redux";
import { IProtectedRoute } from "../../utils/typeData";

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const location = useLocation();
  const { isLogin } = useSelector((state: AnyAction) => state.userData);
  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else return children;
};

export default ProtectedRoute;
