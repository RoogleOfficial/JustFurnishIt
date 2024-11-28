import axios from 'axios';
import { ProfilePhotoDTO, UpdateProfilePayload, User } from '../Types/AuthTypes';


export const getUserById = async (id: number): Promise<User | null> => {
  try {
    // Fetch the user by id
    const response = await axios.get<User>(`https://localhost:7000/gateway/Account/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null; // Return null if there's an error
  }
};

export const updateUserProfile = async (userId: number, payload: UpdateProfilePayload) => {
  const url = `https://localhost:7000/gateway/Account/${userId}`;
  try {
    const response = await axios.put(url, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file); // Append the file to FormData

  try {
      const response = await fetch('https://localhost:7000/gateway/Media/upload', {
          method: 'POST',
          body: formData, // Send the formData containing the image file
      });

      if (!response.ok) {
          throw new Error('Failed to upload image.');
      }

      const data = await response.json();
      return data.url; // Return the uploaded image URL
  } catch (error) {
      console.error('Error uploading image:', error);
      return null;
  }
};

export const updateProfilePhoto = async (id:Number,profilePhotoDto: ProfilePhotoDTO): Promise<User> => {
  try {
    console.log(id);
    console.log(profilePhotoDto)
      const response = await fetch(`https://localhost:7000/gateway/Account/updatephoto/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(profilePhotoDto), // Send the ProfilePhotoDTO object as JSON
      });

      if (!response.ok) {
          throw new Error('Failed to update profile photo.');
      }

      const data = await response.json();
      return data; // Return the updated user data
  } catch (error) {
      console.error('Error updating profile photo:', error);
      throw error;
  }
};
