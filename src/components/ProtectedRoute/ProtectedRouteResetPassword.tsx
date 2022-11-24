import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";
import { AnyAction } from "redux";
import { IProtectedRoute } from "../../utils/typeData";

const ProtectedRouteResetPassword: FC<IProtectedRoute> = ({ children }) => {
  const location = useLocation();
  const { forgotSuccess } = useSelector((state: AnyAction) => state.userData);
  if (!forgotSuccess) {
    return <Navigate to="/forgot-password" state={{ from: location }} />;
  } else return children;
};

export default ProtectedRouteResetPassword;
