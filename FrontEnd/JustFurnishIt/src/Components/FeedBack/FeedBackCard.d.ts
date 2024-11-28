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
declare const ReviewCard: React.FC<ReviewCardProps>;
export default ReviewCard;
