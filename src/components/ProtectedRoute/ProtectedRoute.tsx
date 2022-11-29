import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";
import { IProtectedRoute } from "../../utils/typeData";
import { RootState } from "../../services/reducers";

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const location = useLocation();
  const { isLogin } = useSelector((state: RootState) => state.userData);
  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else return children;
};

export default ProtectedRoute;
