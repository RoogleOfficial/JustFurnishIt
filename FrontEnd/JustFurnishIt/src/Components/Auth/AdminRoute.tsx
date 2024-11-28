import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store/Store';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { userDetails } = useSelector((state: RootState) => state.auth);

  if (userDetails?.role !== 'admin') {
    // Display an unauthorized message or redirect to a different route
    return <div>You are not authorized to view this page.</div>;
   
  }

  return <>{children}</>;
};

export default AdminRoute;

