

// export default UpdateDesigner;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../Common/IconBtn'; // Assuming IconBtn is imported from your project
import { getDesigner, updateDesigner } from '../../../Services/DesignerService';
import { Designer } from '../../../Types/DesignerTypes';


const UpdateDesigner: React.FC<{ designerId: number }> = ({ designerId }) => {
  const [designerData, setDesignerData] = useState<Designer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesigner = async () => {
      try {
        const response = await getDesigner(designerId);
        setDesignerData(response.data);
      } catch (error) {
        console.error("Error fetching designer:", error);
        setError("Failed to fetch designer details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDesigner();
  }, [designerId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (designerData) {
      setDesignerData({ ...designerData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!designerData || !designerData.designerId) {
      setError("Invalid designer information.");
      return;
    }
    try {
      await updateDesigner(designerData.designerId,designerData)
      setResponseMessage("Designer updated successfully!");
      setError(null);
    } catch (error) {
      console.error("Error updating designer:", error);
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Failed to update designer.");
      }
    }
  };

  if (loading) return <p className="text-gray-600">Loading designer data...</p>;

  return (
    <form onSubmit={handleSubmit} className="my-8 xl:w-3/5 w-full mx-auto flex flex-col gap-y-6 rounded-lg border border-gray-300 bg-white p-3 md:p-8 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>

      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="specialization" className="text-gray-900 font-medium">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            placeholder="Enter specialization"
            className="form-input rounded-md border border-gray-400 bg-white p-3 text-gray-800"
            value={designerData?.specialization || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="experienceYears" className="text-gray-900 font-medium">Experience Years</label>
          <input
            type="number"
            id="experienceYears"
            name="experienceYears"
            placeholder="Enter experience years"
            className="form-input rounded-md border border-gray-400 bg-white p-3 text-gray-800"
            value={designerData?.experienceYears || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="portfolioUrl" className="text-gray-900 font-medium">Portfolio URL</label>
        <input
          type="url"
          id="portfolioUrl"
          name="portfolioUrl"
          placeholder="Enter portfolio URL"
          className="form-input rounded-md border border-gray-400 bg-white p-3 text-gray-800"
          value={designerData?.portfolioUrl || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="bio" className="text-gray-900 font-medium">Bio</label>
        <input
          type="text"
          id="bio"
          name="bio"
          placeholder="Enter bio"
          className="form-input rounded-md border border-gray-400 bg-white p-3 text-gray-800"
          value={designerData?.bio || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="certifications" className="text-gray-900 font-medium">Certifications</label>
        <input
          type="text"
          id="certifications"
          name="certifications"
          placeholder="Enter certifications"
          className="form-input rounded-md border border-gray-400 bg-white p-3 text-gray-800"
          value={designerData?.certifications || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate("/dashboard/profile")}
          className="cursor-pointer rounded-md bg-gray-800 py-2 px-5 font-semibold text-white hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save" onclick={() => { navigate(-1)}} />
      </div>

      {responseMessage && <p className="mt-4 text-green-600">{responseMessage}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </form>
  );
};

export default UpdateDesigner;

