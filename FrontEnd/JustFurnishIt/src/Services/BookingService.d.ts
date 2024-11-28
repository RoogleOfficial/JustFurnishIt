export declare const getAvailableTimes: (designerId: string, dateStr: string) => Promise<string[]>;
export declare const getDesignerName: (designId: string) => Promise<{
    designerName: string;
}>;
export declare const getUserByCustomerId: (customerId: Number) => Promise<any>;
export declare const getBookingByDesignerId: (designerId: Number) => Promise<any>;
export declare const completeBooking: (bookingId: Number) => Promise<void>;
