import "jspdf-autotable";
interface DesignData {
    designName: string;
    description: string;
    pricePerSquareFeet: number;
    category: string;
    materialsUsed: string;
    dimension: string;
    style: string;
    color: string;
    specialFeatures: string;
    imageLink: string;
}
interface PackageData {
    new: number;
    renew: number;
    modular: string;
    furniture: string;
    services: string;
}
interface Measurement {
    length: number;
    width: number;
}
interface QuoteData {
    scope: any;
    plan: string;
    designData: DesignData | null;
    srqFeet: Measurement;
    basic: PackageData;
    intermediate: PackageData;
    premium: PackageData;
}
interface PDFGeneratorProps {
    quoteData: QuoteData;
}
export declare const generatePDF: ({ quoteData }: PDFGeneratorProps) => void;
export {};
