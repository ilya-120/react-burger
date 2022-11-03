import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRouteOnLogin = ({ children }) => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const { isLogin } = useSelector((state => state.userData))
  if (isLogin) { return <Navigate to={fromPage} state={{ from: location }} /> }
  else return children;
};

ProtectedRouteOnLogin.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRouteOnLogin;
