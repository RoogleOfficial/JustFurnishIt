import React from "react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import img1 from "../../assets/Luxury Master Bedroom design in Kuwait City.jfif";
import img2 from "../../assets/balcony.jpg";
import img3 from "../../assets/bathroom.png";
import img4 from "../../assets/living room.jpg";


const Hero: React.FC = () => {
  const [currentText, setCurrentText] = useState("Kids Room");
  const texts = [
    "Balcony Room",
    "Living Area",
    "Bath Room",
    "Bed Room",
    
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img1, img2, img3, img4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prevText) => {
        const currentIndex = texts.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % texts.length;
        return texts[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="container w-full mx-auto flex flex-col lg:flex-row items-center justify-between md:pt-[5rem] pt-[7rem]">
      {/* Left Section */}
      <div className="w-full lg:w-1/3 px-4 lg:px-5 flex flex-col items-start ">
        {/* Heading Section */}
        <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">
          <span className="whitespace-nowrap block">
            Design
            <br /> Your
          </span>
          <span className="text-gray-800 block mt-2 font-bold md:mt-2">
            <div className="relative h-10 w-[250px] md:w-[300px] overflow-hidden leading-none">
              <div className="absolute inset-0 flip-animation">
                <span className="block flip-text">{currentText}</span>
              </div>
            </div>
          </span>
        </h1>

        {/* Subtext Section */}
        <p className="  text-xl md:text-2xl md:mt-4 font-bold text-gray-900">
          The best way to design and shop for your home
        </p>

        {/* Description Section */}
        <p className="max-w-md mt-2 md:mt-4 text-base md:text-lg md:pb-7 text-gray-500">
          Create a stunning home with handpicked products from top brands that
          you can shop instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col space-y-4 md:space-y-4 w-full">
          {/* Start Your Project Button */}
          <div className="rounded-md shadow w-full">
            <Link to= "/design-ideas"
              className="flex items-center justify-center w-full mt-2 px-4 py-2 md:px-6 md:py-3 text-base md:text-lg font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 transition"
            >
             Explore Design Ideas
            </Link>
          </div>

          {/* Explore Design Ideas Button */}
          <div className="rounded-md shadow w-full">
            <Link to="/how-its-work"
              className="flex items-center justify-center w-full px-4 py-2 md:px-6 md:py-3 text-base md:text-lg font-medium text-gray-900 bg-white border border-gray-900 rounded-md hover:bg-gray-50 transition"
            >
             How it Works
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Carousel */}
      <div className="w-full lg:w-2/3 mt-8 flex items-center justify-center p-2">
        <div className="w-full max-w-screen  h-[300px] md:h-[400px] lg:h-[470px] rounded-lg overflow-hidden relative">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;