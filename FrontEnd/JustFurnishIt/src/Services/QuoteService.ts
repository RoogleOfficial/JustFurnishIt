import axios from "axios";
import { Quote } from "../Types/EstimateQuotation";


export const getQuotesByDesignId = async (designId: string | undefined): Promise<any> => {
    const response = await axios.get(`https://localhost:7000/gateway/Quotes/byDesignId/${designId}`);
    return response.data;
};

export const createQuote = async (quoteData: Quote): Promise<void> => {
    try {
      const response = await axios.post('https://localhost:7000/gateway/Quotes', quoteData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      
    } catch (error) {
      console.error('There was an error creating the quote!', error);
      throw error; // Optionally re-throw to handle errors in the component
    }
  };

  export const updateQuote = async (id:String ,quoteData: Quote): Promise<void> => {
    try {
      const response = await axios.put(`https://localhost:7000/gateway/Quotes/${id}`, quoteData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      
    } catch (error) {
      console.error('There was an error creating the quote!', error);
      throw error; // Optionally re-throw to handle errors in the component
    }
  };