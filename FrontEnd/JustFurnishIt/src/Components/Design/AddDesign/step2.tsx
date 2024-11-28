import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Step2Props {
  prevStep: any;
  nextStep: any;
  quoteData: any;
  updateQuoteData: any;
}

const Step2: React.FC<Step2Props> = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
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
      !!quoteData.basic.new &&
      !!quoteData.basic.renew &&
      !!quoteData.basic.modular &&
      !!quoteData.basic.furniture &&
      !!quoteData.basic.services
    );
  }, [quoteData.basic]);

  return (
    <div className="mx-auto w-10/12 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Add Basic Package</h2>
      
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">New</label>
        <input
          type="number"
          name="basicNew"
          onChange={(e) => updateQuoteData("basic", { ...quoteData.basic, new: parseInt(e.target.value) })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter new package value"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Renew</label>
        <input
          type="number"
          name="basicRenew"
          onChange={(e) => updateQuoteData("basic", { ...quoteData.basic, renew: parseInt(e.target.value) })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter renewal package value"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Modular</label>
        <input
          type="text"
          name="basicModular"
          value={quoteData.basic.modular}
          onChange={(e) => updateQuoteData("basic", { ...quoteData.basic, modular: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter modular information"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Furniture</label>
        <input
          type="text"
          name="basicFurniture"
          value={quoteData.basic.furniture}
          onChange={(e) => updateQuoteData("basic", { ...quoteData.basic, furniture: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter furniture details"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Services</label>
        <input
          type="text"
          name="basicServices"
          value={quoteData.basic.services}
          onChange={(e) => updateQuoteData("basic", { ...quoteData.basic, services: e.target.value })}
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

export default Step2;
