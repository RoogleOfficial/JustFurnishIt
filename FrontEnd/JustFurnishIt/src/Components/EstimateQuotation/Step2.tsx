import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { DesignData, Measurement, PackageData, QuoteDTO } from "../../Types/EstimateQuotation";



interface SubscribtionPlan {
  planType: "basic" | "intermediate" | "premium";
}



interface QuoteData {
  scope: any;
  designData: DesignData | null;
  srqFeet: Measurement;
  basic: PackageData;
  intermediate: PackageData;
  premium: PackageData;
  subscribtionPlan: SubscribtionPlan;
}



interface Step2Props {
  quoteData: QuoteData;
  updateQuoteData: (
    section: keyof QuoteData,
    data:
      | Partial<PackageData>
      | Partial<DesignData>
      | Partial<Measurement>
      | string
  ) => void;
}

const Step2: React.FC<Step2Props> = ({ quoteData}) => {
  const designId = "202";
  const navigate = useNavigate();
  const [quote, setQuote] = useState<QuoteDTO | null>(null);
  const [showSummary, setShowSummary] = useState(true);

  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  
  const calculateEstimate = () => {
    const area = quoteData.srqFeet.length * quoteData.srqFeet.width;
    let totalCost = 0;
    if(quoteData.subscribtionPlan.planType === "basic"){
      totalCost = Number((quoteData.scope.DesignType === "new")?((0.5* area) * area | 0).toFixed(2):((0.4 * area) * area | 0).toFixed(2))
    }else if(quoteData.subscribtionPlan.planType === "intermediate"){
      totalCost =Number((quoteData.scope.DesignType === "new")?((0.7* area) * area | 0).toFixed(2):((0.5 * area) * area | 0).toFixed(2))
    }else{
      totalCost = Number((quoteData.scope.DesignType === "new")?((0.9* area) * area | 0).toFixed(2):((0.7 * area) * area | 0).toFixed(2))
    }
    return totalCost;
  };

  const totalCost = calculateEstimate();

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get<QuoteDTO>(
          `https://localhost:7260/api/Quotes/byDesignId/${designId}`
        );
        setQuote(response?.data);
      } catch (err) {
        console.error("Error fetching quote data:", err);
      }
    };

    fetchQuote();
  }, []);

  // Get selected package based on `planType`
  const planType = quoteData.subscribtionPlan.planType;
  const selectedPackage = quote ? quote[planType] : null;

  // Function to download the current page content as a PDF
  const downloadPDF = () => {
    const element = document.getElementById("quote-content");
    const options = {
      margin: 1,
      filename: `Quotation_${designId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div
      id="quote-content"
      className="container p-6 mx-auto bg-white rounded-lg shadow-md flex flex-col lg:flex-row gap-6 pt-[2rem] md:pt-[2rem]"
    >
      
      {/* Details Section */}
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Your Estimated {quoteData.designData?.category} Interiors Cost
        </h2>

        <div className="p-4 border-2 border-gray-300 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-pink-500">
              {quoteData.designData?.designName || "N/A"}
            </h3>
            <p className="text-pink-500 text-2xl font-bold">
              ₹{totalCost.toLocaleString()}*
            </p>
          </div>

          <p className="text-gray-500 mb-4">
            {quoteData.designData?.description || "No description available."}
          </p>

          {/* Display Selected Plan */}
          <div className="mb-4">
            <strong>Selected Plan:</strong> {planType}
          </div>
          <div className="mb-2">
            <strong>Scope:</strong> {quoteData.scope.DesignType || "N/A"}
          </div>
          <div className="mb-2">
            <strong>Room Dimensions:</strong> {quoteData.srqFeet.length} x{" "}
            {quoteData.srqFeet.width} ft
          </div>

          {/* Display Selected Package Details */}
          {selectedPackage && (
            <>
              <div className="mb-2">
                <strong>Modular:</strong> {selectedPackage.modular}
              </div>
              <div className="mb-2">
                <strong>Furniture:</strong> {selectedPackage.furniture}
              </div>
              <div className="mb-2">
                <strong>Services:</strong> {selectedPackage.services}
              </div>
            </>
          )}

          <div className="mb-4">
            <strong>Materials Used:</strong>{" "}
            {quoteData.designData?.materialsUsed || "N/A"}
          </div>
          <div className="mb-4">
            <strong>Category:</strong> {quoteData.designData?.category || "N/A"}
          </div>

          {showSummary ? (
            <>
             
              <div className="mb-4">
                <strong>Style:</strong> {quoteData.designData?.style || "N/A"}
              </div>
              <div className="mb-4">
                <strong>Color:</strong> {quoteData.designData?.color || "N/A"}
              </div>
              <div className="mb-4">
                <strong>Special Features:</strong>{" "}
                {quoteData.designData?.specialFeatures || "N/A"}
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Toggle Button */}
          <button
            className="text-pink-500 mt-4 focus:outline-none"
            onClick={toggleSummary}
          >
            {showSummary ? "Hide Summary ▲" : "Show Summary ▼"}
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-gray-500 text-sm mt-4">
          *This is only an indicative price based on our clients' average
          spends. The final price can be higher or lower depending on factors
          like finish material, number of furniture, civil work required
          (painting, flooring, plumbing, etc.), design elements, and wood type.
          Our designers can help you understand this better.
        </p>

        {/* Back Button */}
        <button
          className="mt-4 bg-pink-500 text-white px-4 py-2 mr-5 rounded-lg"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

        {/* Download Button */}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={downloadPDF}
        >
          Download Quotation
        </button>
      </div>
    </div>
  );
};

export default Step2;
