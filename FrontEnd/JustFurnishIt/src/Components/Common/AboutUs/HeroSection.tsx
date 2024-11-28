import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713127/image_lg7tqq.png)' }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Journey</h1>
        <p className="text-lg mb-8 max-w-2xl">
          Explore our humble beginnings and our evolution into a brand trusted by thousands of homeowners.
        </p>
        <a href="#how-it-started" className="px-8 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition duration-300">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default HeroSection;