import { useSelector } from "react-redux";
import { getCookie } from "../../utils/cookies";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element }) => {
  const { user } = useSelector(state => state.user)
  const accessToken = getCookie('accessToken')

  if (!user) {
    return null;
  }

  return accessToken.length > 0 ? element : <Navigate to='/login' replace />;
}

export default ProtectedRouteElement;