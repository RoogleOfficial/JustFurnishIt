import React from "react";
interface PrivateRouteProps {
    children: React.ReactNode;
    requiredRole: string;
}
declare const DesignerIsApproved: React.FC<PrivateRouteProps>;
export default DesignerIsApproved;
