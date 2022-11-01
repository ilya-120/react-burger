import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = ({children}) => {
    const location = useLocation()
    const {isLogin} = useSelector((state => state.userData))
    if (!isLogin)
    {return <Navigate to='/login' state={{from: location}}/>}
    else return children;
};

export default ProtectedRoute;
