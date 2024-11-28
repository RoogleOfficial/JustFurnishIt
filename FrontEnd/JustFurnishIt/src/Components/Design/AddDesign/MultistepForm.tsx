import React, { useState } from "react";
import Step1 from "./step1"; // Step1 for DesignId and Basic package
import Step2 from "./step2"; // Step2 for Intermediate package
import Step3 from "./step3";
import Step4 from "./step4"; // Step3 for Premium package
import {uploadImage} from "../../../Services/AccountServices";
import { DesignDataI, PackageData, QuoteData } from "../../../Types/AddDesignModel";
import { DesignDTO } from "../../../Types/DesignTypes";
import { addDesign } from "../../../Services/DesignService";
import { Quote } from "../../../Types/EstimateQuotation";
import { createQuote } from "../../../Services/QuoteService";
import toast from "react-hot-toast";


const AddDesignMultiStepForm: React.FC = () => {
  const initialStep = 1;

  const [step, setStep] = useState(initialStep); // Tracks the current step in the multi-step form
 
  const designer = JSON.parse(localStorage.getItem('designerDetails') || '{}');
  const designerId=designer.designerId; 

  const initialQuoteData:QuoteData = {
    designData: {
      designName: "",
      description: "",
      pricePerSquareFeet: "",
      category: "",
      materialsUsed: "",
      dimension: "",
      style: "",
      color: "",
      specialFeatures: "",
      imageFile: null,
      imageLink: "",
    },
    designId: "",
    basic: { new: 0, renew: 0, modular: "", furniture: "", services: "" },
    intermediate: {
      new: 0,
      renew: 0,
      modular: "",
      furniture: "",
      services: "",
    },
    premium: { new: 0, renew: 0, modular: "", furniture: "", services: "" },
  }

  // Initialize the state for quoteData to hold all the form data
  const [quoteData, setQuoteData] = useState<QuoteData>(initialQuoteData);

  // Move to the next step
  const nextStep = () => setStep(step + 1);
  // Move to the previous step
  const prevStep = () => setStep(step - 1);

  // Update form data dynamically as the user enters information
  const updateQuoteData = (
    section: keyof QuoteData,
    packageData: Partial<PackageData> | Partial<DesignDataI> | string
  ) => {
    setQuoteData((prevState) => {
      if (section === "designId") {
        return {
          ...prevState,
          designId: packageData as string,
        };
      }
      return {
        ...prevState,
        [section]: {
          ...prevState[section],
          ...(packageData as object),
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDesign: DesignDTO = {
      designName: quoteData.designData.designName || "",
      imageLink: quoteData.designData.imageLink || "",
      description: quoteData.designData.description || "",
      pricePerSquareFeet:
        parseFloat(quoteData.designData.pricePerSquareFeet) || 0,
      materialsUsed: quoteData.designData.materialsUsed || "",
      designerId: designerId.toString() || "",
      category: parseInt(quoteData.designData.category) || 0,
      dimension: quoteData.designData.dimension || "",
      style: quoteData.designData.style || "",
      color: quoteData.designData.color || "",
      specialFeatures: quoteData.designData.specialFeatures || "",
    };

    const imageFile = quoteData.designData.imageFile;
    if (imageFile) {
      try {
        const imageUrl = await uploadImage(imageFile);
        if (imageUrl) {
          newDesign.imageLink = imageUrl;
        }
      } catch (err) {
        console.error("Error uploading image:", err);
        return;
      }
    }

    try {
      const response :any= await addDesign(newDesign);
  
      const designId =  response?.designId?.toString() || "";
      if (designId) {
        // Update quoteData with the new designId
        setQuoteData((prevState) => ({
          ...prevState,
          designId,
        }));

        // Prepare final Quote object with the received designId
        const finalQuoteData: Quote = {
          basic: {
             new:quoteData.basic.new ,
              renew: quoteData.basic.renew,
               modular: quoteData.basic.modular,
                furniture:quoteData.basic.furniture
                , services:quoteData.basic.services
               },
          intermediate: {
            new: quoteData.intermediate.new,
            renew:quoteData.intermediate.renew,
            modular: quoteData.intermediate.modular,
            furniture: quoteData.intermediate.furniture,
            services:quoteData.intermediate.services,
          },
          premium: {
            new: quoteData.premium.new,
            renew: quoteData.premium.renew,
            modular: quoteData.premium.modular,
            furniture:quoteData.premium.furniture,
            services: quoteData.premium.services,
          },

          designId, // Assign the designId from addDesign response
        };

        // Call createQuote with updated quoteData
        await createQuote(finalQuoteData);

        toast.success("Design and Quote created successfully!");
        setQuoteData(initialQuoteData);
        setStep(initialStep);

      } else {
        console.error("Failed to retrieve design ID from addDesign response.");
      }
    } catch (err: any) {
      console.error("Error submitting design:", err);
    }
  };

  return (
    <div className="lg:w-7/12 md:container w-full min-h-[100vh] mx-auto p-6 pt-[7rem]  ">
      {step === 1 && (
        <Step1
          nextStep={nextStep}
          quoteData={quoteData}
          updateQuoteData={updateQuoteData}
        />
      )}
      {step === 2 && (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          quoteData={quoteData}
          updateQuoteData={updateQuoteData}
        />
      )}
      {step === 3 && (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          quoteData={quoteData}
          updateQuoteData={updateQuoteData}
        />
      )}
      {step === 4 && (
        <Step4
          prevStep={prevStep}
          handleSubmit={handleSubmit}
          quoteData={quoteData}
          updateQuoteData={updateQuoteData}
        />
      )}
    </div>
  );
};

export default AddDesignMultiStepForm;


