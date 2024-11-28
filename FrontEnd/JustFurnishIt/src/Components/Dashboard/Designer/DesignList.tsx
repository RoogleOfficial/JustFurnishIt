import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import { getDesignsByDesignerId } from "../../../Services/DesignService";

interface Design {
  designId: number;
  designerId: number;
  designName: string;
  imageLink: string;
}

const DesignListData: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const designer = JSON.parse(localStorage.getItem('designerDetails') || '{}');
  const designerId=designer.designerId; 
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await getDesignsByDesignerId(designerId)

        // Replace with your API URL
        setDesigns(response);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching designs:", error);
        setLoading(false);

      }
    };

    fetchDesigns();
  }, []);
  if (loading) {
    return <div>< Spinner /></div>;
  }
  return (
    <div className="max-w-6xl mx-auto md:pt-[5rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {designs[0] ? (
        <div className="flex items-center justify-center bg-richblack-600  rounded-lg text-richblack-100">
          <h1 className="flex items-center justify-center font-bold text-4xl">
            My Design
          </h1>
        </div>
      ) : (
        <div className="w-[50vw]  h-[70vh]">
          <div className="flex items-center justify-center w-full h-full">
            <h1 className="text-4xl font-bold text-richblack-300">
              No Design Found
            </h1>
          </div>
        </div>
      )}

      {designs.map((design) => (
        <Link
          key={design.designId}
          to={`/dashboard/myDesign/${design.designId}`}
          className="no-underline"
        >
          <div className="bg-white shadow-md rounded-lg h-full overflow-hidden transition-transform duration-300 hover:scale-105">
            <img
              className="w-full h-60 object-cover"
              src={design.imageLink}
              alt={design.designName}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {design.designName}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DesignListData;
