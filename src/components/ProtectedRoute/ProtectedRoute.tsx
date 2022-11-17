import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";

const ProtectedRoute: FC<any> = ({ children }) => {
  const location = useLocation();
  const { isLogin } = useSelector((state: any) => state.userData);
  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else return children;
};

export default ProtectedRoute;
