import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = ["Scope of Work", "Room Dimensions", "Package", "View Quotation","Download Quotaion"];

  return (
    <div className="  flex items-center mb-0 ">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex-1 text-center">
            <div
              className={`${
                index <= currentStep ? "bg-black" : "bg-gray-300"
              } h-2 rounded-full`}
            ></div>
            <p className="text-sm mt-2">{step}</p>
          </div>
          {index <= currentStep && (
            <FaCheckCircle className="text-richblack-200 -mt-7 hidden md:block  text-2xl" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
