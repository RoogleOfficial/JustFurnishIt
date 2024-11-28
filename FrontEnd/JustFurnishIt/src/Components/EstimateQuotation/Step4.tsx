import axios from "axios";
import React, { useEffect, useState } from "react";
import {useParams } from "react-router";
import { DesignData, Measurement, PackageData, QuoteData, QuoteDTO, SubscribtionPlan } from "../../Types/EstimateQuotation";

interface Step4Props {
  quoteData: QuoteData;
  updateQuoteData: (section: keyof QuoteData, data: Partial<PackageData> | Partial<DesignData> | Partial<Measurement> | Partial<SubscribtionPlan>| string) => void;
}

const Step4: React.FC<Step4Props> = ({ quoteData, updateQuoteData }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("basic");
 console.log(quoteData)
  
  const {id} = useParams();
  const area = quoteData.srqFeet.length * quoteData.srqFeet.width;
  console.log("area in step4 ",area)
  const [quote, setQuote] = useState<QuoteDTO | null>(null);
  quote;
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get<QuoteDTO>(
          `https://localhost:7260/api/Quotes/byDesignId/${id}`
        );
        console.log(response.data)
        setQuote(response?.data);
      } catch (err) {
        console.error("Error fetching quote data:", err);
      }
    };

    fetchQuote();
  }, []);


  const subscriptionPlans = [
    {
      name: "basic",
      description: `Our base package with essential solutions for all your ${quoteData.designData?.category} interiors needs.`,
      features: ["Affordable pricing", "Convenient designs", "Basic accessories"],
      pricePerSquareFeet: (quoteData.scope.DesignType === "new")?(0.5* area | 0):(0.4 * area | 0),
    },
    {
      name: "intermediate",
      description: `Our superior package offering solutions to take your ${quoteData.designData?.category} interiors to the next level.`,
      features: ["Mid-range pricing", "Premium designs", "Wide range of accessories"],
      pricePerSquareFeet:(quoteData.scope.DesignType === "new")?(0.7* area | 0):(0.5 * area | 0),
    },
    {
      name: "premium",
      description: `Our high-end package for the ultimate ${quoteData.designData?.category} interiors experience.`,
      features: ["Elite pricing", "Lavish designs", "Extensive range of accessories"],
      pricePerSquareFeet:(quoteData.scope.DesignType === "new")?(0.9* area | 0):(0.7 * area | 0),
    },
  ];

  const handleSelectPlan = (planName: any) => {
    setSelectedPlan(planName);
    updateQuoteData("subscribtionPlan", { ...quoteData.subscribtionPlan,planType:planName}); // Pass planName as a string directly
  };

  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-bold mb-8">Pick your package</h2>
      <div className="flex justify-center space-x-4">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 border rounded-lg shadow-md w-72 cursor-pointer ${
              selectedPlan === plan.name ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            onClick={() => handleSelectPlan(plan.name)}
          >
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="subscription"
                  checked={selectedPlan === plan.name}
                  onChange={() => handleSelectPlan(plan.name)}
                  className="mr-2 text-red-500"
                />
                <span className="text-lg font-semibold">{plan.name}</span>
              </label>
              <span className="text-gray-400">
                {Array(3)
                  .fill("")
                  .map((_, index) => (
                    <span key={index} className="text-red-300 mr-1">&#9733;</span>
                  ))}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <ul className="list-none space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-green-500">
                  &#10003; <span className="ml-2 text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-xl font-bold mt-4">
              Total Cost: ₹{(plan.pricePerSquareFeet * area).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step4;
