// PrivateRoute.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";
import Unauthorized from "./Unauthorized"; // Component to show for unauthorized access

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole: string; // Specify the role required to access the route
}

const AuthPrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const userRole = userDetails?.role;

  // Check if user has the required role
  if (userRole !== requiredRole) {
    return <Unauthorized />; // Show Unauthorized component if role doesn't match
  }

  return <>{children}</>; // Render the child components if authorized
};

export default AuthPrivateRoute;