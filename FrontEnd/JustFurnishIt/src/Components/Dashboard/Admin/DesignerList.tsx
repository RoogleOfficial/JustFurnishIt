import React, { useEffect, useState } from 'react';
import { getDesigners } from '../../../Services/AdminService'; // Adjust the import path

interface Designer {
  designerId: number;
  firstName: string;
  email: string;
  specialization: string;
  experienceYears: number;
  portfolioUrl:string,
  bio:string,
  certifications:string
  isApproved: number; // Enum value: 0 for Pending, 1 for Accepted, 2 for Rejected
}

const DesignerList: React.FC = () => {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedDesigners();
  }, []);

  const fetchApprovedDesigners = async () => {
    try {
      const data = await getDesigners(); // Call the service to get designers
      const approvedDesigners = data.filter((designer: Designer) => designer.isApproved === 1); // Filter for approved designers
      setDesigners(approvedDesigners);
    } catch (error) {
      console.error('Error fetching designers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDesigners = designers.filter((designer) =>
    designer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    designer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 pt-[6.5rem] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Approved Designers</h2>
      <input
        type="text"
        placeholder="Search designers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />
      {filteredDesigners.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">#</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Specialization</th>
              <th className="py-2 px-4 border-b text-left">Portfolio</th>
              <th className="py-2 px-4 border-b text-left">Bio</th>
              <th className="py-2 px-4 border-b text-left">Certificatons</th>
              <th className="py-2 px-4 border-b text-left">Experience</th>
            </tr>
          </thead>
          <tbody>
            {filteredDesigners.map((designer, index) => (
              <tr key={designer.designerId} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{index + 1}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 text-center mt-4">No approved designers found.</p>
      )}
    </div>
  );
};

export default DesignerList;
