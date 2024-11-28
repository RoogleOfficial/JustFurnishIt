const downloadPDF = () => {
    const element = document.getElementById("quote-content");
    if (!element) {
      console.error("Element not found for PDF generation");
      return;
    }
  
    const options = {
      margin: 0, // Remove margin for full-page content
      filename: `Quotation_${designId}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 4, useCORS: true }, // Higher scale for better quality
      jsPDF: { unit: "pt", format: "a4", orientation: "landscape" } // Landscape orientation
    };
  
    html2pdf().set(options).from(element).save();
  };
  