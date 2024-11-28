export interface PackageData {
    new: number;
    renew: number;
    modular: string;
    furniture: string;
    services: string;
  }
  
  export interface DesignData {
    designName: string;
    description: string;
    pricePerSquareFeet: number; // Update to number
    category: string;
    materialsUsed: string;
    dimension: string;
    style: string;
    color: string;
    specialFeatures: string;
    imageLink: string;
  }
  
  export interface Measurement {
    length: number;
    width: number;
  }
  export interface SubscribtionPlan {
    planType: "basic" | "intermediate" | "premium";
  }
  
  export interface QuoteData {
    scope: any;
    designData: DesignData | null; // Allow null here for initial state
    srqFeet: Measurement;
    basic: PackageData;
    intermediate: PackageData;
    premium: PackageData;
    subscribtionPlan:SubscribtionPlan
  }
  export interface Package {
    new: number;
    renew: number;
    modular: string;
    furniture: string;
    services: string;
  }
  

 export interface QuoteDTO {
    id: string;
    designId: string;
    basic: Package;
    intermediate: Package;
    premium: Package;
  }
  
  export interface Quote {
    designId: string;
    basic: Package;
    intermediate: Package;
    premium: Package;
  }