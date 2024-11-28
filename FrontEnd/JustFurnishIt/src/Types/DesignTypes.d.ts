export interface DesignCardData {
    title: string;
    designs: number;
    image: string;
    link: string;
}
export interface Data {
    designerId: number;
    userId: number;
    specialization: string;
    experienceYears: number;
    portfolioUrl: string;
    bio: string;
    isApproved: number;
    certifications?: string;
}
export interface Design {
    designId: number;
    imageLink: string;
    designName: string;
    category: string;
    dimension: string;
    style: string;
    color: string;
    materialsUsed: string;
    specialFeatures: string;
    description: string;
}
export interface PackageData {
    new: number;
    renew: number;
    modular: string;
    furniture: string;
    services: string;
}
export interface DesignDTO {
    designName: string;
    imageLink?: string;
    description: string;
    pricePerSquareFeet: number;
    materialsUsed: string;
    designerId: string;
    category: number;
    dimension: string;
    style: string;
    color: string;
    specialFeatures: string;
}
export declare enum DesignCategory {
    ModularKitchen = 0,
    Wardrobe = 1,
    Bathroom = 2,
    MasterBedroom = 3,
    LivingRoom = 4,
    PoojaRoom = 5,
    KidsBedroom = 6,
    Balcony = 7,
    DiningRoom = 8,
    HomeOffice = 9,
    StudyRoom = 10
}
export interface Package {
    new: number;
    renew: number;
    living: number;
    kitchen: number;
    bedroom: number;
    bathroom: number;
    dining: number;
    modular: string;
    furniture: string;
    services: string;
}
export interface Quote {
    designId: string;
    basic: Package;
    intermediate: Package;
    premium: Package;
}
export interface DesignData {
    designName: string;
    imageLink: string;
    description: string;
    pricePerSquareFeet: number;
    materialsUsed: string;
    designerId: number;
    category: string;
    dimension: string;
    style: string;
    color: string;
    specialFeatures: string;
}
export interface DesignDataInfo {
    designId: number;
    designName: string;
    imageLink: string;
    description: string;
    pricePerSquareFeet: number;
    dimension: string;
}
