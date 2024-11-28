// PrivateRoute.tsx
import React from "react";
import Unauthorized from "./Unauthorized"; // Component to show for unauthorized access

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole: string; // Specify the role required to access the route
}

const DesignerIsApproved: React.FC<PrivateRouteProps> = ({ children }) => {
  const designer = JSON.parse(localStorage.getItem("designerDetails") || "{}");
  const isApproved = designer?.isApproved === 1; // Check if designer is approved

  // Check if user has the required role
  if ( isApproved !== true) {
    return <Unauthorized />; // Show Unauthorized component if role doesn't match
  }
  return <>{children}</>; // Render the child components if authorized
};

export default DesignerIsApproved;