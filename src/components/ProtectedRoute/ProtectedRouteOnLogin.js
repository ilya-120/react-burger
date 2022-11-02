import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRouteOnLogin = ({ children }) => {
  const location = useLocation()
  const { isLogin } = useSelector((state => state.userData))
  if (isLogin) { return <Navigate to='/' state={{ from: location }} /> }
  else return children;
};

ProtectedRouteOnLogin.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRouteOnLogin;
