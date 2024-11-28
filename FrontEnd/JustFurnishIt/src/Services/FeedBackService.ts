import axios from "axios";
import { Review } from "../Types/FeedbackModel";

export const fetchUserReviewForDesigner = async (userId: number): Promise<Review[] | null> => {
  try {
    const response = await axios.get<Review[]>(`https://localhost:7000/gateway/Review/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to load reviews:", error);
    return null;
  }
};


export const getReviewsByDesignerId = async (designerId: Number): Promise<Review[]> => {
  const response = await axios.get<Review[]>(`https://localhost:7000/gateway/Review/designer/${designerId}`);
  return response.data;
};

export const submitReview = async (reviewData: any): Promise<void> => {
  await axios.post('https://localhost:7084/api/Review', reviewData, {
      headers: {
          'Content-Type': 'application/json',
      },
  });
};