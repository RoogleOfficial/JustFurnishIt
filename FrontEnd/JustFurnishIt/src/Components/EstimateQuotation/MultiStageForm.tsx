import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step4 from "./Step4";
import Step7 from "./Step7";
import {  useParams } from "react-router-dom";
import { fetchDesignById } from "../../Services/DesignService";
import Step6 from "./step6";
import { DesignData, Measurement, PackageData, QuoteData, SubscribtionPlan } from "../../Types/EstimateQuotation";

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { id } = useParams<{ id: string }>();
  const designId = id ? Number(id) : 0;

  // Initial QuoteData structure
  const initialQuoteData: QuoteData = {
    scope: { DesignType: "" },
    subscribtionPlan: { planType: "basic" },
    designData: null,
    srqFeet: { length: 0, width: 0 },
    basic: { new: 0, renew: 0, modular: "", furniture: "", services: "" },
    intermediate: { new: 0, renew: 0, modular: "", furniture: "", services: "" },
    premium: { new: 0, renew: 0, modular: "", furniture: "", services: "" },
  };

  const [quoteData, setQuoteData] = useState<QuoteData>(initialQuoteData);

  // Fetch design data when component mounts or designId changes
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchDesignById(designId);
        if (data) {
          setQuoteData((prev) => ({
            ...prev,
            designData: data,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch design data:", error);
      }
    }

    if (designId) {
      getData();
    }
  }, [designId]);

  // Update form data dynamically as the user enters information
  const updateQuoteData = (
    section: keyof QuoteData,
    packageData: Partial<PackageData> | Partial<DesignData> | Partial<Measurement> | Partial<SubscribtionPlan> | string
  ) => {
    setQuoteData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        ...(packageData as object),
      },
    }));
  };

  // Validation function to check if the required fields are filled
  const isStepComplete = (): boolean => {
    if (currentStep === 0) {
      // Example condition for Step1, checking DesignType is filled
      return quoteData.scope.DesignType !== "";
    }
    if (currentStep === 1) {
      // Example condition for Step6
      return quoteData.srqFeet.length > 0 && quoteData.srqFeet.width > 0;
    }
    
    // Add more validation checks for other steps as needed
    return true; // Default to true for steps with no required validation
  };

  // Define steps array with components
  const steps = [
    <Step1 quoteData={quoteData} updateQuoteData={updateQuoteData} />,
    <Step6 quoteData={quoteData} updateQuoteData={updateQuoteData} />,
    <Step4 quoteData={quoteData} updateQuoteData={updateQuoteData} />,
    <Step7 quoteData={quoteData} updateQuoteData={updateQuoteData} />,
    <Step2 quoteData={quoteData} updateQuoteData={updateQuoteData} />,
  ];

  return (
    <div className="md:min-h-[80vh] flex flex-col justify-between">
      <div className="w-full md:max-w-[70%] mx-auto mt-[5rem] flex-grow">
        <ProgressBar currentStep={currentStep} />
        <div className="bg-white md:h-[70vh] overflow-auto shadow-lg h-full rounded-lg p-8">
          {steps[currentStep]}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full md:max-w-[70%] mx-auto bg-white p-4 border-t-2 border-gray-200 flex justify-between">
        {currentStep > 0 && (
          <button className="text-pink-500" onClick={() => setCurrentStep((prev) => prev - 1)}>
            Back
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            className={`bg-black text-white px-4 py-2 rounded-lg ${!isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={!isStepComplete()}
          >
            Next
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
