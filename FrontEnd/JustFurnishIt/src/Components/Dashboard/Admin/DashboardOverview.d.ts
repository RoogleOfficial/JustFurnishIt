import React from 'react';
interface DashboardOverviewProps {
    totalUsers: number;
    totalDesigners: number;
    pendingApprovals: number;
}
declare const DashboardOverview: React.FC<DashboardOverviewProps>;
export default DashboardOverview;
