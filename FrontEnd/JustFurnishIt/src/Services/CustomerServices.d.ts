import { CustomerCreateDTO } from "../Types/CustomerModel";
export declare const createCustomer: (customerDTO: CustomerCreateDTO) => Promise<any>;
export declare const getWishlistByCustomerId: (customerId: Number) => Promise<any>;
export declare const deleteWishlistItem: (customerId: Number, wishListId: string) => Promise<void>;
