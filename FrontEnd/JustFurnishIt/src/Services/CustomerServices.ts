import axios from "axios";
import { CustomerCreateDTO } from "../Types/CustomerModel";

export const createCustomer = async (customerDTO: CustomerCreateDTO) => {
    try {
      const response = await axios.post('https://localhost:7000/gateway/Customer', customerDTO, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  };

  export const getWishlistByCustomerId = async (customerId: Number): Promise<any> => {
    const wishlistResponse = await axios.get(`https://localhost:7000/gateway/WishList/${customerId}`);
    return wishlistResponse.data;
};
export const deleteWishlistItem = async (customerId: Number, wishListId: string): Promise<void> => {
  await axios.delete(`https://localhost:7000/gateway/WishList/${customerId}/${wishListId}`);
};