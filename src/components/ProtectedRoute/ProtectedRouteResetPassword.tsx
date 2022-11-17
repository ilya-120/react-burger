import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";

const ProtectedRouteResetPassword: FC<any> = ({ children }) => {
  const location = useLocation();
  const { forgotSuccess } = useSelector((state: any) => state.userData);
  if (!forgotSuccess) {
    return <Navigate to="/forgot-password" state={{ from: location }} />;
  } else return children;
};

export default ProtectedRouteResetPassword;
