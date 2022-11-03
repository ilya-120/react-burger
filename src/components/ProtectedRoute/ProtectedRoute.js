import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { isLogin } = useSelector((state => state.userData))
  if (!isLogin) { return <Navigate to='/login' state={{ from: location }} /> }
  else return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
