import React from 'react';

interface DashboardOverviewProps {
  totalUsers: number;
  totalDesigners: number;
  pendingApprovals: number;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ totalUsers, totalDesigners, pendingApprovals }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <section className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Total Users</h2>
        <p className="text-3xl font-bold text-red-500 mt-4">{totalUsers}</p>
      </section>
      <section className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Total Designers</h2>
        <p className="text-3xl font-bold text-blue-500 mt-4">{totalDesigners}</p>
      </section>
      <section className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Pending Approvals</h2>
        <p className="text-3xl font-bold text-yellow-500 mt-4">{pendingApprovals}</p>
      </section>
    </div>
  );
};

export default DashboardOverview;
