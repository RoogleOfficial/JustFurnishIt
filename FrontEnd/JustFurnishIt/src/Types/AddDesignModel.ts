// Define the structure for QuoteData and PackageData
export interface PackageData {
    new: number;
    renew: number;
    modular: string;
    furniture: string;
    services: string;
  }
  
  export interface DesignDataI {
    designName: string;
    description: string;
    pricePerSquareFeet: string;
    category: string;
    materialsUsed: string;
    dimension: string;
    style: string;
    color: string;
    specialFeatures: string;
    imageFile: File | null;
    imageLink: string;
  }
  
  export interface QuoteData {
    designData: DesignDataI;
    designId: string;
    basic: PackageData;
    intermediate: PackageData;
    premium: PackageData;
  }