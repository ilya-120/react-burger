import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRouteResetPassword = ({ children }) => {
  const location = useLocation()
  const { forgotSuccess } = useSelector((state => state.userData))
  if (!forgotSuccess) { return <Navigate to='/forgot-password' state={{ from: location }} /> }
  else return children;
};

ProtectedRouteResetPassword.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRouteResetPassword;
