/* eslint-disable */
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { auth } = useAuth();
  let check = false;
  const getTok = localStorage.getItem('token');
  if (auth.accessToken || getTok) {
    check = true;
  }

  return (
    <>
      {
        check 
        ? <Outlet />
        : (         
          auth?.roles?.find((role) => allowedRoles?.includes(role))
          ? <Outlet />
          : auth?.user
            ? <Navigate to="/register" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
        )
      }    
    </>
  );
};

export default RequireAuth;
