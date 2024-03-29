import { getCookie } from '../../utils/cookies';
import { Navigate } from 'react-router-dom';

const ProtectedRouteElement = ({ element }) => {
  const accessToken = getCookie('accessToken');

  return accessToken?.length > 0 ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;
