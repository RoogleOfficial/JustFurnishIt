import React from "react";
interface PrivateRouteProps {
    children: React.ReactNode;
    requiredRole: string;
}
declare const AuthPrivateRoute: React.FC<PrivateRouteProps>;
export default AuthPrivateRoute;
