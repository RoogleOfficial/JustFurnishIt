import { Review } from "../Types/FeedbackModel";
export declare const fetchUserReviewForDesigner: (userId: number) => Promise<Review[] | null>;
export declare const getReviewsByDesignerId: (designerId: Number) => Promise<Review[]>;
export declare const submitReview: (reviewData: any) => Promise<void>;
