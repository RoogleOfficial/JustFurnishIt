import React from "react";

interface ReviewCardProps {
  profilePictureUrl: string;
  firstName: string;
  email: string;
  rating: number;
  comment: string;
  lovedAboutDesigner: string;
  designQuality: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  profilePictureUrl,
  firstName,
  email,
  rating,
  comment,

}) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"} inline-block`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.431L23.327 9.75l-5.668 5.541 1.34 7.812L12 18.984l-7.332 3.854 1.34-7.812L.673 9.75l7.66-1.732L12 .587z" />
      </svg>
    ));
  };

  return (
    <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform hover:scale-105">
      {/* Header with Profile Image */}
      <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 h-40 flex justify-center items-center">
        <img
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
          src={profilePictureUrl || "https://via.placeholder.com/150"}
          alt={firstName}
        />
      </div>

      {/* Content Section */}
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{firstName}</h2>
        <p className="text-gray-500">{email}</p>

        {/* Rating */}
        <div className="flex justify-center mt-2 space-x-1">{renderStars()}</div>

        {/* Comment */}
        <p className="text-gray-600 mt-4 text-sm italic">"{comment}"</p>

      
      </div>
    </div>
  );
};

export default ReviewCard;
