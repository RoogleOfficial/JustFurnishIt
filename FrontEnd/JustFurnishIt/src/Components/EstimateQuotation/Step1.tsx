import React from "react";
import { DesignData, PackageData, QuoteData } from "../../Types/EstimateQuotation";

interface Step1Props {
 
  quoteData: QuoteData; // Use the same QuoteData type for consistency
  updateQuoteData: (section: keyof QuoteData, data: Partial<PackageData> | Partial<DesignData> | string) => void; // Match the exact type signature from MultistepForm
}




const Step1: React.FC<Step1Props> = ({ quoteData, updateQuoteData }) => {
  return (
    <div className="w-full max-w-md md:min-h-[60vh] mx-auto p-6 bg-white rounded-lg ">
      <h2 className="text-2xl font-bold mb-4 text-center">Select your scope of work</h2>
      
      <div className="space-y-4">
        <label
          className={`block border-2 rounded-lg p-4 cursor-pointer ${
            quoteData.scope.DesignType === "new"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-300"
          }`}
        >
          <input
          
            type="radio"
            value="new"
            checked={ quoteData.scope.DesignType=== "new"}
            onChange={(e) => updateQuoteData("scope", { ...quoteData.scope, DesignType: e.target.value })}
            className="mr-3 accent-pink-500"
          />
          Interiors for new {quoteData.designData?.category}
        </label>
        <label
          className={`block border-2 rounded-lg p-4 cursor-pointer ${
            quoteData.scope.DesignType === "renovation"
              ? "border-pink-500 bg-pink-50"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            value="renovation"
            checked={ quoteData.scope.DesignType=== "renovation"}
            onChange={(e) => updateQuoteData("scope", { ...quoteData.scope, DesignType: e.target.value })}
            className="mr-3 accent-black"
          />
          Renovation of existing <span> {quoteData.designData?.category}</span>
        </label>
      </div>
    </div>
  );
};

export default Step1;
