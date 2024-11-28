using Design_Services.Models;
using System.ComponentModel.DataAnnotations;

namespace Design_Services.DTO
{
    public class DesignDTO
    {
        public string DesignName { get; set; } // Name of the design
        public string? ImageLink { get; set; } // Optional link to an image of the design
        public string Description { get; set; } // Description of the design
        public decimal PricePerSquareFeet { get; set; } // Cost of the design per square foot
        public string MaterialsUsed { get; set; } // List of materials used in the design
        public int DesignerId { get; set; } // ID of the designer who created the design
        public DesignCategory Category { get; set; } // Category of the design, as defined in the DesignCategory enum
        public string Dimension { get; set; } // Dimensions of the design (e.g., 10x10)
        public string Style { get; set; } // Style of the design (e.g., Modern, Contemporary)
        public string Color { get; set; } // Primary color scheme used in the design
        public string SpecialFeatures { get; set; } // Additional features of the design
    }
}
