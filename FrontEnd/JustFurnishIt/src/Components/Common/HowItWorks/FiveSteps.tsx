import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  { id: 1, title: 'Meet Designer', imgSrc: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713127/meet-designer_twutrf.png' },
  { id: 2, title: 'Book Designer', imgSrc: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713114/book-livspace_mqqemd.png' },
  { id: 3, title: 'Execution begins', imgSrc: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713115/execution-begins_iqh7su.png' },
  { id: 4, title: 'Final installations', imgSrc: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713120/final-installations_bbrcjx.png' },
  { id: 5, title: 'Move in', imgSrc: 'https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713137/move-in_yotwcp.png' },
];

const FiveSteps: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-10 px-5">
      {/* Adding the image at the beginning */}
      <div className="w-full mb-8">
        <img
          src="https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713126/how-it-works-banner_utzamb.png" // Replace with the correct image path
          alt="How it works"
          className="w-full object-cover rounded-lg" // Styling to match the example
        />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-5 text-center">How it Works</h1>
      <p className="text-lg text-gray-600 mb-10 text-center">
        Looking to design your home interiors? Here's how you can get started.
      </p>
      <div className="flex flex-wrap justify-center gap-10">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center text-center max-w-xs">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <img
                src={step.imgSrc}
                alt={step.title}
                className="w-full h-full object-fit"
              />
            </div>
            <div className="font-bold text-xl text-gray-700">{step.id}</div>
            <div className="text-gray-600 mt-2">{step.title}</div>
          </div>
        ))}
      </div>
      <Link to="/design-ideas">
      <button className="bg-gray-800 text-white py-2 px-6 rounded-full mt-10 hover:bg-red-600">
        Get Started
      </button>
      </Link>
    </div>
  );
};

export default FiveSteps;
