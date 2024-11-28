import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import PlansContainer from "./DesignSubCard/RenderCard";
import { API_BASE, deleteDesign } from "../../../Services/DesignService";
import toast from "react-hot-toast";
import Spinner from "../../Spinner/Spinner";
import { getQuotesByDesignId } from "../../../Services/QuoteService";

interface Design {
  designId: number;
  designName: string;
  imageLink: string;
  dimension: string;
  pricePerSquareFeet: number;
  materialsUsed: string;
  style: string;
  color: string;
  specialFeatures: string;
  description: string;
}

interface PlanData {
  new: number;
  renew: number;
  modular: string;
  furniture: string;
  services: string;
}

interface PlansContainerProps {
  basic: PlanData;
  intermediate: PlanData;
  premium: PlanData;
}

const DesignDetails: React.FC = () => {
  const { designId } = useParams<{ designId: string }>(); // Get designId from the URL
  const [design, setDesign] = useState<Design | null>(null);
  const [designSub, setDesignSub] = useState<PlansContainerProps | null>(null);
  const [designer, setDesigner] = useState("");
  designer;
  const navigate = useNavigate();

  const fetchDesignSubscribtionDetails = async () => {
    try {
      if (designId !== null) {
        const response = await getQuotesByDesignId(designId); // Replace with your API URL
        setDesignSub(response);
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching design details:", error);
    }
  };

  useEffect(() => {
    const fetchDesignDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/${designId}`
        ); // Replace with your API URL
        setDesign(response.data);
        setDesigner(response.data.designerId);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching design details:", error);
      }
    };

    fetchDesignDetails();
    fetchDesignSubscribtionDetails();
  }, [designId]);

  if (!design) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const handleDelete = async () => {
    const res = await deleteDesign(Number(design.designId));
    if (res.status == 200) {
      toast.success("successfully deleted");
      navigate("/dashboard/myDesign");
    } else {
      toast.error("There is error");
    }
  };
  const editHandler = () => {
    navigate(`/dashboard/editDesign/${designId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-2 md:pt-[6rem] ">
      {/* Image Section (60%) */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/5 flex justify-center">
          <img
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            src={design.imageLink}
            alt={design.designName}
          />
        </div>

        {/* Details Section (40%) */}
        <div className="w-full md:w-2/5 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              {design.designName}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Dimension:</strong> {design.dimension}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Materials Used:</strong> {design.materialsUsed}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Style:</strong> {design.style}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Color:</strong> {design.color}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Special Features:</strong> {design.specialFeatures}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Price per Square Feet:</strong> ₹
              {design.pricePerSquareFeet}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <strong>Description:</strong> {design.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start gap-4 mt-4">
            <button
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
              onClick={editHandler}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
            </button>
            <button
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>
      <PlansContainer
        basic={designSub?.basic}
        intermediate={designSub?.intermediate}
        premium={designSub?.premium}
      />
    </div>
  );
};

export default DesignDetails;
