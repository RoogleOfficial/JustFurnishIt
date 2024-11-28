import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Step4Props {
  prevStep: () => void;
  handleSubmit: any;
  quoteData: any;
  updateQuoteData: any;
}

const Step4: React.FC<Step4Props> = ({ prevStep, handleSubmit, quoteData, updateQuoteData }) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isValid) {
      handleSubmit(e);
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  useEffect(() => {
    setIsValid(
      !!quoteData.premium.new &&
      !!quoteData.premium.renew &&
      !!quoteData.premium.modular &&
      !!quoteData.premium.furniture &&
      !!quoteData.premium.services
    );
  }, [quoteData.premium]);

  return (
    <div className="mx-auto w-10/12 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Add Premium Package</h2>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">New</label>
        <input
          type="number"
          name="premiumNew"
          value={quoteData.premium.new}
          onChange={(e) => updateQuoteData("premium", { ...quoteData.premium, new: parseInt(e.target.value) })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter new package value"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Renew</label>
        <input
          type="number"
          name="premiumRenew"
          onChange={(e) => updateQuoteData("premium", { ...quoteData.premium, renew: parseInt(e.target.value) })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter renewal package value"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Modular</label>
        <input
          type="text"
          name="premiumModular"
          onChange={(e) => updateQuoteData("premium", { ...quoteData.premium, modular: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter modular information"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Furniture</label>
        <input
          type="text"
          name="premiumFurniture"
          value={quoteData.premium.furniture}
          onChange={(e) => updateQuoteData("premium", { ...quoteData.premium, furniture: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter furniture details"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Services</label>
        <input
          type="text"
          name="premiumServices"
          value={quoteData.premium.services}
          onChange={(e) => updateQuoteData("premium", { ...quoteData.premium, services: e.target.value })}
          className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
          placeholder="Enter services included"
        />
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Back</button>
        <button
          onClick={(e) => handleNextStep(e)}
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg text-white ${isValid ? "bg-green-500" : "bg-gray-300 cursor-not-allowed"}`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4;
