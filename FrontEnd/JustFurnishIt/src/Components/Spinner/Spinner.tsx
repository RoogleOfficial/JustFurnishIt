import  { useState, useEffect } from 'react';

import bnwImage from '../../../public/Color.png';  // black-and-white image path
import colorImage from '../../../public/BnW.png';  // color image path

const Spinner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or replace this with actual data loading logic
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Example 3-second loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && (
        <div className="relative w-24 h-24">
          <img
            src={bnwImage}
            alt="Loading black-and-white"
            className="absolute inset-0 w-full h-full opacity-0 animate-fade"
        
          />
          <img
            src={colorImage}
            alt="Loading color"
            className="absolute inset-0 w-full h-full opacity-0 animate-fade color-delay"
          />
        </div>
      )}
    </div>
  );
};

export default Spinner;
