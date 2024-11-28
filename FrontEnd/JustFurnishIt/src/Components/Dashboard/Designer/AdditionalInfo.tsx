import React, { useEffect, useState } from 'react';
import { RiEditBoxLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { getDesigner } from '../../../Services/DesignerService';

interface Designer {
  DesignerId: number;
  UserId: number;
  specialization: string;
  experienceYears: number;
  portfolioUrl: string;
  bio: string;
  isApproved: number;
  certifications?: string;
}

interface DesignerDisplayProps {
  designerId: number;
}

const DesignerDisplay: React.FC<DesignerDisplayProps> = ({ designerId }) => {

  const [designer, setDesigner] = useState<Designer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Dummy Data as Fallback
  const dummyDesigner: Designer = {
    DesignerId: 0,
    UserId: 0,
    specialization: 'Interior Design',
    experienceYears: 5,
    portfolioUrl: 'https://via.placeholder.com/100',
    bio: 'Experienced designer specializing in modern interiors and minimalistic aesthetics.',
    isApproved: 1,
    certifications: 'Certified Interior Designer (CID)',
  };

  useEffect(() => {
    const fetchDesigner = async () => {
      try {
        setLoading(true);
        const response:any = await getDesigner(designerId);
        console.log("designer",response)
        setDesigner(response.data || dummyDesigner);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Failed to load designer details:', error);
        setDesigner(dummyDesigner); // Set dummy data if API call fails
        setError('Failed to load designer details. Displaying dummy data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDesigner();
  }, [designerId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full pb-6 md:pb-12 mx-auto">
      
      {/* Profile Information Section */}
      <div className="w-full flex flex-col gap-y-6 rounded-lg border border-gray-200 bg-white p-2 md:p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold text-black">
          Additional  Information
          </h2>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate('/dashboard/setting')}
              className="flex items-center gap-2 px-4 py-2 bg-richblack-700 text-white rounded-md hover:bg-blue-700"
            >
              <RiEditBoxLine />
              Edit
            </button>
          </div>
        </div>

        {/* Profile fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[
            { label: 'Specialization', value: designer?.specialization || 'N/A' },
            { label: 'Experience Years', value: designer?.experienceYears || 'N/A' },
            { label: 'Portfolio URL', value: designer?.portfolioUrl || 'N/A' },
            { label: 'Bio', value: designer?.bio || 'N/A' },
            { label: 'Certifications', value: designer?.certifications || 'None' },
            { label: 'Approval Status', value: designer?.isApproved ? "Approved" : "Pending" },
          ].map(({ label, value }, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="text-black font-medium">{label}</label>
              <p className="text-gray-500">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Error message if data couldn't be loaded */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default DesignerDisplay;
