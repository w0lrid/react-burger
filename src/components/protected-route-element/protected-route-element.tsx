import { getCookie } from '../../utils/cookies';
import { Navigate } from 'react-router-dom';
import { FC, ReactNode } from 'react';

type TProtectedRouteElement = {
  element: ReactNode;
};

// @ts-ignore
const ProtectedRouteElement: FC<TProtectedRouteElement> = ({ element }) => {
  const accessToken = getCookie('accessToken');

  return accessToken && accessToken.length > 0 ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;
