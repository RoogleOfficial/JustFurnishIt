import React, { useEffect, useState } from 'react';
import { getDesigners, approveDesigner, rejectDesigner } from '../../../Services/AdminService';

const ApproveDesignerList: React.FC = () => {
  const [designers, setDesigners] = useState<any[]>([]);

  useEffect(() => {
    fetchUnapprovedDesigners();
  }, []);

  const fetchUnapprovedDesigners = async () => {
    try {
      const data = await getDesigners();
      // Filter designers to get only unapproved ones
      const unapprovedDesigners = data.filter((designer: { isApproved: any; }) => !designer.isApproved);
      setDesigners(unapprovedDesigners); // Set state with unapproved designers
    } catch (error) {
      console.error('Error fetching designers:', error);
    }
  };

  const approveDesignerHandler = async (designerId: number) => {
    try {
      await approveDesigner(designerId);
      setDesigners((prevDesigners) =>
        prevDesigners.filter((designer) => designer.designerId !== designerId)
      );
    } catch (error) {
      console.error('Error approving designer:', error);
    }
  };

  const rejectDesignerHandler = async (designerId: number) => {
    try {
      await rejectDesigner(designerId);
      setDesigners((prevDesigners) => prevDesigners.filter((designer) => designer.designerId !== designerId));
    } catch (error) {
      console.error('Error rejecting designer:', error);
    }
  };

  return (
    <div className="p-6 bg-white pt-[6.5rem] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Pending Designers Approval</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">

            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Specialization</th>
            <th className="py-2 px-4 border-b text-left">Portfolio</th>
            <th className="py-2 px-4 border-b text-left">Bio</th>
            <th className="py-2 px-4 border-b text-left">Certificatons</th>
            <th className="py-2 px-4 border-b text-left">Experience</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {designers.map((designer) => (
            <tr key={designer.designerId} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{designer.firstName}</td>
              <td className="py-2 px-4 border-b">{designer.email}</td>
              <td className="py-2 px-4 border-b">{designer.specialization}</td>
              <td className="py-2 px-4 border-b truncate max-w-xs">
                <a href={designer.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Portfolio
                </a>
              </td>
              <td className="py-2 px-4 border-b">{designer.bio}</td>
              <td className="py-2 px-4 border-b">{designer.certifications}</td>
              <td className="py-2 px-4 border-b">{designer.experienceYears}</td>
              <td className="py-2 px-4 border-b">
              <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => approveDesignerHandler(designer.designerId)}
                    className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectDesignerHandler(designer.designerId)}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveDesignerList;
