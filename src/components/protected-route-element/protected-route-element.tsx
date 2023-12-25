import { getCookie } from '../../utils/cookies';
import { Navigate } from 'react-router-dom';
import { FC } from 'react';

type TProtectedRouteElement = {
  element: JSX.Element;
};

const ProtectedRouteElement: FC<TProtectedRouteElement> = ({ element }) => {
  const accessToken = getCookie('accessToken');

  return accessToken && accessToken.length > 0 ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;
