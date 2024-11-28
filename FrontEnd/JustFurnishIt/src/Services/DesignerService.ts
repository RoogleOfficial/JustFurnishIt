import axios from 'axios';
import { Dispatch } from 'redux';
import { setDesignerDetails } from '../Redux/Slicer/AuthSlice';
import { CreateDTO, Designer } from '../Types/DesignerTypes';
import toast from 'react-hot-toast';


const API_BASE_URL = 'https://localhost:7000/gateway/Designer/getDesignerIdByUserId'; // Replace with your actual API endpoint

export const getDesigner = (id: number) => {
  return axios.get<Designer>(`${API_BASE_URL}/${id}`);
};

export const updateDesigner = async (designerId: Number, designerData: Designer): Promise<void> => {
  await axios.put(`https://localhost:7000/gateway/Designer/${designerId}`, designerData);
};

 
export const createDesigner = async (createDTO: CreateDTO) => {
  try {
    const response = await axios.post('https://localhost:7000/gateway/Designer/CreateDesigner', createDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    toast.error('Error creating designer:', error!);
    throw error;
  }
};


 export const getDesignerDetails = async (userId: number, dispatch: Dispatch) => {
  try {

    const response = await axios.get(`https://localhost:7000/gateway/Designer/getDesignerIdByUserId/${userId}`);
    // Since response.data is a number, use it directly
    const designerId = response.data?.designerId;
    const approved = response.data?.isApproved
    
    // Dispatch the action only if designerId is valid
    if (designerId !== undefined && designerId !== null) {
      dispatch(setDesignerDetails({ designerId: designerId,isApproved:approved }));
    } else {
      toast.error("Error: designerId is undefined or null in API response.");
    }
    return designerId;
  } catch (error) {
    toast.error("Error fetching designer details:", error!);
    throw error;
  }
};