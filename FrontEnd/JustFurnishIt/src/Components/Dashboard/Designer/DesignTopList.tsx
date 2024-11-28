import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDesignsByDesignerId } from "../../../Services/DesignService";

interface Design {
  designId: number;
  designerId: number;
  designName: string;
  imageLink: string;
}

const DesignTopList: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);

  const designer = JSON.parse(localStorage.getItem('designerDetails') || '{}');
  const designerId=designer.designerId; 
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await getDesignsByDesignerId(designerId)
        // const data = [response.data];
        const limitedData = response.slice(0, 3);
        setDesigns(limitedData);
        
      } catch (error) {
        console.error("Error fetching designs:", error);
      }
    };

    fetchDesigns();
  }, []);

  return (
    <div className="w-full mx-auto md:pt-[1rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     
      {designs.map((design) => (
        <Link
          key={design.designId}
          to={`/dashboard/myDesign`}
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

export default DesignTopList;
