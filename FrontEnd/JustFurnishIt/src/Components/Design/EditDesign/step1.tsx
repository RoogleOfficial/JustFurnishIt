import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DesignDataI, PackageData, QuoteData } from "../../../Types/AddDesignModel";
import { DesignCategory } from "../../../Types/DesignTypes";
import toast from "react-hot-toast";

interface Step1Props {
  nextStep: () => void;
  quoteData: QuoteData;
  updateQuoteData: (section: keyof QuoteData, data: Partial<PackageData> | Partial<DesignDataI> | string) => void;
}

const Step1: React.FC<Step1Props> = ({ nextStep, quoteData, updateQuoteData }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    updateQuoteData("designData", { ...quoteData.designData, imageFile: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [updateQuoteData, quoteData.designData]);

  const handleNextStep = () => {
    if (isValid) {
      nextStep();
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  useEffect(() => {
    setIsValid(
      !!quoteData.designData.designName &&
      !!quoteData.designData.description &&
      !!quoteData.designData.pricePerSquareFeet &&
      !!quoteData.designData.category &&
      !!quoteData.designData.materialsUsed &&
      !!quoteData.designData.dimension &&
      !!quoteData.designData.style &&
      !!quoteData.designData.color &&
      !!quoteData.designData.specialFeatures
    );
  }, [quoteData.designData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="bg-white p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Design Information</h2>

      <form>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Design Name *</label>
          <input
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
            type="text"
            value={quoteData.designData.designName}
            onChange={(e) => updateQuoteData("designData", { ...quoteData.designData, designName: e.target.value })}
            placeholder="Enter design name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Description *</label>
          <textarea
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
            value={quoteData.designData.description}
            onChange={(e) => updateQuoteData("designData", { ...quoteData.designData, description: e.target.value })}
            rows={4}
            maxLength={1000}
            placeholder="Enter design description"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Price per Square Feet *</label>
          <input
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
            type="number"
            value={quoteData.designData.pricePerSquareFeet}
            onChange={(e) => updateQuoteData("designData", { ...quoteData.designData, pricePerSquareFeet: e.target.value })}
            placeholder="Enter price per square foot"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Category *</label>
          <select
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
            value={quoteData.designData.category}
            onChange={(e) => updateQuoteData("designData", { ...quoteData.designData, category: e.target.value })}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {Object.keys(DesignCategory)
              .filter((key) => isNaN(Number(key)))
              .map((key) => (
                <option key={key} value={DesignCategory[key as keyof typeof DesignCategory]}>
                  {key}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Design Thumbnail *</label>
          <div
            {...getRootProps()}
            className={`w-full px-4 py-8 bg-gray-100 border-2 border-dashed rounded-lg text-center ${
              isDragActive ? "border-blue-400" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the image here...</p>
            ) : imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-w-full h-auto mx-auto" />
            ) : (
              <p>Drag and drop an image, or click to select</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Materials Used</label>
          <input
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
            type="text"
            value={quoteData.designData.materialsUsed}
            onChange={(e) => updateQuoteData("designData", { ...quoteData.designData, materialsUsed: e.target.value })}
            placeholder="Enter materials used"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Dimension</label>
          <input
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
            type="text"
            value={quoteData.designData.dimension}
            onChange={(e) => updateQuoteData("designData", { ...quoteData.designData, dimension: e.target.value })}
            maxLength={50}
            placeholder="Enter dimension"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Style</label>
          <input
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
            type="text"
            value={quoteData.designData.style}
            onChange={(e) => updateQuoteData("designData", { ...quoteData.designData, style: e.target.value })}
            maxLength={50}
            placeholder="Enter style"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Color</label>
          <input
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
            type="text"
            value={quoteData.designData.color}
            onChange={(e) => updateQuoteData("designData", { ...quoteData.designData, color: e.target.value })}
            maxLength={50}
            placeholder="Enter color"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Special Features</label>
          <input
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg"
            type="text"
            value={quoteData.designData.specialFeatures}
            onChange={(e) => updateQuoteData("designData", { ...quoteData.designData, specialFeatures: e.target.value })}
            maxLength={200}
            placeholder="Enter any special features"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleNextStep}
            disabled={!isValid}
            className={`px-4 py-2 rounded-lg text-white ${isValid ? "bg-green-500" : "bg-gray-300 cursor-not-allowed"}`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;
