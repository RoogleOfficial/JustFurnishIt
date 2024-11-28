import React, { useEffect, useState } from "react";
import Step1 from "./step1"; // Step1 for DesignId and Basic package
import Step2 from "./step2"; // Step2 for Intermediate package
import Step3 from "./step3";
import Step4 from "./step4"; // Step3 for Premium package
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/Store";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { DesignData, PackageData, QuoteData } from "../../../Types/EditDesignModel";
import { Quote } from "../../../Types/EstimateQuotation";
import { API_BASE, UpdateDesign } from "../../../Services/DesignService";
import { getQuotesByDesignId, updateQuote } from "../../../Services/QuoteService";
import toast from "react-hot-toast";



const EditDesignMultiStepForm: React.FC = () => {
  const initialStep = 1;
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [quoteId , setQuoteId] = useState("");

  const [step, setStep] = useState(initialStep); // Tracks the current step in the multi-step form
  const { userDetails } = useSelector((state: RootState) => state.auth);

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
  
  const fetchQuoteData = async (designId: number) => {
    try {
      const [designResponse, packageResponse] = await Promise.all([
        axios.get(`${API_BASE}/${designId}`),
        getQuotesByDesignId(String(designId)) // Adjust endpoint URL as needed
      ]);

      const design = designResponse.data;
      const packageData = packageResponse;
      setQuoteId(packageData.id)

      setQuoteData((prevData) => ({
        ...prevData,
        designData: {
          ...prevData.designData,
          designName: design.designName || "",
          description: design.description || "",
          pricePerSquareFeet: design.pricePerSquareFeet.toString() || "",
          category: design.category || "",
          materialsUsed: design.materialsUsed || "",
          dimension: design.dimension || "",
          style: design.style || "",
          color: design.color || "",
          specialFeatures: design.specialFeatures || "",
          imageLink: design.imageLink || "",
        },
        designId: design.designId.toString() || "",
        basic: packageData.basic || prevData.basic,
        intermediate: packageData.intermediate || prevData.intermediate,
        premium: packageData.premium || prevData.premium,
      }));
    } catch (error) {
      console.error("Error fetching quote data:", error);
    }
  };

  
  // Initialize the state for quoteData to hold all the form data
  const [quoteData, setQuoteData] = useState<QuoteData>(initialQuoteData);

  // Move to the next step
  const nextStep = () => setStep(step + 1);
  // Move to the previous step
  const prevStep = () => setStep(step - 1);

  // Update form data dynamically as the user enters information
  const updateQuoteData = (
    section: keyof QuoteData,
    packageData: Partial<PackageData> | Partial<DesignData> | string
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

    const newDesign: any = {
      designName: quoteData.designData.designName || "",
      designId:Number(id),
      imageLink: quoteData.designData.imageLink || "",
      description: quoteData.designData.description || "",
      pricePerSquareFeet:
        parseFloat(quoteData.designData.pricePerSquareFeet) || 0,
      materialsUsed: quoteData.designData.materialsUsed || "",
      designerId: userDetails?.UserId?.toString() || "",
      category: parseInt(quoteData.designData.category) || 0,
      dimension: quoteData.designData.dimension || "",
      style: quoteData.designData.style || "",
      color: quoteData.designData.color || "",
      specialFeatures: quoteData.designData.specialFeatures || "",
    };


    try {
      console.log(id);
       await UpdateDesign(Number(id), newDesign);
      
      // const designId = response?.designId?.toString() || "";
      const designId = id;


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
        await updateQuote(quoteId,finalQuoteData);

        toast.success("Design and Quote Updated successfully!");
        setQuoteData(initialQuoteData);
        setStep(initialStep);
        navigate("/dashboard/myDesign")

      } else {
        console.error("Failed to retrieve design ID from addDesign response.");
      }
    } catch (err: any) {
      console.error("Error submitting design:", err);
    }
  };
  useEffect(() => {
    const designId =Number(id) ; 
    console.log(designId)// Replace with the actual design ID you want to fetch
    fetchQuoteData(designId);
  }, []);


  return (
    <div className="container min-h-[100vh] mx-auto p-6 pt-[7rem]  ">
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

export default EditDesignMultiStepForm;


