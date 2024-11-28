import React from "react";
import { DesignData, Measurement, PackageData, QuoteData } from "../../Types/EstimateQuotation";

interface Step6Props {
  quoteData: QuoteData;
  updateQuoteData: (
    section: keyof QuoteData,
    data: Partial<PackageData> | Partial<DesignData> | Partial<Measurement> | string
  ) => void;
}

const Step6: React.FC<Step6Props> = ({ quoteData, updateQuoteData }) => {
  return (
    <div className="w-full max-w-md md:min-h-[60vh] mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Enter Room Dimensions</h2>

      <div className="space-y-4">
        <label className="block text-lg font-semibold mb-2">Length (L)</label>
        <input
          type="number"
          value={quoteData.srqFeet.length}
          onChange={(e) =>
            updateQuoteData("srqFeet", { ...quoteData.srqFeet, length: parseFloat(e.target.value)})
          }
          placeholder="Enter length in feet"
          className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg text-gray-700"
        />

        <label className="block text-lg font-semibold mb-2">Width (W)</label>
        <input
          type="number"
          value={quoteData.srqFeet.width}
          onChange={(e) =>
            updateQuoteData("srqFeet", { ...quoteData.srqFeet, width: parseFloat(e.target.value)})
          }
          placeholder="Enter width in feet"
          className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg text-gray-700"
        />

        <div className="mt-4 text-lg font-semibold">
          Total Area (A): {quoteData.srqFeet.length * quoteData.srqFeet.width || 0} sq ft Total
        </div>
      </div>
    </div>
  );
};

export default Step6;
