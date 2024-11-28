// ReviewList.tsx
import React, { useEffect, useState } from "react";
import { getUserById } from "../../../Services/AccountServices";
import ReviewCard from "../../FeedBack/FeedBackCard";
import Spinner from "../../Spinner/Spinner";
import { getReviewsByDesignerId } from "../../../Services/FeedBackService";
import { Review } from "../../../Types/FeedbackModel";


const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userPictures, setUserPictures] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const designer = JSON.parse(localStorage.getItem('designerDetails') || '{}');
  const designerId=designer.designerId; 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewsByDesignerId(designerId);
        setReviews(response);
        setLoading(false);

        const userPromises = response.map((review) => getUserById(review.userId));
        const userResults = await Promise.all(userPromises);

        const picturesMap = userResults.reduce<{ [key: number]: string }>((acc, user) => {
          if (user) acc[user.userId] = user.profilePictureUrl;
          return acc;
        }, {});
        setUserPictures(picturesMap);
      } catch (error) {
        console.error("Error fetching reviews or user data:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  if (loading) {
    return <div>< Spinner /></div>;
  }
  return (
    <div className="p-4 md:pt-[5rem] ">
      <h1 className="text-2xl font-bold mb-4">User Reviews</h1>
      {reviews.length === 0 ? (
        <p className="font-bold p-4">No review found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              profilePictureUrl={userPictures[review.userId] || "https://via.placeholder.com/150"}
              firstName={review.firstName}
              email={review.email}
              rating={review.rating}
              comment={review.comment}
              lovedAboutDesigner={review.lovedAboutDesigner}
              designQuality={review.designQuality}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
