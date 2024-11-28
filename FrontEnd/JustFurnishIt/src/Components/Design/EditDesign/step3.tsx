import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Step3Props {
  prevStep: () => void;
  nextStep: () => void;
  quoteData: any;
  updateQuoteData: any;
}

const Step3: React.FC<Step3Props> = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleNextStep = () => {
    if (isValid) {
      nextStep();
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  useEffect(() => {
    setIsValid(
      !!quoteData.intermediate.new &&
      !!quoteData.intermediate.renew &&
      !!quoteData.intermediate.modular &&
      !!quoteData.intermediate.furniture &&
      !!quoteData.intermediate.services
    );
  }, [quoteData.intermediate]);

  return (
    <div className="mx-auto w-10/12 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Add Intermediate Package</h2>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">New</label>
        <input
          type="number"
          name="intermediateNew"
          onChange={(e) => updateQuoteData("intermediate", { ...quoteData.intermediate, new: parseInt(e.target.value) })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter new package value"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Renew</label>
        <input
          type="number"
          name="intermediateRenew"
          onChange={(e) => updateQuoteData("intermediate", { ...quoteData.intermediate, renew: parseInt(e.target.value) })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter renewal package value"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Modular</label>
        <input
          type="text"
          name="intermediateModular"
          value={quoteData.intermediate.modular}
          onChange={(e) => updateQuoteData("intermediate", { ...quoteData.intermediate, modular: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter modular information"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Furniture</label>
        <input
          type="text"
          name="intermediateFurniture"
          value={quoteData.intermediate.furniture}
          onChange={(e) => updateQuoteData("intermediate", { ...quoteData.intermediate, furniture: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter furniture details"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Services</label>
        <input
          type="text"
          name="intermediateServices"
          value={quoteData.intermediate.services}
          onChange={(e) => updateQuoteData("intermediate", { ...quoteData.intermediate, services: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter services included"
        />
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Back</button>
        <button
          onClick={handleNextStep}
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg text-white ${isValid ? "bg-green-500" : "bg-gray-300 cursor-not-allowed"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
