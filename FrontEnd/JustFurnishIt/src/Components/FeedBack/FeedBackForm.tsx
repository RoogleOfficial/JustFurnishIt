import React, { useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { submitReview } from '../../Services/FeedBackService';

interface FeedbackFormProps {
  userId: number;
  designId: number;
  designerId: number;
}

const FeedbackForm: React.FC = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const { userId, designId, designerId } = location.state as FeedbackFormProps;

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    rating: 0,
    comment: '',
    lovedAboutDesigner: [] as string[],
    designQuality: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLovedChange = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      lovedAboutDesigner: prev.lovedAboutDesigner.includes(option)
        ? prev.lovedAboutDesigner.filter((item) => item !== option)
        : [...prev.lovedAboutDesigner, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const reviewData = {
      userId,
      designId,
      designerId,
      firstName: formData.firstName,
      email: formData.email,
      rating: formData.rating,
      comment: formData.comment,
      lovedAboutDesigner: formData.lovedAboutDesigner.join(", "),
      designQuality: formData.designQuality,
      createdAt: new Date(),
    };

    try {
      await submitReview(reviewData)
      toast.success('Feedback submitted successfully!');
      navigate(-1);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full lg:w-[600px] h-[550px] flex items-center mt-[4rem]">
        <img
          src="/src/assets/image.jpg"
          alt="Designer Workspace"
          className="object-cover rounded-lg shadow-lg w-full h-full"
        />
      </div>
      <form onSubmit={handleSubmit} className="w-full lg:w-[600px] h-[580px] mt-[2rem] p-6  rounded-lg shadow-lg flex flex-col justify-between">
        <h2 className="text-3xl font-extrabold mb-4 text-center text-black">Leave Your Feedback 💬</h2>

        <div className="flex space-x-4 mb-1">
          <div className="w-1/2">
            <label htmlFor="firstName" className="block text-lg font-medium text-gray-800">Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-1 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <div className="w-1/2">
            <label htmlFor="email" className="block text-lg font-medium text-gray-800">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-1 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-lg font-medium text-gray-800">Rate Your Experience</label>
          <div className="flex items-center mt-2 space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  onChange={handleChange}
                  className="h-4 w-4 border border-gray-300 rounded-full checked:bg-gray-500 checked:border-gray-500 focus:outline-none"
                  required
                />
                <span className={`ml-2 ${formData.rating == rating ? 'text-black-500' : 'text-gray-700'}`}>
                  {rating}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-800">What Did You Love About the Designer?</label>
          <div className="flex flex-wrap gap-4 mt-3">
            {['Creativity', 'Communication', 'Timeliness', 'Professionalism'].map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => handleLovedChange(option)}
                className={`p-2 border rounded-lg shadow-md ${
                  formData.lovedAboutDesigner.includes(option) ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
                } hover:bg-gray-700 hover:text-white transition duration-200`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="designQuality" className="block text-lg font-medium text-gray-800">Quality of Design (1-10)</label>
          <input
            type="range"
            id="designQuality"
            name="designQuality"
            min="1"
            max="10"
            value={formData.designQuality}
            onChange={handleChange}
            className="mt-2 w-full text-gray-800 focus:ring-gray-400 accent-gray-600" 
          />
          <p className="text-center mt-2 text-lg text-gray-800 font-semibold">Rating: {formData.designQuality}/10</p>
        </div>

        <div className="mb-2">
          <label htmlFor="comment" className="block text-lg font-medium text-gray-800">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={4}
            className="mt-1 h-[3.5rem] w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 "
            required
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-gradient-to-r from-black to-gray-800 text-white py-3 px-6 rounded-lg hover:from-gray-700 hover:to-black transition duration-300 shadow-lg">
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
