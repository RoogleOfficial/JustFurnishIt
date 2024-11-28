import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import { getUsers, getDesigners } from '../../../Services/AdminService';

const AdminDashboard1: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalDesigners, setTotalDesigners] = useState<number>(0);
  const [pendingApprovals, setPendingApprovals] = useState<number>(0);
  const [users, setUsers] = useState<any[]>([]);
  const [designers, setDesigners] = useState<any[]>([]); // Approved designers only
  const [unapprovedDesigners, setUnapprovedDesigners] = useState<any[]>([]); // Separate state for unapproved designers

  const navigate = useNavigate();

  const capitalizeFirstLetter = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch users
      const usersData = await getUsers();
      setUsers(usersData.slice(0, 2)); // Show top 2 users initially
      setTotalUsers(usersData.length);

      // Fetch designers
      const designersData = await getDesigners();

      // Filter designers by approval status
      const approvedDesigners = designersData.filter(
        (designer: { isApproved: number }) => designer.isApproved === 1 // Only approved designers
      );
      const unapprovedDesignersList = designersData.filter(
        (designer: { isApproved: number }) => designer.isApproved === 0 // Pending designers
      );

      // Set the state with the filtered data
      setDesigners(approvedDesigners.slice(0, 2)); // Show top 2 approved designers
      setTotalDesigners(approvedDesigners.length); // Total count of approved designers
      setUnapprovedDesigners(unapprovedDesignersList.slice(0, 2)); // Show top 2 unapproved designers
      setPendingApprovals(unapprovedDesignersList.length); // Set pending approvals count
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const handleViewAllUsers = () => {
    navigate('/dashboard/user');
  };

  const handleViewAllDesigners = () => {
    navigate('/dashboard/designers', { state: { designers } });
  };

  const handleViewAllPendingApprovals = () => {
    navigate('/dashboard/pending-approvals', { state: { unapprovedDesigners } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 pt-[7rem]">
      <DashboardOverview
        totalUsers={totalUsers}
        totalDesigners={totalDesigners}
        pendingApprovals={pendingApprovals}
      />

      {/* Pending Designer Approval Section */}
      <div className="p-6 bg-white rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-bold mb-4">Pending Designer Approvals</h2>
        {unapprovedDesigners.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Specialization</th>
                <th className="py-2 px-4 border-b text-left">Experience </th>
              </tr>
            </thead>
            <tbody>
              {unapprovedDesigners.map((designer) => (
                <tr key={designer.designerId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{capitalizeFirstLetter(designer.firstName)}</td>
                  <td className="py-2 px-4 border-b">{designer.email}</td>
                  <td className="py-2 px-4 border-b">{capitalizeFirstLetter(designer.specialization)}</td>
                  <td className="py-2 px-4 border-b">{designer.experienceYears}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No pending designer approvals at the moment.</p>
        )}
        {pendingApprovals > 0 && (
          <div className="mt-4">
            <button
              onClick={handleViewAllPendingApprovals}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              View All Pending Approvals
            </button>
          </div>
        )}
      </div>

      {/* Display Top 2 Users */}
      <div className="p-6 bg-white rounded-lg shadow-lg mt-6">
        <h3 className="text-lg font-semibold mb-4">Top Users</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{capitalizeFirstLetter(user.firstName)}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{capitalizeFirstLetter(user.role)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleViewAllUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
        >
          View All Users
        </button>
      </div>

      {/* Display Top 2 Designers */}
      <div className="p-6 bg-white rounded-lg shadow-lg mt-6">
        <h3 className="text-lg font-semibold mb-4">Top Designers</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Specialization</th>
              <th className="py-2 px-4 border-b text-left">Experience </th>
            </tr>
          </thead>
          <tbody>
          {designers.slice(0, 2).map((designer) => (
              <tr key={designer.designerId} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{designer.firstName}</td>
                <td className="py-2 px-4 border-b">{designer.email}</td>
                <td className="py-2 px-4 border-b">{designer.specialization}</td>
                <td className="py-2 px-4 border-b">{designer.experienceYears}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleViewAllDesigners}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4"
        >
          View All Designers
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard1;
