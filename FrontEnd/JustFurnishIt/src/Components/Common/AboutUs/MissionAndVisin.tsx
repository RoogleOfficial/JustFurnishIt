import React from 'react';

const MissionAndVision: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Vision Section */}
        <div className="relative bg-gray-50 p-8 rounded-lg shadow-lg flex flex-col items-center">
          <div className="w-full h-64 max-w-xs overflow-hidden rounded-lg shadow-lg mb-5">
            <img
              src="https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713147/vision_fff5ky.png"
              alt="Our Vision"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-3xl font-bold text-black-800 mb-4">Our Vision</h3>
          <p className="text-lg text-black-700 text-center">
            We envision a world where interior design enhances everyday living. Our goal is to provide personalized and
            functional design solutions that transform homes and inspire lives.
          </p>
        </div>

        {/* Mission Section */}
        <div className="relative bg-gray-50 p-8 rounded-lg shadow-lg flex flex-col items-center">
          <div className="w-full h-64 max-w-xs overflow-hidden rounded-lg shadow-lg mb-5">
            <img
              src="https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713127/mission_r2pu1t.png"
              alt="Our Mission"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-3xl font-bold text-black-800 mb-4">Our Mission</h3>
          <p className="text-lg text-black-700 text-center">
            Our mission is to make beautiful, functional living spaces accessible to all, maintaining excellence in both
            design and execution.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
