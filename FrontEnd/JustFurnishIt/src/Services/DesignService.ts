import axios from 'axios';
// import { Design } from '../Types/DesignTypes';
import { DesignData, DesignDTO ,Design, DesignDataInfo } from "../Types/DesignTypes";

// Define the interface for the DesignDTO based on your DTO
const WISHLIST_API_BASE_URL = 'https://localhost:7000/gateway/WishList';

const DESIGN_API_BASE_URL = 'https://localhost:7000/gateway/Design';

// Base URL of your backend API (Update this with your actual API URL)
const API_BASE_URL = "https://localhost:7000/gateway/Design/AddDesigns";

export const API_BASE = "https://localhost:7000/gateway/Design"; // Change this URL as per your setup
// Axios instance with base configuration

const token = localStorage.getItem('token');
console.log(token);


// Fetch favorite designs for a specific customer
export const fetchFavorites = async (customerId: number) => {
  const response = await axios.get(`${WISHLIST_API_BASE_URL}/${customerId}`);
  return response.data.map((item: any) => ({
    designId: item.designId,
    wishListId: item.wishListId,
  }));
};

// Fetch designs by category ID
export const fetchDesignsByCategory = async (categoryId: number) => {
  const response = await axios.get(`${DESIGN_API_BASE_URL}/bycategory/${categoryId}`);
  if (response.status !== 200) throw new Error('Failed to fetch category data');
  return response.data;
};

// Add a design to the favorites
export const addToFavorites = async (customerId: number, designId: number) => {
  const response = await axios.post(WISHLIST_API_BASE_URL, {
    userId: customerId,
    designId,
  });
  return { designId, wishListId: response.data.wishListId };
};

// Remove a design from the favorites
export const removeFromFavorites = async (customerId: number, wishListId: number) => {
  await axios.delete(`${WISHLIST_API_BASE_URL}/${customerId}/${wishListId}`);
};


export const fetchDesignByIdAsync = async (designId: number): Promise<Design> => {
  try {
    const response = await axios.get<Design>(`${DESIGN_API_BASE_URL}/${designId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching design by ID:', error);
    throw new Error('Failed to fetch design data');
  }
};



export const fetchDesignById = async (
  designId: number
): Promise<DesignData | null> => {
  try {
    const response = await axios.get<DesignData>(`${API_BASE}/${designId}`

    );
    return response.data;
  } catch (error) {
    console.error("Error fetching design data:", error);
    return null; // Return null if there was an error
  }
};


// Function to add a new design
export const addDesign = async (newDesign: DesignDTO): Promise<string> => {
  try {
    const response = await axios.post<string>(API_BASE_URL, newDesign); // Change the endpoint if necessary
    return response.data; // Return success message
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data || "An error occurred while adding the design."
      );
    } else {
      throw new Error("An error occurred while communicating with the server.");
    }
  }
};

// Define the API request service
export const deleteDesign = async (designId: number): Promise<any | void> => {
  try {
    const response = await axios.delete(`https://localhost:7000/gateway/Design/${designId}`);
      return response;
  } catch (error) {
    console.error("Error deleting design:", error);
    return "Error deleting design";
  }
};

export const getDesignById = async (designId: Number): Promise<DesignDataInfo> => {
  const response = await axios.get<DesignDataInfo>(`https://localhost:7000/gateway/Design/${designId}`);
  return response.data;
};

export const getDesignsByDesignerId = async (designerId: Number): Promise<any> => {
  const response = await axios.get(`https://localhost:7000/gateway/Design/designer/${designerId}`);
  return response.data;
};

export const UpdateDesign = async (designId:Number ,newDesign: any): Promise<string> => {
  try {
    const response = await axios.put<string>(`https://localhost:7000/gateway/Design/updateDesign/${designId}`, newDesign); // Change the endpoint if necessary
    return response.data; // Return success message
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data || 'An error occurred while adding the design.');
    } else {
      throw new Error('An error occurred while communicating with the server.');
    }
  }
}; 