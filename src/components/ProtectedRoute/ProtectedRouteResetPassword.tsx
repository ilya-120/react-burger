import { Navigate, useLocation } from "react-router-dom";
import { FC } from "react";
import { IProtectedRoute } from "../../utils/typeData";
import { useAppSelector } from "../../hooks/hook";

const ProtectedRouteResetPassword: FC<IProtectedRoute> = ({ children }) => {
  const location = useLocation();
  const { forgotSuccess } = useAppSelector((state) => state.userData);
  if (!forgotSuccess) {
    return <Navigate to="/forgot-password" state={{ from: location }} />;
  } else return children;
};

export default ProtectedRouteResetPassword;
