import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center opacity-80 bg-gray-50 bg-[url('https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713121/hero-pattern_gr5xji.png')]">
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-6xl font-bold text-black mb-4">404</h1>
      <p className="text-2xl text-black mb-6">Oops! Page not found.</p>
      <p className="text-lg text-black mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <button
        onClick={handleGoBack}
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg"
      >
        Go Back
      </button>
    </div>
    </div>
  );
};

export default NotFound;
