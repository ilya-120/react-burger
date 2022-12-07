import { Navigate, useLocation } from "react-router-dom";
import { FC } from "react";
import { IProtectedRoute } from "../../utils/typeData";
import { useAppSelector } from "../../hooks/hook";

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const location = useLocation();
  const { isLogin } = useAppSelector((state) => state.userData);
  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else return children;
};

export default ProtectedRoute;
