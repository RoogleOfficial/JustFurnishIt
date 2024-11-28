import React,{ useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

const Statistics: React.FC = () => {
  const [visible, setVisible] =useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (statsRef.current) {
      const rect = statsRef.current.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight) {
        setVisible(true);
      }
    }
  };

 useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check on mount in case already in view
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-16 bg-gray-600 text-white" ref={statsRef}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Our Impact in Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
            <img src="https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713138/Stat1_tmgg7c.png" alt="Homes Furnished" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-black-600">
              {visible ? <CountUp start={0} end={5000} duration={2} separator="," /> : '0'}+
            </h3>
            <p className="text-black-600">#JustFurnishItHomes</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
            <img src="https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713138/Stat2_oawsdc.png" alt="Designers" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-black-600">
              {visible ? <CountUp start={0} end={500} duration={2} separator="," /> : '0'}+
            </h3>
            <p className="text-black-600">Expert Designers</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
            <img src="https://res.cloudinary.com/dtpcgqcrs/image/upload/v1730713138/Stat3_iwfcyf.png" alt="Countries" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-black-600">
              {visible ? <CountUp start={0} end={1} duration={2} /> : '0'} Country
            </h3>
            <p className="text-gray-600">5+ Cities</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
