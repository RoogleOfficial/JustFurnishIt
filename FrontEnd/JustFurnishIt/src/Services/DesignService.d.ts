import { DesignData, DesignDTO, Design, DesignDataInfo } from "../Types/DesignTypes";
export declare const API_BASE = "https://localhost:7000/gateway/Design";
export declare const fetchFavorites: (customerId: number) => Promise<any>;
export declare const fetchDesignsByCategory: (categoryId: number) => Promise<any>;
export declare const addToFavorites: (customerId: number, designId: number) => Promise<{
    designId: number;
    wishListId: any;
}>;
export declare const removeFromFavorites: (customerId: number, wishListId: number) => Promise<void>;
export declare const fetchDesignByIdAsync: (designId: number) => Promise<Design>;
export declare const fetchDesignById: (designId: number) => Promise<DesignData | null>;
export declare const addDesign: (newDesign: DesignDTO) => Promise<string>;
export declare const deleteDesign: (designId: number) => Promise<any | void>;
export declare const getDesignById: (designId: Number) => Promise<DesignDataInfo>;
export declare const getDesignsByDesignerId: (designerId: Number) => Promise<any>;
export declare const UpdateDesign: (designId: Number, newDesign: any) => Promise<string>;
