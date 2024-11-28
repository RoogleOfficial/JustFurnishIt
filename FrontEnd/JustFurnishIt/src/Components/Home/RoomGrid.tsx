import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Kitchen", imgSrc: "kitchen.jpg" },
  { name: "Dining", imgSrc: "dining.jpg" },
  { name: "Bedroom", imgSrc: "bedroom.jpg" },
  { name: "Living", imgSrc: "living.jpg" },
];

const RoomGrid: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-5 sm:p-10">
        <div className="md:col-span-2">
          {categories.slice(0, 1).map((category, index) => (
            <div
              key={index}
              className="relative group overflow-hidden  shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              
              <Link to="/design-ideas/modular-kitchen-designs">
              <img
                src={"https://cdn-dliin.nitrocdn.com/iFaxlHcVqyWZWghwsjNiQOatlfNsVALG/assets/images/source/rev-a52466c/dlifeinteriors.com/wp-content/uploads/2023/06/Kitchen2x.jpg"}
                alt={category.name}
                className="w-full  md:h-[320px]  object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
              <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-gray-800 opacity-0 group-hover:opacity-100">
                  {category.name}
                </h2>
              </div>
                </Link>
            </div>
          ))}
        </div>
        <div className="md:row-span-2 ">
          {categories.slice(1, 2).map((category, index) => (
            <div
              key={index + 1}
              className="relative group overflow-hidden  shadow-md hover:shadow-lg transition-shadow duration-300 h-full"
            >
              <Link to="/design-ideas/dining-room-designs">
              <img
                src={`https://cdn-dliin.nitrocdn.com/iFaxlHcVqyWZWghwsjNiQOatlfNsVALG/assets/images/source/rev-a52466c/dlifeinteriors.com/wp-content/uploads/2023/06/dining2x.jpg`}
                alt={category.name}
                className="w-full  h-full  object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
              <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-gray-800  opacity-0 group-hover:opacity-100">
                  {category.name}
                </h2>
              </div>
                </Link>
            </div>
          ))}
        </div>
        <div>
          {categories.slice(2, 3).map((category, index) => (
            <div
              key={index + 2}
              className="relative group overflow-hidden  shadow-md hover:shadow-lg transition-shadow duration-300"
            >
                <Link to="/design-ideas/master-bedroom-designs">
              <img
                src={`https://cdn-dliin.nitrocdn.com/iFaxlHcVqyWZWghwsjNiQOatlfNsVALG/assets/images/source/rev-a52466c/dlifeinteriors.com/wp-content/uploads/2023/06/bedroom2x.jpg`}
                alt={category.name}
                className="w-full  md:h-[320px]  object-cover transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-gray-800  opacity-0 group-hover:opacity-100">
                  {category.name}
                </h2>
              </div>
                </Link>
            </div>
          ))}
        </div>
        <div>
          {categories.slice(3).map((category, index) => (
            <div
              key={index + 3}
              className="relative group overflow-hidden  shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link to="/design-ideas/living-room-designs">
              <img
                src={`https://cdn-dliin.nitrocdn.com/iFaxlHcVqyWZWghwsjNiQOatlfNsVALG/assets/images/source/rev-a52466c/dlifeinteriors.com/wp-content/uploads/2023/06/living2x.jpg`}
                alt={category.name}
                className="w-full  md:h-[320px]  object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
              <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-gray-800  opacity-0 group-hover:opacity-100">
                  {category.name}
                </h2>
              </div>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomGrid;
