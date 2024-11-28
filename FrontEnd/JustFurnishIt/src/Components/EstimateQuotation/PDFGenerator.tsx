// PDFGenerator.tsx
import jsPDF from "jspdf";
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

// Function to generate PDF
export const generatePDF = ({ quoteData }: PDFGeneratorProps) => {
  const { designData } = quoteData;
  const area = quoteData.srqFeet.length * quoteData.srqFeet.width;
  const totalCost = designData ? designData.pricePerSquareFeet * area : 0;

  const doc = new jsPDF("landscape");

  // Add image on the left (60% width)
  if (designData?.imageLink) {
    doc.addImage(designData.imageLink, "JPEG", 10, 10, 140, 95); // Adjusted size for 60% width without exceeding page bounds
  }

  // Set title
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text("Your Estimated Home Interiors Cost", 155, 15);

  // Design Name and Cost
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 255);
  doc.text(designData?.designName || "N/A", 155, 25);
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Estimated Total Cost: ₹${totalCost.toLocaleString()}`, 155, 35);

  // Details Section
  const details = [
    { label: "Selected Plan", value: quoteData.plan || "N/A" },
    { label: "Scope", value: quoteData.scope.DesignType || "N/A" },
    { label: "Room Dimensions", value: `${quoteData.srqFeet.length} x ${quoteData.srqFeet.width} ft` },
    { label: "Modular", value: quoteData.basic.modular },
    { label: "Furniture", value: quoteData.basic.furniture },
    { label: "Services", value: quoteData.basic.services },
    { label: "Materials Used", value: designData?.materialsUsed || "N/A" },
    { label: "Category", value: designData?.category || "N/A" },
    { label: "Dimensions", value: designData?.dimension || "N/A" },
    { label: "Style", value: designData?.style || "N/A" },
    { label: "Color", value: designData?.color || "N/A" },
    { label: "Special Features", value: designData?.specialFeatures || "N/A" },
  ];

  let y = 45;
  doc.setFontSize(10);

  details.forEach(({ label, value }) => {
    const text = `${label}: ${value}`;
    const maxWidth = 100; // Limit width for text wrapping
    const splitText = doc.splitTextToSize(text, maxWidth);
    doc.text(splitText, 155, y);
    y += splitText.length * 6; // Adjust spacing between lines based on number of lines
    if (y > 180) {
      doc.addPage();
      y = 20;
    }
  });

  // Disclaimer Section
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(
    "*This is only an indicative price based on our clients' average spends. The final price can vary based on factors like finish material, number of furniture, civil work required, and design elements.",
    10,
    140,
    { maxWidth: 270 }
  );

  // Save the PDF
  doc.save("quotation.pdf");
};
