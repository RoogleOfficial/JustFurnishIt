import axios from "axios";

export const getAvailableTimes = async (designerId: string, dateStr: string): Promise<string[]> => {
    const response = await axios.get<string[]>(`https://localhost:7000/gateway/booking/available-times?designerId=${designerId}&date=${dateStr}`);
    return response.data;
};

export const getDesignerName = async (designId: string): Promise<{ designerName: string }> => {
    const response = await axios.get<{ designerName: string }>(`https://localhost:7000/gateway/booking/designer-name/${designId}`);
    return response.data;
};

export const getUserByCustomerId = async (customerId: Number): Promise<any> => {
    const response = await axios.get(`https://localhost:7000/gateway/Booking/user/${customerId}`);
    return response.data;
};

export const getBookingByDesignerId = async (designerId: Number): Promise<any> => {
    const response = await axios.get(`https://localhost:7000/gateway/Booking/designer/${designerId}`);
    return response.data;
};

export const completeBooking = async (bookingId: Number): Promise<void> => {
    await axios.put(`https://localhost:7000/gateway/Booking/${bookingId}/complete`);
};